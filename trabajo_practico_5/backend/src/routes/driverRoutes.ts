import { Router } from "express";
import { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver } from "../controllers/driverController";

const driverRoutes = Router();

driverRoutes.get("/", getAllDrivers);
driverRoutes.get("/:id", getDriverById);
driverRoutes.post("/", addDriver);
driverRoutes.patch("/:id", updateDriver);
driverRoutes.delete("/:id", deleteDriver);

export { driverRoutes };