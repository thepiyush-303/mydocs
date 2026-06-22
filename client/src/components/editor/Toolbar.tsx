type ToolbarProps = {
  saveStatus: "idle" | "saving" | "saved" | "error";
};

export function Toolbar({ saveStatus }: ToolbarProps) {
  const statusText = {
    idle: "",
    saving: "Saving...",
    saved: "Saved",
    error: "Save failed"
  }[saveStatus];

  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="logo">DocsClone</span>
        <span className="document-title">Untitled document</span>
        <span className="save-status">{statusText}</span>
      </div>

      <nav className="toolbar-menu">
        <button>File</button>
        <button>Edit</button>
        <button>View</button>
        <button>Insert</button>
        <button>Format</button>
        <button>Tools</button>
      </nav>
    </header>
  );
}