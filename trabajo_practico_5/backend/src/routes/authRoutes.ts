import Router from "express";
import { register, login } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/", register);
authRoutes.post("/", login);

export { authRoutes };