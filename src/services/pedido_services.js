const express = require("express");
const connection = require("../../database/connection");
const CLAVE_CIFRADO = "Acamica2021";
const jwt = require("jsonwebtoken");

//Crear pedido
async function crearPedidoCompleto(forma_de_pago, id_usuario, lista_producto) {
  try {
    const pedido = await crearPedido(forma_de_pago, id_usuario);
    lista_producto.forEach(function (element) {
      console.log(element);
      const detalle = crearDetallePedido(pedido[0], element[0], element[1]);
      detalle.then(function (resultado) {
        console.log(resultado);
        if (resultado) {
          console.log("Exitoso");
        } else {
          console.log("Falló");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

async function crearPedido(forma_de_pago, id_usuario) {
  try {
    var fecha = new Date();
    const resultado = await connection.query("INSERT INTO pedido VALUES (NULL, 'NUE', ?, ?, ?)", {
      replacements: [forma_de_pago, id_usuario, fecha],
    });
    console.log(resultado);
    return resultado;
  } catch (err) {
    console.log(err);
  }
}

async function crearDetallePedido(id_pedido, id_producto, cantidad_platos) {
  try {
    const resultado = await connection.query("INSERT INTO detalle_pedido VALUES (NULL, ?, ?, ?)", {
      replacements: [id_pedido, id_producto, cantidad_platos],
    });
    console.log("crearDetallePedido");
    console.log(resultado);
    return resultado;
  } catch (err) {
    console.log(err);
  }
}

//Mostrar todos los Pedidos
async function mostrarPedidos() {
  try {
    const resultado = await connection.query(
      "SELECT pe.estado, pe.fecha_hora, pe.id, pr.descripcion, pe.forma_de_pago, pr.precio, us.nombre_apellido, us.direccion " +
        "FROM pedido pe, detalle_pedido dp, producto pr, usuario us " +
        "WHERE pe.id = dp.id_pedido " +
        "AND pr.id = dp.id_producto " +
        "AND pe.id_usuario = us.id " +
        "ORDER BY pe.id",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(resultado);
    return resultado;
  } catch (err) {
    console.log(err);
  }
}

//Mostrar todos los pedidos de un usuario
async function mostrarPedidosUsuario(nombre) {
  try {
    const resultado = await connection.query(
      "SELECT pe.estado, pe.fecha_hora, pe.id, pr.descripcion, pe.forma_de_pago, pr.precio, us.nombre_apellido, us.direccion " +
        "FROM pedido pe, detalle_pedido dp, producto pr, usuario us " +
        "WHERE pe.id = dp.id_pedido " +
        "AND pr.id = dp.id_producto " +
        "AND pe.id_usuario = us.id " +
        "AND us.usuario = :nombre " +
        "ORDER BY pe.id",
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { nombre: nombre },
      }
    );
    console.log(resultado);
    return resultado;
  } catch (err) {
    console.log(err);
  }
}

//Actualizar estado de pedido
async function actualizarEstadoPedido(id, nuevoEstado) {
  try {
    const resultado = await connection.query("UPDATE pedido SET estado = :nuevoEstado WHERE id = :id", {
      replacements: { id: id, nuevoEstado: nuevoEstado },
    });
    console.log(resultado);
  } catch (err) {
    console.log(err);
  }
}

//Borrar un pedido
async function borrarDetallePedido(id_pedido) {
  try {
    const resultado = await connection.query("DELETE FROM detalle_pedido WHERE id_pedido = :id_pedido", {
      replacements: { id_pedido: id_pedido },
    });
    console.log(resultado);
  } catch (err) {
    console.log(err);
  }
}

async function borrarPedido(id) {
  try {
    const resultado = await connection.query("DELETE FROM pedido WHERE id = :id", {
      replacements: { id: id },
    });
    console.log(resultado);
  } catch (err) {
    console.log(err);
  }
}

module.exports.crearPedidoCompleto = crearPedidoCompleto;
module.exports.crearPedido = crearPedido;
module.exports.crearDetallePedido = crearDetallePedido;
module.exports.mostrarPedidos = mostrarPedidos;
module.exports.mostrarPedidosUsuario = mostrarPedidosUsuario;
module.exports.actualizarEstadoPedido = actualizarEstadoPedido;
module.exports.borrarDetallePedido = borrarDetallePedido;
module.exports.borrarPedido = borrarPedido;
