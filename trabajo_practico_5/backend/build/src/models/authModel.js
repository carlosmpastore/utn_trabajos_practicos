"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET;
const authSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { versionKey: false });
const User = mongoose_1.default.model("users", authSchema);
const register = async (data) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const newUser = new User({ username: data.username, password: hashedPassword });
        await newUser.save();
        return newUser;
    }
    catch (error) {
        throw new Error("Failed to register user");
    }
    ;
};
const login = async (data) => {
    try {
        const foundUser = await User.findOne({ username: data.username });
        if (!foundUser) {
            throw new Error("Invalid data: please, check your username");
        }
        ;
        const checkedPassword = await bcryptjs_1.default.compare(data.password, foundUser.password);
        if (!checkedPassword) {
            throw new Error("Invalid data: please, check your password");
        }
        ;
        const token = jsonwebtoken_1.default.sign({ id: foundUser._id }, JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
    catch (error) {
    }
    ;
};
exports.default = { User, register, login };
