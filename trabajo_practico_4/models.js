import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import dotenv from "dotenv";
import { handleError } from "./utils/handleError.js";

// 1° recuperar variables de entorno
dotenv.config();
const PATH_FILE_USER = process.env.PATH_FILE_USER;
const PATH_FILE_ERROR = process.env.PATH_FILE_ERROR;

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

const addUser = (userData) => {
  try {
    // addUser recibe un objeto con toda la data para el nuevo usuario
    const {name, surname, email, password} = userData;

    // valida que esten los datos míminos para añadir un nuevo usuario
    if (!name || !surname || !email || !password) {
      throw new Error("Missing data: make sure to instert the following information about the user: name, surname, email and password");
    };

    // valida que el nombre, apellido, email sean string
    if (typeof name !== "string" || typeof surname !== "string" || typeof email !== "string") {
      throw new Error("Make sure the user's data is a string");
    };

    // valida contenido de Email
    if (!email.includes("@")) {
      throw new Error("The email must include an '@'");
    };

    const users = getUsers(PATH_FILE_USER);

    const foundEmail = users.find((user) => user.email === email);

    if (foundEmail) {
      throw new Error("The email already exists");
    };

    //hashea la contraseña antes de registrar al usuario
    const hash = createHash("sha256").update(password).digest("hex");

    const newUser = {
      id: randomUUID(),
      name,
      surname,
      email,
      password: hash,
      isLoggedIn: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return newUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  };
};

// const obj = {
//   "nombre": "Emma",
//   "apellido":"Issac",
//   "email":"EmmaIssac@gmail.com",
//   "password":"1212"
// }

// const resp = addUser(obj);
// console.log(resp);

const updateUser = (userData) => {
  try {
    const {id, name, surname, email, password} = userData;

    //valida ID existente
    if (!id) {
      throw new Error("Insert an ID");
    };

    if (!name || !surname || !email || !password) {
      throw new Error("Missing data: make sure to instert the following information about the user: name, surname, email");
    };

    if (typeof name !== "string" || typeof surname !== "string" || typeof email !== "string") {
      throw new Error("Make sure the user's data is a string");
    };

    if (!email.includes("@")) {
      throw new Error("The email must include an '@'");
    };

    //llamada a usuarios
    const users = getUsers(PATH_FILE_USER);

    //busco id requerido
    const foundUser = users.find((user) => user.id === id);

    //si no hay usuario retorna error
    if (!foundUser) {
      throw new Error ("User not found");
    };

    //filtra usuarios para comparar email
    const filteredUsers = users.filter((user) => user.id !== id);

    //verifica que no exista el email en los demas usuarios
    const foundEmail = filteredUsers.find((user) => user.email === email);

    //si el email ya existe retorna error
    if (foundEmail) {
      throw new Error("The email already exists");
    };

    
    if (name) foundUser.name = name;
    if (surname) foundUser.surname = surname;
    if (email) foundUser.email = email;
    const hash = createHash("sha256").update(password).digest("hex");
    if (password) foundUser.password = hash;
    
    foundUser.updatedAt = new Date().toISOString();

    writeFileSync(PATH_FILE_USER, JSON.stringify(users));

    return foundUser;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  }
};

// const obj = {
//     "id":"897796d9-77a5-4d06-84f6-9fd9cc6ec045",
//     "nombre":"Juan-Pablo",
//     "apellido":"Rosso",
//     "email":"juanpablorosso@gmail.com",
//     "password":"3455"
//   }  

// console.log(updateUser(obj));

const deleteUser = (id) => {
  try {
    if (!id) {
      throw new Error("Insert an ID");
    };

    const users = getUsers(PATH_FILE_USER);
    const userToDelete = getUserById(id);

    const filteredUsers = users.filter((user) => user.id !== id);

    writeFileSync(PATH_FILE_USER, JSON.stringify(filteredUsers));
    return userToDelete;

  } catch (error) {
    const objError = handleError(error, PATH_FILE_ERROR);
    return objError;
  };
};

//const respuesta = deleteUser("897796d9-77a5-4d06-84f6-9fd9cc6ec047");
//console.log(respuesta);

export { getUsers, getUserById, addUser, updateUser, deleteUser };