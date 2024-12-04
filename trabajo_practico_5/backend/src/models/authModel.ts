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