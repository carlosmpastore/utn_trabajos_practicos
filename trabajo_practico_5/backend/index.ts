import express from "express";
import { driverRoutes } from "./src/routes/driverRoutes";
import { connectDB } from "./src/config/mongo";


process.loadEnvFile();

const PORT = process.env.PORT;

const app= express();
app.use(express.json());

app.use("/api/drivers", driverRoutes);

app.listen(PORT, () => {
  console.log(`Server up listening on http://localhost:${PORT}`);
  connectDB();
});