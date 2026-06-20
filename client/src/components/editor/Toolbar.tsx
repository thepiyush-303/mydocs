export function Toolbar() {
  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="logo">DocsClone</span>
        <span className="document-title">Untitled document</span>
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