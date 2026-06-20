import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./Auth/auth.routes.js";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import project from "./Project/project.route.js";
import support from "./Support/support.route.js";
dotenv.config();

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());



app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});


app.use("/api/auth", authRoutes);
app.use("/api/project", project);
app.use("/api/support", support);


