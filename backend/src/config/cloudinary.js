import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { env } from "../utils/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: env.CLOUDINARY_FOLDER,
    allowed_formats: [
      "pdf",
      "doc",
      "docx",
      "ppt",
      "pptx",
      "jpg",
      "jpeg",
      "png",
    ],
    resource_type: "auto",
  },
});

export const upload = multer({ storage });
