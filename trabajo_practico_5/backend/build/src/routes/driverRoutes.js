"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRoutes = void 0;
const express_1 = require("express");
const driverController_1 = require("../controllers/driverController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const driverRoutes = (0, express_1.Router)();
exports.driverRoutes = driverRoutes;
driverRoutes.use(authMiddleware_1.authMiddleware);
driverRoutes.get("/", driverController_1.getAllDrivers);
driverRoutes.get("/:id", driverController_1.getDriverById);
driverRoutes.post("/", driverController_1.addDriver);
driverRoutes.patch("/:id", driverController_1.updateDriver);
driverRoutes.delete("/:id", driverController_1.deleteDriver);
