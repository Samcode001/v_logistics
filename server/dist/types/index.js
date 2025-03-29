"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.truckerSignupSchema = exports.ShippersignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ShippersignupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(4, "Password must be at least 4 characters long"),
    phone: zod_1.default.string().min(10, "Phone number must be at least 10 digits"),
    mc_dot: zod_1.default.string().min(3, "MC/DOT number must be at least 3 characters"),
    carrierType: zod_1.default.string().min(2, "Carrier type must be at least 2 characters"),
    country: zod_1.default.string().min(2, "Country name must be at least 2 characters"),
    state: zod_1.default.string().min(2, "State name must be at least 2 characters"),
    city: zod_1.default.string().min(2, "City name must be at least 2 characters"),
    zipcode: zod_1.default.string().min(5, "Zipcode must be at least 5 characters"),
    fleetSize: zod_1.default.string().min(1, "Fleet size is required"),
    address: zod_1.default.string().min(5, "Address must be at least 5 characters"),
    role: zod_1.default.string(),
});
exports.truckerSignupSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(4, "Password must be at least 4 characters long"),
    phone: zod_1.default.string().min(10, "Phone number must be at least 10 digits"),
    vehicleType: zod_1.default.string().min(3, "Vehicle type must be at least 3 characters"),
    licenseNo: zod_1.default.string().min(2, "License number must be at least 2 characters"),
    latitude: zod_1.default.number(),
    longitude: zod_1.default.number(),
    availability: zod_1.default.boolean(),
});
exports.LoginSchema = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(4, "Password must be at least 4 characters long"),
});
