import { useEffect, useRef, useState } from "react";

const TruckerDashboard = () => {
  const truckerId = "38a51c27-bce8-44ad-b5aa-0c26d7d25b0f"; // Replace dynamically
  // fcb0c593-49b0-4b39-94af-ac74ebfd7357
  const ws = useRef<WebSocket | null>(null);
  const [truckers, setTruckers] = useState<{ [key: string]: { lat: number; lng: number } }>({});

  useEffect(() => {
    ws.current = new WebSocket("https://v-logistics-1.onrender.com/");

    ws.current.onopen = () => console.log("WebSocket Connected");
    ws.current.onclose = () => console.log("WebSocket Disconnected");

    ws.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "location_update") {
        setTruckers((prev) => {
          const updatedTruckers = {
            ...prev,
            [data.truckerId]: { lat: data.lat, lng: data.lng },
          };

          // Send location update to backend
          fetch("https://v-logistics.onrender.com/api/v1/trucker/update-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: data.truckerId,
              lat: data.lat,
              lng: data.lng,
            }),
          });

          return updatedTruckers;
        });
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendLocation = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return; // Ensure WebSocket is open

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const data = {
            type: "update_location",
            truckerId,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          ws.current?.send(JSON.stringify(data));
        },
        (error) => console.error("Geolocation error:", error.message) // Handle errors
      );
    } else {
      console.error("Geolocation not supported");
    }
  };

  useEffect(() => {
    const interval = setInterval(sendLocation, 35000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Trucker Dashboard</h1>
      <p>Trucker ID: {truckerId}</p>
      <h2>Tracked Locations</h2>
      <ul>
        {Object.entries(truckers).map(([id, { lat, lng }]) => (
          <li key={id}>
            {id}: ({lat}, {lng})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TruckerDashboard;
