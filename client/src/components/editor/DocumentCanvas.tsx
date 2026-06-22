import type { DocumentRecord } from "../../api/documents";

type DocumentCanvasProps = {
  document: DocumentRecord | null;
  title: string;
  content: string;
  isLoading: boolean;
  error: string | null;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
};
export function DocumentCanvas({
  document,
  title,
  content,
  isLoading,
  error,
  onTitleChange,
  onContentChange
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

        <textarea
          className="document-content-input"
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          placeholder="Start writing..."
        />
      </section>
    </main>
  );
}