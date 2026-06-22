import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";
import type { DocumentRecord } from "../../api/documents";

type DocumentCanvasProps = {
  document: DocumentRecord | null;
  editor: Editor | null;
  title: string;
  isLoading: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
};

export function DocumentCanvas({
  document,
  editor,
  title,
  isLoading,
  error,
  onTitleChange
}: DocumentCanvasProps) {
  if (isLoading) {
    return (
      <main className="document-wrapper">
        <section className="document-page">
          <p>Loading document...</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="document-wrapper">
        <section className="document-page">
          <p>{error}</p>
        </section>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="document-wrapper">
        <section className="document-page">
          <p>No document found</p>
        </section>
      </main>
    );
  }

  return (
    <main className="document-wrapper">
      <section className="document-page">
        <input
          className="document-title-input"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Untitled document"
        />

        <EditorContent editor={editor} />
      </section>
    </main>
  );
}