import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { AuthData } from "../interfaces/authData";

process.loadEnvFile();
const JWT_SECRET = process.env.JWT_SECRET!;

const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {versionKey: false});

const User = mongoose.model("users", authSchema);

const register = async (data: AuthData) => {
  try {
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const newUser = new User({username: data.username, password: hashedPassword});
    await newUser.save();
    return newUser;

  } catch (error) {
    throw new Error("Failed to register user");
  };
};

const login = async (data: AuthData) => {
  try {
    const foundUser = await User.findOne({username: data.username});
    if(!foundUser) {
      throw new Error("Invalid data: please, check your username");
    };

    const checkedPassword = await bcryptjs.compare(data.password, foundUser.password);
    if(!checkedPassword) {
      throw new Error("Invalid data: please, check your password");
    };

    const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, { expiresIn: "1h" });
    return token;

  } catch (error) {
    
  };
};

export default { User, register, login };