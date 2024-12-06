"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
process.loadEnvFile();
const URI_DB = process.env.URI_DB;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(URI_DB);
        console.log("Successfuly connected to database");
    }
    catch (error) {
        console.log("Failed to connect to database");
    }
    ;
};
exports.connectDB = connectDB;
