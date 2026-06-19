import { Bold, Italic, List, Redo2, Underline, Undo2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


export function App() {
  
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">MyDocs</p>
          <h1>"Untitled document"</h1>
        </div>
        <div className="status-group">
        </div>
      </header>

      <nav className="menubar" aria-label="Editor formatting controls">
        <button type="button" aria-label="Undo" title="Undo" onClick={() => {}}>
          <Undo2 size={18} />
        </button>
        
      </nav>

      <section className="document-stage" aria-label="Document editor">
        <div
          className="document-page"
          contentEditable
          suppressContentEditableWarning
          spellCheck
        />
      </section>
    </main>
  );
}
