export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo: string | null;
  github: string | null;
  category: string;
  ProjectID: string;
  featured: boolean;
  userId: string;
  customFields: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  success: boolean;
  source?: string;
  data: Project[];
}

export interface ProjectResponse {
  success: boolean;
  source?: string;
  data: Project;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  tech: string;
  liveDemo: string;
  github: string;
  category: string;
  featured?: string;
  image?: File;
  customFields?: string;
}

export interface UpdateProjectPayload {
  title?: string;
  description?: string;
  tech?: string;
  liveDemo?: string;
  github?: string;
  category?: string;
  featured?: string;
  image?: File;
  customFields?: string;
}

export type ProjectStatus = "active" | "archived";
