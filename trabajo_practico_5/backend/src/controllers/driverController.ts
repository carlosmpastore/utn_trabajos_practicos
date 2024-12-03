import { Request, Response } from "express";
import DriverModel from "../models/driverModel";

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
    res.json(driver);

  } catch (error: any) {
    res.status(500).json({status: 500, error: error.message});
  };
};

const addDriver = async () => {
  try {
    
  } catch (error: any) {
    
  };
};

const updateDriver = async () => {
  try {
    
  } catch (error: any) {
    
  };
};

const deleteDriver = async () => {
  try {
    
  } catch (error: any) {
    
  };
};

export { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };