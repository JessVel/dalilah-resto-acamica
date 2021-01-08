const express = require("express");
const router = express.Router();

const { esUnTokenValido, esUnTokenValidoAdmin } = require("../middleware/auth");
const { mostrarProductos, crearProducto, borrarProducto, actualizarProducto } = "../services/productos_services";

//Endpoint para ver todos los productos
router.get("/", esUnTokenValido, async (req, res) => {
  const resultados = await mostrarProductos();
  res.json(resultados);
});

//Endpoint para subir un producto
router.post("/", esUnTokenValidoAdmin, async (req, res) => {
  const resultados = await crearProducto(req.body.descripcion, req.body.precio);
  res.json("EL producto ha sido creado correctamente");
});

//Enpoint para borrar un producto
router.delete("/", esUnTokenValidoAdmin, async (req, res) => {
  const resultados = await borrarProducto(req.body.producto.id);
  res.json("Se borro el producto correctamente");
});

//Actualizar producto
router.put("/", esUnTokenValidoAdmin, async (req, res) => {
  const resultados = await actualizarProducto(req.body.id, req.body.precio);
  res.json("Precio del producto actualizado correctamente");
});

module.exports = router;
