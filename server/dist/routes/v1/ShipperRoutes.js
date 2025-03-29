"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const types_1 = require("../../types");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const index_1 = __importDefault(require("../../db/index"));
exports.router = express_1.default.Router();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside signup");
    // check the user
    const parsedData = types_1.ShippersignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log("parsed data incorrect");
        res
            .status(400)
            .json({ message: `Validation failed:${parsedData.error.format()}` });
        console.log(parsedData.error.format());
        return;
    }
    const { username, password, phone, mc_dot, carrierType, country, state, city, zipcode, fleetSize, address, } = parsedData.data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const shipper = yield index_1.default.shipper.create({
            data: {
                username,
                password: hashedPassword,
                phone,
                mc_dot,
                carrierType,
                country,
                state,
                city,
                zipcode,
                fleetSize,
                address,
            },
        });
        res.json({
            shipperId: shipper.id,
        });
    }
    catch (e) {
        console.log("erroer thrown");
        console.log(e);
        res.status(400).json({ message: "User already exists" });
    }
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = types_1.LoginSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log("parsed data incorrect");
        res
            .status(400)
            .json({ message: `Validation failed:${parsedData.error.format()}` });
        console.log(parsedData.error.format());
        return;
    }
    try {
        const shipper = yield index_1.default.shipper.findUnique({
            where: {
                username: parsedData.data.username,
            },
        });
        if (!shipper) {
            res.status(403).json({ message: "User not found" });
            return;
        }
        const isValid = yield bcrypt_1.default.compare(parsedData.data.password, shipper.password);
        if (!isValid) {
            res.status(403).json({ message: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            shipperId: shipper.id,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
        });
    }
    catch (e) {
        res.status(400).json({ message: "Internal server error" });
    }
}));
