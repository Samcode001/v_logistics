import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const truckers = new Map(); // Store truckers' positions

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established.");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === "update_location") {
      const { truckerId, lat, lng } = data;

      // Store trucker's latest location
      truckers.set(truckerId, { lat, lng });

      // Broadcast updated location to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ type: "location_update", truckerId, lat, lng }));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
