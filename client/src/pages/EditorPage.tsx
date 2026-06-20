import { Toolbar } from "../components/editor/Toolbar";
import { DocumentCanvas } from "../components/editor/DocumentCanvas";
import "../styles/editor.css";

export function EditorPage() {
  return (
    <div className="editor-page">
      <Toolbar />
      <DocumentCanvas />
    </div>
  );
}