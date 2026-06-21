import type { DocumentRecord } from "./document.types.js";

const documents = new Map<string, DocumentRecord>();

export const documentStore = {
  create(document: DocumentRecord) {
    documents.set(document.id, document);
    return document;
  },

  findById(documentId: string) {
    return documents.get(documentId) ?? null;
  },

  update(documentId: string, document: DocumentRecord) {
    documents.set(documentId, document);
    return document;
  },

  delete(documentId: string) {
    return documents.delete(documentId);
  },

  findAll() {
    return Array.from(documents.values());
  }
};