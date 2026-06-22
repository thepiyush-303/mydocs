import { Prisma } from "@prisma/client";
import { HttpError } from "../../utils/http-error.js";
import type {
  CreateDocumentInput,
  UpdateDocumentInput
} from "./document.schemas.js";
import { documentRepository } from "./document.repository.js";

export const documentService = {
  async createDocument(input: CreateDocumentInput) {
    return documentRepository.create(input);
  },

  async getDocumentById(documentId: string) {
    const document = await documentRepository.findById(documentId);

    if (!document) {
      throw new HttpError(404, "Document not found");
    }

    return document;
  },

  async getAllDocuments() {
    return documentRepository.findAll();
  },

  async updateDocument(documentId: string, input: UpdateDocumentInput) {
    try {
      return await documentRepository.update(documentId, input);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError(404, "Document not found");
      }

      throw error;
    }
  },

  async deleteDocument(documentId: string) {
    try {
      await documentRepository.delete(documentId);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new HttpError(404, "Document not found");
      }

      throw error;
    }
  }
};