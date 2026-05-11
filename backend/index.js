import app from "./src/app.js";
import { env } from "./src/utils/env.js";
import connectDB from "./src/config/db.config.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
