import { Request, response, Response } from "express";
import DriverModel from "../models/driverModel";
import { DriverData } from "../interfaces/DriverInterface";

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

    if(!driver){
      res.status(404).json({status: 404, error: "Driver not found"});
    };

    res.json(driver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

const addDriver = async (req: Request, res: Response) => {
  const {name, nationality, team, number} = req.body as DriverData;
  
  try {
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
    res.json(deletedDriver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

export { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };