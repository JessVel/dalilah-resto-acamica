const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const { buscarUsuario } = require("../services/usuario_services");

//Validar TOKEN
function esUnTokenValido(req, res, next) {
  try {
    const usuario = jwt.verify(req.headers.authorization.split(" ")[1], process.env.CLAVE_CIFRADO);
    req.usuarioValidado = usuario;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//Validar TOKEN Admin
function esUnTokenValidoAdmin(req, res, next) {
  try {
    if (typeof req.headers.authorization === "undefined") {
      res.status(400).json({ error: "Usuario no autorizado" });
    } else {
      const usuario = jwt.verify(req.headers.authorization.split(" ")[1], process.env.CLAVE_CIFRADO);
      console.log(usuario);
      if (usuario.admin == "T") {
        req.usuarioValidado = usuario;
        next();
      } else {
        res.status(400).json({ error: err.message });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

//VALIDAR USUARIO y crea token
function esUnUsuarioValido(nombre, contrasena) {
  const usuario = buscarUsuario(nombre, contrasena);
  console.log(usuario);
  if (usuario === "true") {
    const token = jwt.sign({ nombre, contrasena }, process.env.CLAVE_CIFRADO);
    console.log("ESTE ES EL TOKEN --> " + token);
    return token;
  } else {
    return false;
  }
}

module.exports.esUnTokenValido = esUnTokenValido;
module.exports.esUnTokenValidoAdmin = esUnTokenValidoAdmin;
module.exports.esUnUsuarioValido = esUnUsuarioValido;
