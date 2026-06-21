import { Router } from "express";
import { documentRouter } from "../modules/document/document.routes.js";

export const apiRouter = Router();

apiRouter.use("/documents", documentRouter);