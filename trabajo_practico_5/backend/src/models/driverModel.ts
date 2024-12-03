import mongoose from "mongoose";

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

const addDriver = async () => {
  try {
    
  } catch (error) {
    
  };
};

const updateDriver = async () => {
  try {
    
  } catch (error) {
    
  };
};

const deleteDriver = async () => {
  try {
    
  } catch (error) {
    
  };
};

export default { getAllDrivers, getDriverById, addDriver, updateDriver, deleteDriver };