import { Request, Response } from "express";
import AuthModel from "../models/authModel";
import { AuthData } from "../interfaces/authData";

const register = async (req: Request, res: Response) => {
  const {username, password} = req.body as AuthData;

  try {
    const registeredUser = await AuthModel.register({username, password});
    res.status(201).json(registeredUser);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  };
};

const login = async () => {
  try {
    
  } catch (error) {
    
  };
};

export { register, login };