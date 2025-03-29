import express from "express";
import cors from "cors";
import { router as shipperRoutes } from "./routes/v1/ShipperRoutes";
import { router as truckerRoutes } from "./routes/v1/TruckerRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/shipper", shipperRoutes);
app.use("/api/v1/trucker", truckerRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
