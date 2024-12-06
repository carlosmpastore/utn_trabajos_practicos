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
      values: ["Red Bull", "Mercedes", "Ferrari", "McLaren", "Aston Martin", "Haas", "Sauber", "Alpine", "Williams", "Alpha Tauri"],
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
    return driver;

  } catch (error) {
    throw new Error("Failed to get driver");
  };
};

const getDriverByName = async (name: string) => {
  try {
    return await Driver.findOne({ name });

  } catch (error) {
    throw new Error("Failed to find driver by name");
  };
};

const getDriverByNumber = async (number: number) => {
  try {
    return await Driver.findOne({ number });

  } catch (error) {
    throw new Error("Failed to find driver by number");
  };
};

const addDriver = async (data: DriverData) => {
  try {
    const newDriver = new Driver(data);
    await newDriver.save();
    return newDriver;

  } catch (error) {
    throw new Error("Failed to add a new driver");
  };
};

const updateDriver = async (id: string, data: Partial<DriverData>) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, data, {new: true, runValidators: true});

    if(!updatedDriver) {
      throw new Error("Driver not found");
    };

    return updatedDriver;

  } catch (error: any) {
    console.error("Error in updateDriver:", error.message); // Agrega este log
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

  } catch (error: any) {
    console.error("Error in addDriver:", error.message); // Agrega este log
    throw new Error("Failed to delete driver");
  };
};

export default { getAllDrivers, getDriverById, getDriverByName, getDriverByNumber, addDriver, updateDriver, deleteDriver };