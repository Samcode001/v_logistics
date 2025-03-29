import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import truckIcon from "../assets/truck_icon.png"; // Custom marker
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const truckMarker = L.divIcon({
  // iconUrl: truckIcon,
  // iconSize: [20, 50],
  className: "pulse-container",
  html: `
    <div class="pulse-effect"></div>
    <img src="${truckIcon}" style="width: 20px; height: 50px;" class="truck-icon">
  `,
});

export default function ShipperDashboard() {
  const [truckers, setTruckers] = useState<{
    [key: string]: {
      lat: number;
      lng: number;
      name: string;
      licenseNo: string;
      vehicleType: string;
    };
  }>({});

  const navigate = useNavigate();

  const truckersList = [
    {
      name: "John Doe",
      location: "Los Angeles, CA",
      availability: "Available",
    },
    { name: "Alice Smith", location: "Dallas, TX", availability: "Busy" },
    {
      name: "Michael Brown",
      location: "Chicago, IL",
      availability: "On Break",
    },
    {
      name: "Sam mitchell",
      location: "New York, NY",
      availability: "Available",
    },
  ];

  //   useEffect(() => {
  //     ws.onmessage = async (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.type === "location_update") {
  //         setTruckers((prev) => {
  //           const updatedTruckers = {
  //             ...prev,
  //             [data.truckerId]: { lat: data.lat, lng: data.lng },
  //           };

  //           // Send location update to backend
  //           fetch("https://v-logistics.onrender.com/api/v1/trucker/update-location", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify({
  //               id: data.truckerId,
  //               lat: data.lat,
  //               lng: data.lng,
  //             }),
  //           });

  //           return updatedTruckers;
  //         });
  //       }
  //     };
  //   }, []);

  const getTrucksLocations = async () => {
    const { data } = await axios.get(
      "https://v-logistics.onrender.com/api/v1/trucker/locations"
    );
    const formattedData = data.reduce((acc: any, trucker: any) => {
      acc[trucker.id] = {
        lat: trucker.latitude,
        lng: trucker.longitude,
        name: trucker.username,
        licenseNo: trucker.licenseNo,
        vehicleType: trucker.vehicleType,
      };
      return acc;
    }, {});
    setTruckers(formattedData);
  };
  useEffect(() => {
    // setInterval(() => {
    // }, 5000);
    getTrucksLocations();
  }, []);

  const getLoginStatus = async () => {
    const token = localStorage.getItem("token_shipper");

    if (!token) {
      console.log("No token found, redirecting...");
      navigate("/login");
      return;
    }

    try {
      await axios.get("https://v-logistics.onrender.com/api/v1/shipper/me", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token in headers
        },
      });
    } catch (error) {
      console.error("Login check failed:", error);
      navigate("/login"); // Redirect on failure
    }
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  return (
    <>
      {/* Map Container */}
      <MapContainer
        center={[27.6139, 80.209]}
        zoom={7}
        style={{ height: "100vh", width: "100vw", position: "relative" }} // Ensure proper layering
      >
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=DtK0meZ6bsZfcWUmk05M"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {Object.entries(truckers).map(([id, trucker]) => (
          <Marker
            key={id}
            position={[trucker.lat, trucker.lng]}
            icon={truckMarker}
          >
            <Popup>
              <div
                style={{
                  padding: "4px",
                  textAlign: "center",
                  minWidth: "120px",
                  maxWidth: "180px",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {trucker.name.toUpperCase()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>License:</strong> {trucker.licenseNo}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  <strong>Vehicle:</strong> {trucker.vehicleType}
                </Typography>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Trucker Info Box */}
      <Box
        sx={{
          position: "absolute",
          //   top: "10px",
          right: "10px",
          bottom: "10px",
          width: "350px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: 3,
          zIndex: 1000, // Ensure it's above the map
        }}
      >
        <Typography variant="h6" textAlign="center" fontWeight="bold">
          Trucks - 187
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // gap: 2,
            justifyContent: "center",
            alignItems: "center",
            // mt: 2,
          }}
        >
          {truckersList.map((trucker, index) => (
            <Card
              key={index}
              sx={{ width: "100%", p: 0, border: "none", boxShadow: "none" }}
            >
              <CardContent
                sx={{
                  p: 0,
                  display: "flex",
                  flexDirection: "column",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Typography variant="h6" fontWeight="semibold">
                  {trucker.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {trucker.location}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    // mt: 1,
                    color:
                      trucker.availability === "Available"
                        ? "green"
                        : trucker.availability === "Busy"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  Status: {trucker.availability}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ display: "block", margin: "auto" }}
        >
          Post a shipment
        </Button>
      </Box>
    </>
  );
}
