import type { Editor } from "@tiptap/react";

type RichTextToolbarProps = {
  editor: Editor | null;
};

export function RichTextToolbar({ editor }: RichTextToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-toolbar">
      <button
        type="button"
        className={editor.isActive("bold") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleMark("bold").run()}
      >
        Bold
      </button>

      <button
        type="button"
        className={editor.isActive("italic") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleMark("italic").run()}
      >
        Italic
      </button>

      <button
        type="button"
        className={editor.isActive("heading", { level: 1 }) ? "active" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </button>

      <button
        type="button"
        className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>

      <button
        type="button"
        className={editor.isActive("bulletList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Bullet List
      </button>

      <button
        type="button"
        className={editor.isActive("orderedList") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Numbered List
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
      </button>
    </div>
  );
}