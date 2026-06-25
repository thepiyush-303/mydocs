import { Hocuspocus } from "@hocuspocus/server";
import { Database } from "@hocuspocus/extension-database";
import { yjsDocumentRepository } from "../modules/collaboration/yjs-document.repository.js";

export const hocuspocus = new Hocuspocus({
  name: "collab-doc-editor",

  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        console.log("Loading Yjs document:", documentName);

        return yjsDocumentRepository.findStateByName(documentName);
      },

      store: async ({ documentName, state }) => {
        console.log("Storing Yjs document:", documentName);

        await yjsDocumentRepository.upsertState(documentName, state);
      }
    })
  ]
});