"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverRoutes_1 = require("./src/routes/driverRoutes");
const authRoutes_1 = require("./src/routes/authRoutes");
const mongo_1 = require("./src/config/mongo");
process.loadEnvFile();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/drivers", driverRoutes_1.driverRoutes);
app.use("/api/auth", authRoutes_1.authRoutes);
app.listen(PORT, () => {
    console.log(`Server up listening on http://localhost:${PORT}`);
    (0, mongo_1.connectDB)();
});
