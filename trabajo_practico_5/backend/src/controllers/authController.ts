import { Request, Response } from "express";
import AuthModel from "../models/authModel";
import { AuthData } from "../interfaces/authData";

const register = async (req: Request, res: Response) => {
  const {username, password} = req.body as AuthData;

  try {
    const registeredUser = await AuthModel.register({username, password});
    res.status(201).json(registeredUser);

  } catch (error: any) {
    res.status(500).json({ status: 500, error: error.message });
  };
};

const login = async (req: Request, res: Response) => {
  const {username, password} = req.body as AuthData;
  
  try {
    const token = await AuthModel.login({username, password});
    res.status(200).json(token);

  } catch (error: any) {
    res.status(401).json({ status: 401, error: error.message });
  };
};

export { register, login };