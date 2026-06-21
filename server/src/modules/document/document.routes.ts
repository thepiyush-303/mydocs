import { Router } from "express";
import {
    createDocument,
    deleteDocument,
    getDocumentById,
    updateDocument
} from "./document.controller.js";

export const documentRouter = Router();

documentRouter.post("/", createDocument);
documentRouter.get("/:documentId", getDocumentById);
documentRouter.patch("/:documentId", updateDocument);
documentRouter.delete("/:documentId", deleteDocument);