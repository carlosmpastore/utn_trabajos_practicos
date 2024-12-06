"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.updateDriver = exports.addDriver = exports.getDriverById = exports.getAllDrivers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const driverModel_1 = __importDefault(require("../models/driverModel"));
const DriverInterface_1 = require("../interfaces/DriverInterface");
const getAllDrivers = async (req, res) => {
    try {
        const drivers = await driverModel_1.default.getAllDrivers();
        res.json(drivers);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
    ;
};
exports.getAllDrivers = getAllDrivers;
const getDriverById = async (req, res) => {
    const { id } = req.params;
    try {
        // Validar si el ID tiene un formato válido
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ status: 400, error: "Invalid ID format" });
            return;
        }
        ;
        const driver = await driverModel_1.default.getDriverById(id);
        res.json(driver);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
    ;
};
exports.getDriverById = getDriverById;
const addDriver = async (req, res) => {
    const { name, nationality, team, number } = req.body;
    try {
        // Validar si ya existe un piloto con el mismo nombre
        const existingDriver = await driverModel_1.default.getDriverByName(name);
        if (existingDriver) {
            res.status(400).json({ status: 400, error: "A driver with this name already exists" });
            return;
        }
        ;
        // Validar si el equipo está permitido
        const validTeams = Object.values(DriverInterface_1.F1Teams);
        if (!validTeams.includes(team)) {
            res.status(400).json({ status: 400, error: `"${team}" is not a valid team. Allowed teams: ${validTeams.join(", ")}` });
            return;
        }
        ;
        // Validar si ya existe un piloto con el mismo número
        const existingNumber = await driverModel_1.default.getDriverByNumber(number);
        if (existingNumber) {
            res.status(400).json({ status: 400, error: `Another driver is currently using number ${number}. Please try with another number` });
            return;
        }
        ;
        // Crear nuevo piloto
        const newDriver = await driverModel_1.default.addDriver({ name, nationality, team, number });
        res.status(201).json(newDriver);
    }
    catch (error) {
        if (error.message.includes("already exists")) {
            res.status(400).json({ status: 400, error: error.message });
        }
        else {
            res.status(500).json({ status: 500, error: error.message });
        }
        ;
    }
    ;
};
exports.addDriver = addDriver;
const updateDriver = async (req, res) => {
    const { id } = req.params;
    const { name, nationality, team, number } = req.body;
    try {
        // Validar si el ID tiene un formato válido
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ status: 400, error: "Invalid ID format" });
            return;
        }
        ;
        // Crear un objeto con las propiedades definidas en req.body
        const updates = {};
        if (name)
            updates.name = name;
        if (nationality)
            updates.nationality = nationality;
        if (team)
            updates.team = team;
        if (number)
            updates.number = number;
        // Validar si ya existe un piloto con el mismo nombre (si se intenta actualizar)
        if (name) {
            const existingDriver = await driverModel_1.default.getDriverByName(name);
            if (existingDriver && existingDriver._id.toString() !== id) {
                res.status(400).json({ status: 400, error: "A driver with this name already exists" });
                return;
            }
            ;
        }
        ;
        // Validar si el equipo es válido (si se intenta actualizar)
        if (team) {
            const validTeams = Object.values(DriverInterface_1.F1Teams);
            if (!validTeams.includes(team)) {
                res.status(400).json({
                    status: 400,
                    error: `"${team}" is not a valid team. Allowed teams: ${validTeams.join(", ")}`,
                });
                return;
            }
            ;
        }
        ;
        // Validar si ya existe un piloto con el mismo número (si se intenta actualizar)
        if (number) {
            const existingNumber = await driverModel_1.default.getDriverByNumber(number);
            if (existingNumber && existingNumber._id.toString() !== id) {
                res.status(400).json({
                    status: 400,
                    error: `Another driver is currently using number ${number}. Please try with another number.`,
                });
                return;
            }
            ;
        }
        ;
        // Actualizar piloto
        const updatedDriver = await driverModel_1.default.updateDriver(id, { name, nationality, team, number });
        res.status(200).json(updatedDriver);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
    ;
};
exports.updateDriver = updateDriver;
const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDriver = await driverModel_1.default.deleteDriver(id);
        // Validar si el ID tiene un formato válido
        if (!mongoose_1.default.isValidObjectId(id)) {
            res.status(400).json({ status: 400, error: "Invalid ID format" });
            return;
        }
        ;
        res.json(deletedDriver);
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
    ;
};
exports.deleteDriver = deleteDriver;
