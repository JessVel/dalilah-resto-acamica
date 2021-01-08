const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const CLAVE_CIFRADO = "Acamica2021";

const { esUnTokenValido } = require("../middleware/auth");
const { getUsuario, buscarUsuario, crearUsuario } = require("../services/usuario_services");

//Endpoint para mostrar los datos del usuario autenticado
router.get("/", esUnTokenValido, (req, res, err) => {
  const tokenDelRequest = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);

  console.log(tokenDelRequest);

  const token = getUsuario(tokenDelRequest.nombre, tokenDelRequest.contrasena);
  token.then(function (resultado) {
    console.log(resultado);
    if (resultado) {
      res.status(200).json({ resultado });
    } else {
      res.status(401).send("Usuario Invalido");
    }
  });
});

//Endpoint para autenticarse
router.post("/login", (req, res, err) => {
  const usuario = req.body.usuario;
  const contrasena = req.body.contrasena;
  const token = buscarUsuario(usuario, contrasena);
  token.then(function (resultado) {
    console.log(resultado);
    if (resultado) {
      res.status(200).json({ resultado });
    } else {
      res.status(401).send("Usuario Invalido");
    }
  });
});

//Endpoint para crear un usuario
router.post("/crearUsuario", async (req, res) => {
  const resultados = await crearUsuario(req.body.usuario, req.body.contrasena, req.body.nombre_apellido, req.body.e_mail, req.body.telefono, req.body.direccion);
  res.json(resultados, "Usuario creado correctamente");
  console.log(resultados);
});

module.exports = router;
