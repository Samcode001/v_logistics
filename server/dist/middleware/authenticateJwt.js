"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authenticateJwt = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        req.userId = decoded.shipperId;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authenticateJwt = authenticateJwt;
