"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const driverSchema = new mongoose_1.default.Schema({
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
}, { versionKey: false });
const Driver = mongoose_1.default.model("drivers", driverSchema);
const getAllDrivers = async () => {
    try {
        const drivers = await Driver.find();
        return drivers;
    }
    catch (error) {
        throw new Error("Failed to get drivers");
    }
    ;
};
const getDriverById = async (id) => {
    try {
        const driver = await Driver.findById(id);
        return driver;
    }
    catch (error) {
        throw new Error("Failed to get driver");
    }
    ;
};
const getDriverByName = async (name) => {
    try {
        return await Driver.findOne({ name });
    }
    catch (error) {
        throw new Error("Failed to find driver by name");
    }
    ;
};
const getDriverByNumber = async (number) => {
    try {
        return await Driver.findOne({ number });
    }
    catch (error) {
        throw new Error("Failed to find driver by number");
    }
    ;
};
const addDriver = async (data) => {
    try {
        const newDriver = new Driver(data);
        await newDriver.save();
        return newDriver;
    }
    catch (error) {
        throw new Error("Failed to add a new driver");
    }
    ;
};
const updateDriver = async (id, data) => {
    try {
        const updatedDriver = await Driver.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedDriver) {
            throw new Error("Driver not found");
        }
        ;
        return updatedDriver;
    }
    catch (error) {
        console.error("Error in updateDriver:", error.message); // Agrega este log
        throw new Error("Failed to update driver");
    }
    ;
};
const deleteDriver = async (id) => {
    try {
        const deletedDriver = await Driver.findByIdAndDelete(id);
        if (!deletedDriver) {
            throw new Error("Driver not found");
        }
        ;
        return deletedDriver;
    }
    catch (error) {
        console.error("Error in addDriver:", error.message); // Agrega este log
        throw new Error("Failed to delete driver");
    }
    ;
};
exports.default = { getAllDrivers, getDriverById, getDriverByName, getDriverByNumber, addDriver, updateDriver, deleteDriver };
