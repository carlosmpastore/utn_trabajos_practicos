import { Request, Response } from "express";
import DriverModel from "../models/driverModel";
import { DriverData, F1Teams } from "../interfaces/DriverInterface";

const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await DriverModel.getAllDrivers();
    res.json(drivers);

  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  };
};

const getDriverById = async (req: Request, res: Response) => {
  const {id} = req.params;
  
  try {
    const driver = await DriverModel.getDriverById(id);

    if (!driver) {
      res.status(404).json({ status: 404, message: "Driver not found" });
      return;
    };

    res.json(driver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

const addDriver = async (req: Request, res: Response) => {
  const {name, nationality, team, number} = req.body as DriverData;
  
  try {
    // Validar si ya existe un piloto con el mismo nombre
    const existingDriver = await DriverModel.getDriverByName(name);
    if(existingDriver) {
      res.status(400).json({ status: 400, error: "A driver with this name already exists" });
      return;
    };

    // Validar si el equipo está permitido
    const validTeams = Object.values(F1Teams);
    if(!validTeams.includes(team)) {
      res.status(400).json({ status: 400, error: `"${team}" is not a valid team. Allowed teams: ${validTeams.join(", ")}` });
      return;
    };

    // Validar si ya existe un piloto con el mismo número
    const existingNumber = await DriverModel.getDriverByNumber(number);
    if(existingNumber) {
      res.status(400).json({ status: 400, error: "A driver with this number already exists" });
      return;
    };

    // Crear nuevo piloto
    const newDriver = await DriverModel.addDriver({name, nationality, team, number});
    res.status(201).json(newDriver);

  } catch (error: any) {
    if(error.message.includes("already exists")) {
      res.status(400).json({status: 400, error: error.message});
    } else {
      res.status(500).json({status: 500, error: error.message});
    };
  };
};

const updateDriver = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {name, nationality, team, number} = req.body;
  
  try {
    // Validar si ya existe un piloto con el mismo nombre
    const existingDriver = await DriverModel.getDriverByName(name);
    if(existingDriver && existingDriver._id.toString() !== id) {
      res.status(400).json({ status: 400, error: "A driver with this name already exists" });
      return;
    };

    // Validar si el equipo está permitido
    const validTeams = Object.values(F1Teams);
    if(!validTeams.includes(team)) {
      res.status(400).json({ status: 400, error: `"${team}" is not a valid team. Allowed teams: ${validTeams.join(", ")}` });
      return;
    };

    // Validar si ya existe un piloto con el mismo número
    const existingNumber = await DriverModel.getDriverByNumber(number);
    if(existingNumber && existingNumber._id.toString() !== id) {
      res.status(400).json({ status: 400, error: "A driver with this number already exists" });
      return;
    };

    // Actualizar piloto
    const updatedDriver = await DriverModel.updateDriver(id, {name, nationality, team, number});
    if (!updatedDriver) {
      res.status(404).json({ status: 404, message: "Driver not found" });
      return;
    };

    res.status(200).json(updatedDriver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

const deleteDriver = async (req: Request, res: Response) => {
  const {id} = req.params;
  
  try {
    const deletedDriver = await DriverModel.deleteDriver(id);

    if (!deletedDriver) {
      res.status(404).json({ status: 404, message: "Driver not found" });
      return;
    };

    res.json(deletedDriver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

export { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };