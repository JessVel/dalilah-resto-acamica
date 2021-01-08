const express = require("express");
const { connection, sequelize } = require("../db/connection");

//Funcion para mostrar todos los productos
async export default function mostrarProductos() {
    try {
      const resultado = await connection.query("SELECT * FROM producto ORDER BY descripcion", {
        type: sequelize.QueryTypes.SELECT,
      });
      console.log(resultado);
      return resultado;
    } catch (err) {
      console.log(err);
    }
}

//Funcion para crear productos
async export default function crearProducto(descripcion, precio) {
    try {
      const resultado = await connection.query("INSERT INTO producto VALUES (NULL, ?, ?)", {
        replacements: [descripcion, precio],
      });
      console.log(resultado);
    } catch (err) {
      console.log(err);
    }
  }

//Funcion para borrar un producto
async export default function borrarProducto(id) {
    try {
      const resultado = await connection.query("DELETE FROM producto WHERE id = :id", {
        replacements: { id: id },
      });
      console.log(resultado);
    } catch (err) {
      console.log(err);
    }
  }

//Funcion para actualizar un producto
async export default function actualizarProducto(id, nuevoPrecio) {
    try {
      const resultado = await connection.query("UPDATE producto SET precio = :nuevoPrecio WHERE id = :id", {
        replacements: { id: id, nuevoPrecio: nuevoPrecio },
      });
      console.log(resultado);
    } catch (err) {
      console.log(err);
    }
}
