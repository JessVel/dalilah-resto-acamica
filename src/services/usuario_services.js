const express = require("express");
const { connection, sequelize } = require("../db/connection");
require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");

async function buscarUsuario(nombre, contrasena) {
  try {
    const resultado = await connection.query("SELECT * FROM usuario WHERE usuario = :nombre AND contrasena = :contrasena", {
      type: sequelize.QueryTypes.SELECT,
      replacements: { nombre: nombre, contrasena: contrasena },
    });
    console.log(resultado);
    if (resultado.length > 0) {
      console.log("true");
      var admin = resultado[0].es_admin;
      const token = jwt.sign({ nombre, contrasena, admin }, process.env.CLAVE_CIFRADO);
      console.log("ESTE ES EL TOKEN --> " + token);
      return token;
    } else {
      console.log("false");
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUsuario(nombre, contrasena) {
  try {
    const resultado = await connection.query("SELECT * FROM usuario WHERE usuario = :nombre AND contrasena = :contrasena", {
      type: sequelize.QueryTypes.SELECT,
      replacements: { nombre: nombre, contrasena: contrasena },
    });
    return resultado;
  } catch (err) {
    console.log(err);
  }
}

// Crear usuario
async function crearUsuario(usuario, contrasena, nombre_apellido, e_mail, telefono, direccion) {
  try {
    const resultado = await connection.query("INSERT INTO usuario VALUES (NULL, ?, ?, ?, ?, ?, ?, 'F')", {
      replacements: [usuario, contrasena, nombre_apellido, e_mail, telefono, direccion],
    });
    console.log(resultado);
  } catch (err) {
    console.log(err);
  }
}

module.exports.buscarUsuario = buscarUsuario;
module.exports.getUsuario = getUsuario;
module.exports.crearUsuario = crearUsuario;
