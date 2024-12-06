"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const registeredUser = await authModel_1.default.register({ username, password });
        res.status(201).json(registeredUser);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
    ;
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authModel_1.default.login({ username, password });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(401).json({ status: 401, error: error.message });
    }
    ;
};
exports.login = login;
