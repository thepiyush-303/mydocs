import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument
} from "./document.controller.js";

export const documentRouter = Router();

documentRouter.post("/", createDocument);
documentRouter.get("/", getAllDocuments);
documentRouter.get("/:documentId", getDocumentById);
documentRouter.patch("/:documentId", updateDocument);
documentRouter.delete("/:documentId", deleteDocument);