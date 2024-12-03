import mongoose from "mongoose";
import { DriverData } from "../interfaces/DriverInterface";

const driverSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  nationality: {
    type: String, 
    required: true
  },
  team: {
    type: String, 
    required: true, 
    enum: {
      values: ["Red Bull", "Mercedes", "Ferrari", "McLaren", "Aston Martin", "Hass", "Sauber", "Alpine", "Williams", "Alpha Tauri"],
      message: "{VALUE} is not a valid team"
    }
  },
  number: {
    type: Number, 
    required: true, 
    unique: true
  }
}, {versionKey: false});

const Driver = mongoose.model("drivers", driverSchema);

const getAllDrivers = async () => {
  try {
    const drivers = await Driver.find();
    return drivers;

  } catch (error) {
    throw new Error("Failed to get drivers");
  };
};

const getDriverById = async (id: string) => {
  try {
    const driver = await Driver.findById(id);

    if(!driver){
      throw new Error("Driver not found");
    };

    return driver

  } catch (error) {
    throw new Error("Failed to ger driver");
  };
};

const addDriver = async (data: DriverData) => {
  try {
    // Se verifica si ya existe un piloto con el mismo nombre
    const existingDriver = await Driver.findOne({name: data.name});

    if(existingDriver) {
      throw new Error("A driver with this name already exists");
    };

    const newDriver = new Driver(data);
    await newDriver.save();
    return newDriver;

  } catch (error) {
    throw new Error("Failed to add a new driver");
  };
};

const updateDriver = async (id: string, data: Partial<DriverData>) => {
  try {
    // Se verifica si ya existe un piloto con el mismo nombre
    const existingDriver = await Driver.findOne({name: data.name});

    // Si encuentra un piloto con el mismo nombre y su ID no coincide con el ID del piloto a actualizar se arroja un nuevo error
    if(existingDriver && existingDriver._id.toString() !== id) {
      throw new Error("A driver with this name already exists");
    };

    const updatedDriver = await Driver.findByIdAndUpdate(id, data, {new: true});

    if(!updatedDriver) {
      throw new Error("Driver not found");
    };

    return updatedDriver;

  } catch (error) {
    throw new Error("Failed to update driver");
  };
};

const deleteDriver = async (id: string) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if(!deletedDriver) {
      throw new Error("Driver not found");
    };

    return deletedDriver;

  } catch (error) {
    throw new Error("Faield to delete driver");
  };
};

export default { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };