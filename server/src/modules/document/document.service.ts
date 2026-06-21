import { randomUUID } from "crypto";
import { HttpError } from "../../utils/http-error.js";
import { documentStore } from "./document.store.js";
import type {
    CreateDocumentInput,
    UpdateDocumentInput
} from "./document.schemas.js";
import type { DocumentRecord } from "./document.types.js";

export const documentService = {
    createDocument(input: CreateDocumentInput) {
        const now = new Date().toISOString();

        const document: DocumentRecord = {
            id: randomUUID(),
            title: input.title ?? "Untitled document",
            content: input.content ?? "",
            createdAt: now,
            updatedAt: now
        };

        return documentStore.create(document);
    },

    getDocumentById(documentId: string) {
        const document = documentStore.findById(documentId);

        if (!document) {
            throw new HttpError(404, "Document not found");
        }

        return document;
    },

    updateDocument(documentId: string, input: UpdateDocumentInput) {
        const existingDocument = documentStore.findById(documentId);

        if (!existingDocument) {
            throw new HttpError(404, "Document not found");
        }

        const updatedDocument: DocumentRecord = {
            ...existingDocument,
            title: input.title ?? existingDocument.title,
            content: input.content ?? existingDocument.content,
            updatedAt: new Date().toISOString()
        };

        return documentStore.update(documentId, updatedDocument);
    },

    deleteDocument(documentId: string) {
        const wasDeleted = documentStore.delete(documentId);

        if (!wasDeleted) {
            throw new HttpError(404, "Document not found");
        }
    }
};