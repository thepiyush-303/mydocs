export type DocumentRecord = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = {
  message?: string;
  data: T;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function createDocument() {
  const response = await fetch(`${API_BASE_URL}/api/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "Untitled document",
      content: "<p>Start writing your document here...</p>"
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create document");
  }

  const result = (await response.json()) as ApiResponse<DocumentRecord>;
  return result.data;
}

export async function getDocument(documentId: string) {
  const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }

  const result = (await response.json()) as ApiResponse<DocumentRecord>;
  return result.data;
}
export async function getDocuments() {
  const response = await fetch(`${API_BASE_URL}/api/documents`);

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  const result = (await response.json()) as ApiResponse<DocumentRecord[]>;
  return result.data;
}
export async function updateDocument(
  documentId: string,
  input: Partial<Pick<DocumentRecord, "title" | "content">>
) {
  const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    throw new Error("Failed to update document");
  }

  const result = (await response.json()) as ApiResponse<DocumentRecord>;
  return result.data;
}