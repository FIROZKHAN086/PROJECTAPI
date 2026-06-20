// src/utils/upload.ts

import ImageKit from "imagekit";
import fileUpload from "express-fileupload";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export interface UploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export const uploadToImageKit = async (
  file: fileUpload.UploadedFile,
  folder: string = "uploads"
): Promise<UploadResponse> => {
  try {
    const response = await imagekit.upload({
      file: file.data, // Buffer from express-fileupload
      fileName: `${Date.now()}-${file.name}`,
      folder,
      useUniqueFileName: true,
    });

    return {
      fileId: response.fileId,
      name: response.name,
      url: response.url,
      thumbnailUrl: response.thumbnailUrl,
    };
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    throw new Error("Failed to upload file");
  }
};

export default imagekit;