import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
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
    const {name, surname, email, password, isLoggedIn} = userData;

    if (!name || !surname || !email || !password) {
      throw new Error("Missing data: make sure to instert the following information about the user: name, surname, email, password and if it is logged in - in case it doesn't, you don't have to write anything");
    };

    if (typeof name !== "string" || typeof surname !== "string" || typeof email !== "string") {
      throw new Error("Make sure the user's data is a string");
    };

    if (!email.includes("@")) {
      throw new Error("The email must include an '@'");
    };

    const users = getUsers(PATH_FILE_USER);

    const foundEmail = users.find((user) => user.email === email);

    if (foundEmail) {
      throw new Error("The email already exists");
    };

    const hash = createHash("sha256").update(password).digest("hex");

    const newUser = {
      id: randomUUID(),
      name,
      surname,
      email,
      password: hash,
      isLoggedIn: isLoggedIn === "logged in" ? true : false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toDateString(),
    };

    users.push(newUser);
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  };
};

//const respuesta = addUser({
  //name: "Josemir",
  //surname: "Lujambio",
  //email: "info@lujambio.com",
  //password: "abcd",
  //isLoggedIn: "logged in"
//});
//console.log(respuesta);

// todos los datos del usuario seleccionado se podrían modificar menos el ID
// si se modifica la pass debería ser nuevamente hasheada
// si se modifica el email, validar que este no exista
const updateUser = (userData) => {
  try {
    const {id, name, surname, email, password, isLoggedIn} = userData;

    if (!id) {
      throw new Error("Insert an ID");
    };

    const users = getUsers(PATH_FILE_USER);

    const foundUser = users.find((user) => user.id === id);

    if (!foundUser) {
      throw new Error ("User not found");
    };

    if (!name || !surname || !email || !password) {
      throw new Error("Missing data: make sure to instert the following information about the user: name, surname, email, password and if it is logged in - in case it doesn't, you don't have to write anything");
    };

    if (typeof name !== "string" || typeof surname !== "string" || typeof email !== "string") {
      throw new Error("Make sure the user's data is a string");
    };

    if (!email.includes("@")) {
      throw new Error("The email must include an '@'");
    };

    const filteredUsers = users.filter((user) => user.id !== id);

    const foundEmail = filteredUsers.find((user) => user.email === email);

    if (foundEmail) {
      throw new Error("The email already exists");
    };

    
    if (name) foundUser.name = name;
    if (surname) foundUser.surname = surname;
    if (email) foundUser.email = email;
    const hash = createHash("sha256").update(password).digest("hex");
    if (password) foundUser.password = hash;
    if (isLoggedIn) foundUser.isLoggedIn === "logged in" ? true : false;

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return foundUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

const respuesta = updateUser({
  id:"3d8556a5-7bcf-4910-9403-e93895848cfc",
  name: "Yosenit",
  surname: "Lugambio",
  email: "info@lugambio.com",
  password: "abcd",
  isLoggedIn: "",
});
console.log(respuesta);

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };