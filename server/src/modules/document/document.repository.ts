import { prisma } from "../../db/prisma.js";
import type {
  CreateDocumentInput,
  UpdateDocumentInput
} from "./document.schemas.js";

export const documentRepository = {
  create(input: CreateDocumentInput) {
    return prisma.document.create({
      data: {
        title: input.title ?? "Untitled document",
        content: input.content ?? ""
      }
    });
  },

  findById(documentId: string) {
    return prisma.document.findUnique({
      where: {
        id: documentId
      }
    });
  },

  findAll() {
    return prisma.document.findMany({
      orderBy: {
        updatedAt: "desc"
      }
    });
  },

  update(documentId: string, input: UpdateDocumentInput) {
    return prisma.document.update({
      where: {
        id: documentId
      },
      data: input
    });
  },

  delete(documentId: string) {
    return prisma.document.delete({
      where: {
        id: documentId
      }
    });
  }
};