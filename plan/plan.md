# MyDocs Initial Plan

## Product Goal

Build a realtime collaborative document editor similar to Google Docs. Users should see a document canvas with editing controls in a top menubar and be able to edit the same document from multiple browser sessions.

## Initial Scope

- Create a TypeScript codebase for both frontend and backend.
- Use React for the document editor interface.
- Use Node.js for the backend API and realtime gateway.
- Start with a simple editable document body and top formatting menubar.
- Support realtime document updates between connected clients.
- Keep persistence and advanced collaboration internals as explicit system design decisions for the next phase.

## Initial Architecture

### Frontend

- Framework: React with Vite and TypeScript.
- Main responsibilities:
  - Render the editor shell.
  - Display the top menubar.
  - Load an initial document from the backend.
  - Connect to the realtime server using Socket.IO.
  - Send local edits and receive remote edits.
- Initial UI:
  - App header with document name and connection status.
  - Menubar with common formatting actions.
  - Editable document surface.
  - Presence summary for connected collaborators.

### Backend

- Runtime: Node.js with TypeScript.
- Framework: Express for HTTP APIs.
- Realtime: Socket.IO for document rooms and live update events.
- Initial storage:
  - In-memory document store for local development.
  - Replace with a database after deciding the persistence model.
- Initial API:
  - `GET /health`
  - `GET /api/documents/:documentId`
  - Socket events for joining a document and broadcasting document changes.

## System Design Decisions To Discuss

- Whether collaboration should use CRDTs, Operational Transform, or a simpler temporary sync model.
- Whether to use Yjs with a rich-text editor such as TipTap/ProseMirror.
- How document content should be represented: plain text, HTML, JSON document tree, or editor-specific schema.
- How often document state should be persisted.
- Whether to store every operation, periodic snapshots, or both.
- How authentication, permissions, and sharing should work.
- How cursor presence and user identity should be represented.
- How version history and conflict recovery should work.
- How the app should be deployed and scaled.

## Near-Term Milestones

1. Establish the frontend and backend boilerplate.
2. Run the React client and Node server locally.
3. Verify two browser tabs can edit the same document in realtime.
4. Choose the production collaboration engine.
5. Add durable persistence.
6. Add authentication and document sharing.

## Current Defaults

- Language: TypeScript.
- Frontend: React + Vite.
- Backend: Node.js + Express.
- Realtime transport: Socket.IO.
- Initial data storage: in-memory only.
- Initial editor surface: contenteditable HTML surface.
- Future rich-text/collaboration candidate: TipTap/ProseMirror + Yjs.
