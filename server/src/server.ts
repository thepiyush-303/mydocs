import { createServer } from "node:http";
import crossws from "crossws/adapters/node";
import type { WebSocketLike } from "@hocuspocus/server";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { hocuspocus } from "./collaboration/hocuspocus.js";

const server = createServer(app);

const ws = crossws({
  hooks: {
    open(peer) {
      console.log("WebSocket opened:", peer.id);

      const clientConnection = hocuspocus.handleConnection(
        peer.websocket as unknown as WebSocketLike,
        peer.request as Request,
        {
          userId: "anonymous"
        }
      );

      (peer as any)._hocuspocus = clientConnection;
    },

    message(peer, message) {
      (peer as any)._hocuspocus?.handleMessage(message.uint8Array());
    },

    close(peer, event) {
      console.log("WebSocket closed:", peer.id);

      (peer as any)._hocuspocus?.handleClose({
        code: event.code,
        reason: event.reason
      });
    },

    error(peer, error) {
      console.error("WebSocket error for peer:", peer.id);
      console.error(error);
    }
  }
});

server.on("upgrade", (request, socket, head) => {
  console.log("Upgrade request received");
  ws.handleUpgrade(request, socket, head);
});

server.listen(env.PORT, () => {
  console.log(`HTTP server running on http://localhost:${env.PORT}`);
  console.log(`Collaboration server running on ws://localhost:${env.PORT}`);
});