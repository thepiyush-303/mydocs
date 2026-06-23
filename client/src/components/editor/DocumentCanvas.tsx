import type { Editor } from "@tiptap/react";
import { EditorContent } from "@tiptap/react";

type DocumentCanvasProps = {
  editor: Editor | null;
  isLoading: boolean;
  error: string | null;
};

export function DocumentCanvas({
  editor,
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
        <EditorContent editor={editor} />
      </section>
    </main>
  );
}