import { useEffect, useState } from "react";
import { createDocument, type DocumentRecord } from "../api/documents";
import { Toolbar } from "../components/editor/Toolbar";
import { DocumentCanvas } from "../components/editor/DocumentCanvas";
import "../styles/editor.css";

export function EditorPage() {
  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDocument() {
      try {
        const createdDocument = await createDocument();
        setDocument(createdDocument);
      } catch {
        setError("Could not load document");
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, []);

  return (
    <div className="editor-page">
      <Toolbar />
      <DocumentCanvas
        document={document}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}