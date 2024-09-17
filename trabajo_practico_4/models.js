import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
// Averiguar que importar de NODE para realizar el hash del pass
// Averiguar como "activar" la lectura de las variables de entorno del archivo .env (dotenv)
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";

dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

// 1° recuperar variables de entorno

// 2° Declarar los metodos

const getUsers = (urlFile) => {
  try {
    if (!urlFile) {
      throw new Error("Access denied")
    };

    const exists = existsSync(urlFile);

    if (!exists) {
      writeFileSync(urlFile, JSON.stringify([]));
      return [];
    };

    const users = JSON.parse(readFileSync(urlFile));
    return users;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  };
};

//const respuesta = getUsers(PATH_FILE_USER);
//console.log(respuesta);

const getUserById = (id) => {
  try {
    if (!id) {
      throw new Error("Insert an ID");
    };

    const users = getUsers(PATH_FILE_USER);
    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new Error("User not found");
    };

    return foundUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  };
};

//const respuesta = getUserById("1");
//console.log(respuesta);

// addUser recibe un objeto con toda la data para el nuevo usuario
// valida que esten los datos míminos para añadir un nuevo usuario
// valida que el nombre sea un string
// valida que el apellido sea un string
// valida que el email sea un string y que no se repita
// hashea la contraseña antes de registrar al usuario
const addUser = (userData) => {
  try {
  } catch (error) {}
};

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
  } catch (error) {}
};

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };