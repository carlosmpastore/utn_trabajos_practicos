"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRoutes = (0, express_1.default)();
exports.authRoutes = authRoutes;
authRoutes.post("/register", authController_1.register);
authRoutes.post("/login", authController_1.login);
