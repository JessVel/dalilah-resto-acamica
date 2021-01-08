const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const CLAVE_CIFRADO = "Acamica2021";

const { esUnTokenValido, esUnTokenValidoAdmin } = require("../middleware/auth");
// import { esUnTokenValido, esUnTokenValidoAdmin } from "../middleware/auth";
const { mostrarPedidos, crearPedidoCompleto, mostrarPedidosUsuario, actualizarEstadoPedido, borrarDetallePedido, borrarPedido } = require("../services/pedido_services");

//Endpoint para crear pedido
router.post("/", esUnTokenValido, async (req, res) => {
  const resultados = await crearPedidoCompleto(req.body.forma_de_pago, req.body.id_usuario, req.body.productos);
  res.json("El pedido fué creado con éxito!");
});

//Endpoint para mostrar todos los pedidos (admin), o todos los pedidos al usuario autenticado
router.get("/", esUnTokenValido, async (req, res) => {
  try {
    const usuario = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);
    if (usuario.admin == "T") {
      const resultados = await mostrarPedidos();
      res.json(resultados);
    } else {
      console.log(usuario);
      const resultados = await mostrarPedidosUsuario(usuario.nombre);
      res.json(resultados);
    }
  } catch (err) {
    console.log(err.message);
  }
});

//Endpoint para actualizar el estado del pedido, ejecutado solamente por el admin.
//Posibles estados: NUE (Nuevo), CON (Confirmado), PRE (En preparacion), EC (En camini), ENV (Enviado), CAN(Cancelado)
router.put("/", esUnTokenValidoAdmin, async (req, res) => {
  const resultados = await actualizarEstadoPedido(req.body.id, req.body.estado);
  res.json("Estado actualizado correctamente");
});

//Endpoint para borrar un pedido, ejecutado solamente por el admin
router.delete("/", esUnTokenValidoAdmin, async (req, res) => {
  await borrarDetallePedido(req.body.id);
  await borrarPedido(req.body.id);
  res.json("El pedido se eliminó correctamente");
});

module.exports = router;
