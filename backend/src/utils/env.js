import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "",
  MONGO_URI: process.env.MONGO_URI || "",
};

export const checkEnv = () => {
  if (!env.PORT || !env.NODE_ENV || !env.JWT_SECRET || !env.MONGO_URI) {
    throw new Error("Environment variables are not set");
    process.exit(1);
  }
};
