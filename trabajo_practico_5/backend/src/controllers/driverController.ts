import { Request, Response } from "express";
import mongoose from "mongoose";
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
    // Validar si el ID tiene un formato válido
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ status: 400, error: "Invalid ID format" });
      return;
    };

    const driver = await DriverModel.getDriverById(id);

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
      res.status(400).json({ status: 400, error: `Another driver is currently using number ${number}. Please try with another number` });
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
    // Validar si el ID tiene un formato válido
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ status: 400, error: "Invalid ID format" });
      return;
    };

    // Crear un objeto con las propiedades definidas en req.body
    const updates: Partial<DriverData> = {};
    if (name) updates.name = name;
    if (nationality) updates.nationality = nationality;
    if (team) updates.team = team;
    if (number) updates.number = number;

    // Validar si ya existe un piloto con el mismo nombre (si se intenta actualizar)
    if (name) {
      const existingDriver = await DriverModel.getDriverByName(name);
      if (existingDriver && existingDriver._id.toString() !== id) {
        res.status(400).json({ status: 400, error: "A driver with this name already exists" });
        return;
      };
    };
    
    // Validar si el equipo es válido (si se intenta actualizar)
    if (team) {
      const validTeams = Object.values(F1Teams);
      if (!validTeams.includes(team)) {
        res.status(400).json({
          status: 400,
          error: `"${team}" is not a valid team. Allowed teams: ${validTeams.join(", ")}`,
        });
        return;
      };
    };
    
    // Validar si ya existe un piloto con el mismo número (si se intenta actualizar)
    if (number) {
      const existingNumber = await DriverModel.getDriverByNumber(number);
      if (existingNumber && existingNumber._id.toString() !== id) {
        res.status(400).json({
          status: 400,
          error: `Another driver is currently using number ${number}. Please try with another number.`,
        });
        return;
      };
    };
    
    // Actualizar piloto
    const updatedDriver = await DriverModel.updateDriver(id, {name, nationality, team, number});

    res.status(200).json(updatedDriver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

const deleteDriver = async (req: Request, res: Response) => {
  const {id} = req.params;
  
  try {
    const deletedDriver = await DriverModel.deleteDriver(id);

    // Validar si el ID tiene un formato válido
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({ status: 400, error: "Invalid ID format" });
      return;
    };

    res.json(deletedDriver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

export { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };