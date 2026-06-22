import { useEffect, useRef, useState } from "react";
import {
  createDocument,
  getDocuments,
  updateDocument,
  type DocumentRecord
} from "../api/documents";
import { Toolbar } from "../components/editor/Toolbar";
import { DocumentCanvas } from "../components/editor/DocumentCanvas";
import { useDebounce } from "../hooks/useDebounce";
import "../styles/editor.css";

export function EditorPage() {
  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const hasLoadedDocument = useRef(false);

  const debouncedTitle = useDebounce(title, 800);
  const debouncedContent = useDebounce(content, 800);

  useEffect(() => {
    async function loadDocument() {
      try {
        const documents = await getDocuments();

        const selectedDocument =
          documents.length > 0 ? documents[0] : await createDocument();

        setDocument(selectedDocument);
        setTitle(selectedDocument.title);
        setContent(selectedDocument.content);
        hasLoadedDocument.current = true;
      } catch {
        setError("Could not load document");
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, []);

  useEffect(() => {
    async function saveDocument() {
      if (!document || !hasLoadedDocument.current) {
        return;
      }

      if (
        debouncedTitle === document.title &&
        debouncedContent === document.content
      ) {
        return;
      }

      try {
        setSaveStatus("saving");

        const updatedDocument = await updateDocument(document.id, {
          title: debouncedTitle || "Untitled document",
          content: debouncedContent
        });

        setDocument(updatedDocument);
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }

    saveDocument();
  }, [debouncedTitle, debouncedContent, document]);

  return (
    <div className="editor-page">
      <Toolbar saveStatus={saveStatus} />

      <DocumentCanvas
        document={document}
        title={title}
        content={content}
        isLoading={isLoading}
        error={error}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />
    </div>
  );
}