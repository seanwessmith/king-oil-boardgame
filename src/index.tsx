import { serve, ServerWebSocket } from "bun";
import index from "./index.html";

type Lobby = { id: string; players: string[]; host: string };
let currentLobby: Lobby | null = null;
const clients = new Set<ServerWebSocket<unknown>>();

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
  },
  fetch(req, server) {
    if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
      const cookies = new Bun.CookieMap(req.headers.get("cookie")!);
      server.upgrade(req, {
        // this object must conform to WebSocketData
        data: {
          createdAt: Date.now(),
          channelId: new URL(req.url).searchParams.get("channelId"),
          authToken: cookies.get("X-Token"),
        },
      });
      return new Response("Hello World");
    }
  },
  websocket: {
    open(ws) {
      // new client connected
      console.log("new client connected", ws);
      clients.add(ws);
    },
    close(ws) {
      // client disconnected
      clients.delete(ws);
    },
    // handler called when a message is received
    async message(ws, messageRaw) {
      const text =
        typeof messageRaw === "string"
          ? messageRaw
          : new TextDecoder().decode(messageRaw);
      const message = JSON.parse(text as string) as {
        type: string;
        body: any;
      };
      console.log("message", message);
      const body = message.body as { playerName: string };
      switch (message.type) {
        case "joinLobby":
          if (!currentLobby) {
            currentLobby = {
              id: "main",
              players: [],
              host: body.playerName,
            };
          }
          if (!currentLobby.players.includes(body.playerName)) {
            currentLobby.players.push(body.playerName);
          }
          console.log("clients", clients);
          console.log("currentLobby", currentLobby);
          for (const client of clients) {
            client.send(
              JSON.stringify({
                type: "lobbyUpdate",
                body: currentLobby,
              })
            );
          }
          break;
        case "leaveLobby":
          if (!currentLobby) return;
          currentLobby.players = currentLobby.players.filter(
            (n) => n !== body.playerName
          );
          if (currentLobby.players.length === 0) {
            currentLobby = null;
          }
          break;
        case "startGame":
          if (!currentLobby) return;
          for (const client of clients) {
            client.send(
              JSON.stringify({
                type: "gameStarted",
                body: {
                  players: currentLobby.players,
                  host: currentLobby.host,
                  turn: 0,
                  moneyOwed: {},
                  holes: {},
                  current: 0,
                  properties: {},
                  wells: 0,
                  caps: 0,
                  pipelines: 0,
                },
              })
            );
          }
          currentLobby = null;
          break;
        default:
          console.log("unknown message type", message);
          break;
      }
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
