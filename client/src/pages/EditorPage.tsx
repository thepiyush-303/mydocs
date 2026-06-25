import { useEffect, useMemo, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//This connects TipTap editor to Yjs.
import Collaboration from "@tiptap/extension-collaboration";

import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { Toolbar } from "../components/editor/Toolbar";
import { DocumentCanvas } from "../components/editor/DocumentCanvas";
import { RichTextToolbar } from "../components/editor/RichTextToolbar";
import "../styles/editor.css";
import { createDocument, DocumentRecord, getDocument, getDocuments } from "../api/documents";

const COLLAB_URL = import.meta.env.VITE_COLLAB_URL;

type ConnectionStatus = "connecting" | "connected" | "disconnected";

export function EditorPage() {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  const [document, setDocument] = useState<DocumentRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ydoc = useMemo(() => {
    return new Y.Doc();
  }, []);

  const provider = useMemo(() => {
    console.log("Connecting to:", COLLAB_URL);

    return new HocuspocusProvider({
      url: COLLAB_URL,
      name: "main-document",
      document: ydoc,

      onStatus({ status }) {
        console.log("Collaboration status:", status);

        if (status === "connected") {
          setConnectionStatus("connected");
          return;
        }

        if (status === "disconnected") {
          setConnectionStatus("disconnected");
          return;
        }

        setConnectionStatus("connecting");
      },

      onConnect() {
        console.log("Connected to collaboration server");
      },

      onDisconnect() {
        console.log("Disconnected from collaboration server");
      },

      onAuthenticationFailed({ reason }) {
        console.error("Collaboration authentication failed:", reason);
        setConnectionStatus("disconnected");
      }
    });
  }, [ydoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        undoRedo: false
      }),

      //This adds collaboration support to TipTap.
      Collaboration.configure({
        //This adds collaboration support to TipTap.
        document: ydoc
      }),

      CollaborationCaret.configure({
        provider,
        user: {
          name: "Anonymous User",
          color: "#2563eb"
        }
      })
    ],

    editorProps: {
      attributes: {
        class: "tiptap-editor"
      }
    }
  });

  // useEffect(()=>{

  //   async function loadDocument() {

  //     try{

  //       const documents = await getDocuments();

  //       if (documents.length > 0) {
  //         setDocument(documents[0]);
  //         return;
  //       }

  //       const createdDocument = await createDocument();
  //       setDocument(createdDocument);
  //     }
  //     catch {
  //       setError("Could not load document");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   loadDocument()

  // },[]);

  return (
    <div className="editor-page">
      <Toolbar
        saveStatus={connectionStatus === "connected" ? "saved" : "error"}
        connectionStatus={connectionStatus}
      />

      <RichTextToolbar editor={editor} />

      <DocumentCanvas
        editor={editor}
        isLoading={false}
        error={null}
      />
    </div>
  );
}