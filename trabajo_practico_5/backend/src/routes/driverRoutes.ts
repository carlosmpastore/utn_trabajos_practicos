import { Router } from "express";
import { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver } from "../controllers/driverController";
import { authMiddleware } from "../middleware/authMiddleware";

const driverRoutes = Router();

driverRoutes.use(authMiddleware);

driverRoutes.get("/", getAllDrivers);
driverRoutes.get("/:id", getDriverById);
driverRoutes.post("/", addDriver);
driverRoutes.patch("/:id", updateDriver);
driverRoutes.delete("/:id", deleteDriver);

export { driverRoutes };