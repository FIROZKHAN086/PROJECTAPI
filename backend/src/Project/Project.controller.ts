import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { v4 as uuidv4 } from "uuid";
import { uploadToImageKit } from "../upload/upload.js";
import fileUpload from "express-fileupload";
import redis from "../config/redis.js";

// creat this new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const oneTimeId = (req as any).user?.OneTimeID;

    if (!oneTimeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User Login is required",
      });
    }

    const { title, description, tech, liveDemo, github, category, featured } =
      req.body;

    let parsedCustomFields = null;

    if (req.body.customFields) {
      parsedCustomFields = JSON.parse(req.body.customFields);
    }

    if (!title || !description || !tech || !liveDemo || !github || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.files?.image) {
      return res.status(400).json({
        success: false,
        message: "Project image is required",
      });
    }

    const image = req.files.image as fileUpload.UploadedFile;

    const uploadResult = await uploadToImageKit(image, "projects");

    if (!uploadResult) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    const techArry = tech.split(",").map((item: string) => item.trim());

    const isFeatured = featured === "true";

    const project = await prisma.project.create({
      data: {
        ProjectID: uuidv4(),
        title,
        description,
        image: uploadResult.url,
        tech: techArry,
        liveDemo,
        github,
        category,
        featured: isFeatured,
        userId: oneTimeId,
        customFields: parsedCustomFields,
      },
    });

    // remove all data to redis

    await redis.del("projects");

    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

// get all projects for user iD Which OneTimeID
export const getProjects = async (req: Request, res: Response) => {
  try {
    const oneTimeId = (req as any).user?.OneTimeID;

    // prodution to use this logs as your wish
    console.log(
      `[${new Date().toISOString()}] [INFO] Fetching projects for user: ${oneTimeId}`
    );

    if (!oneTimeId) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    // redis to fetch

    const cachedData = await redis.get("projects");

    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }
    const projects = await prisma.project.findMany({
      where: { userId: oneTimeId },
      orderBy: { createdAt: "desc" },
    });

    // set on redis

    const setRedis = await redis.set("projects", JSON.stringify(projects));

    // prodution to use this logs as your wish
    console.log(
      `[${new Date().toISOString()}] [SUCCESS] Found ${projects.length} projects for user: ${oneTimeId}`
    );
    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] Failed to fetch projects:`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching projects",
    });
  }
};

// get a single project by ProjectID (Using 'id' parameter for ProjectID lookup)
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const oneTimeId = (req as any).user?.OneTimeID;

    if (!oneTimeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User Login is required",
      });
    }

    const { id } = req.params as { id: string };
    // prodution to use this logs as your wish
    console.log(
      `[${new Date().toISOString()}] [INFO] Fetching project with ProjectID: ${id}`
    );

    const cachedData = await redis.get(`project:${id}`);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    const project = await prisma.project.findFirst({
      where: { ProjectID: id, userId: oneTimeId },
    });

    if (!project) {
      // prodution to use this logs as your wish
      console.warn(
        `[${new Date().toISOString()}] [WARN] Project not found: ${id}`
      );
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await redis.set(`project:${id}`, JSON.stringify(project));

    // prodution to use this logs as your wish
    console.log(
      `[${new Date().toISOString()}] [SUCCESS] Project found: ${project.title} (ID: ${id})`
    );
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] Failed to get project by ID: ${req.params.id}`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching project",
    });
  }
};

// update a project by ProjectID
export const updateProject = async (req: Request, res: Response) => {
  try {
    const oneTimeId = (req as any).user?.OneTimeID;

    if (!oneTimeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User Login is required",
      });
    }

    const { id } = req.params as { id: string };
    const {
      title,
      description,
      tech,
      liveDemo,
      github,
      category,
      featured,
      customFields,
    } = req.body;
    // prodution to use this logs as your wish
    console.log(`[${new Date().toISOString()}] [INFO] Updating project: ${id}`);

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (liveDemo) updateData.liveDemo = liveDemo;
    if (github) updateData.github = github;

    if (featured !== undefined) {
      updateData.featured = featured === "true" || featured === true;
    }

    if (tech) {
      updateData.tech =
        typeof tech === "string"
          ? tech.split(",").map((t: string) => t.trim())
          : tech;
    }

    if (customFields) {
      try {
        updateData.customFields =
          typeof customFields === "string"
            ? JSON.parse(customFields)
            : customFields;
      } catch (e) {
        console.warn(
          `[${new Date().toISOString()}] [WARN] Failed to parse customFields for project: ${id}`
        );
      }
    }

    if (req.files?.image) {
      console.log(
        `[${new Date().toISOString()}] [INFO] Processing new image for project: ${id}`
      );
      const image = req.files.image as fileUpload.UploadedFile;
      const uploadResult = await uploadToImageKit(image, "projects");
      updateData.image = uploadResult.url;
    }

    // Verify ownership before updating
    const existingProject = await prisma.project.findFirst({
      where: { ProjectID: id, userId: oneTimeId },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found or you do not have permission to update it",
      });
    }

    const updatedProject = await prisma.project.update({
      where: { ProjectID: id },
      data: updateData,
    });

    await redis.del(`projects`);

    
    return res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    // prodution to use this logs as your wish
    console.error(
      `[${new Date().toISOString()}] [ERROR] Failed to update project: ${req.params.id}`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating project",
    });
  }
};

// delete a project by ProjectID
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const oneTimeId = (req as any).user?.OneTimeID;

    if (!oneTimeId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User Login is required",
      });
    }

    const { id } = req.params as { id: string };

    const project = await prisma.project.findFirst({
      where: { ProjectID: id, userId: oneTimeId },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "this user not delete this project",
      });
    }

    await prisma.project.delete({
      where: { ProjectID: id },
    });

    // prodution to use this logs as your wish
    console.log(
      `[${new Date().toISOString()}] [SUCCESS] Project deleted successfully: ${id}`
    );
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] Failed to delete project: ${req.params.id}`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting project",
    });
  }
};

// public usges to this

export const getPublicProjects = async (req: Request, res: Response) => {
  try {
      const ID = req.headers["accesskey"] as string; // this is OneTImeID

    if (!ID) {
      return res.status(401).json({
        success: false,
        message: "Access key is not valid see your profile for access key ",
      });
    }

    const user = await prisma.user.findUnique({
      where: { OneTimeID: ID },
    });

    if (!user) {
      return res.status(401).json({
        success: true,
        message: "This access Key is invalid see your profile for access key ",
      });
    }

    const cachedData = await redis.get(`public:${ID}`);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: ID,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (projects.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Zero Project on your project, add new project to your project ",
      });
    }

    await redis.set(`public:${ID}`, JSON.stringify(projects));

    return res.status(200).json({
      success: true,
      total: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
