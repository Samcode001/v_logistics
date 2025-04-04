"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ShipperRoutes_1 = require("./routes/v1/ShipperRoutes");
const TruckerRoutes_1 = require("./routes/v1/TruckerRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/shipper", ShipperRoutes_1.router);
app.use("/api/v1/trucker", TruckerRoutes_1.router);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
