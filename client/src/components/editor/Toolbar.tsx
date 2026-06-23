type ToolbarProps = {
  saveStatus: "idle" | "saving" | "saved" | "error";
  connectionStatus: "connecting" | "connected" | "disconnected";
};

export function Toolbar({ saveStatus, connectionStatus }: ToolbarProps) {
  const saveStatusText = {
    idle: "",
    saving: "Saving...",
    saved: "Synced",
    error: "Offline"
  }[saveStatus];

  const connectionText = {
    connecting: "Connecting...",
    connected: "Connected",
    disconnected: "Disconnected"
  }[connectionStatus];

  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <span className="logo">DocsClone</span>
        <span className="document-title">Collaborative document</span>
        <span className="save-status">{saveStatusText}</span>
        <span className="connection-status">{connectionText}</span>
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