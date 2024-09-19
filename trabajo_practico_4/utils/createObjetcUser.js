import dotenv from "dotenv";
import { handleError } from "./handleError.js";

// 1° objetener los argumentos pasador por terminal (que vienen del index)
// 2° desarrollar las funciones que crean los objetos para añadir un usario y actualizar un usuario
// 3° aplicar control de errores entorno a las posibilidades de que surja uno

dotenv.config();

const createUserObject = (args) => {
  try {
    const [name, surname, email, password] = args.slice(1);

    return {
      name,
      surname,
      email,
      password,
    };

  } catch (error) {
    const objError = handleError(error, process.env.PATH_FILE_ERROR);
    return objError;
  }
};

const createUpdateUserObject = (args) => {
  try {
    const [id, name, surname, email, password] = args.slice(1);

    const updatedUser = {};

    updatedUser.id = id;
    if (name) updatedUser.name = name;
    if (surname) updatedUser.surname = surname;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;

    return updatedUser;

  } catch (error) {
    const objError = handleError(error, process.env.PATH_FILE_ERROR);
    return objError;
  }
};

export { createUserObject, createUpdateUserObject };