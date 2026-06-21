import type { RequestHandler } from "express";
import {
  createDocumentSchema,
  updateDocumentSchema
} from "./document.schemas.js";
import { documentService } from "./document.service.js";

type DocumentParams = {
    documentId: string;
}

export const createDocument: RequestHandler<DocumentParams> = (req, res, next) => {
  try {
    const input = createDocumentSchema.parse(req.body);
    const document = documentService.createDocument(input);

    res.status(201).json({
      message: "Document created successfully",
      data: document
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentById: RequestHandler<DocumentParams> = (req, res, next) => {
  try {
    const { documentId } = req.params;
    const document = documentService.getDocumentById(documentId);

    res.status(200).json({
      data: document
    });
  } catch (error) {
    next(error);
  }
};

export const updateDocument: RequestHandler<DocumentParams> = (req, res, next) => {
  try {
    const { documentId } = req.params;
    const input = updateDocumentSchema.parse(req.body);

    const document = documentService.updateDocument(documentId, input);

    res.status(200).json({
      message: "Document updated successfully",
      data: document
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument: RequestHandler<DocumentParams> = (req, res, next) => {
  try {
    const { documentId } = req.params;
    documentService.deleteDocument(documentId);

    res.status(200).json({
      message: "Document deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};