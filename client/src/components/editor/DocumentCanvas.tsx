import type { DocumentRecord } from "../../api/documents";

type DocumentCanvasProps = {
  document: DocumentRecord | null;
  isLoading: boolean;
  error: string | null;
};

export function DocumentCanvas({
  document,
  isLoading,
  error
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

  return (
    <main className="document-wrapper">
      <section className="document-page">
        <h1>{document?.title}</h1>
        <p>{document?.content}</p>
      </section>
    </main>
  );
}