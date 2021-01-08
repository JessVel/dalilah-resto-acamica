const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pedidosRoutes = require("./routes/pedido_routes");
const productosRoutes = require("./routes/productos_routes");
const usuarioRoutes = require("./routes/usuario_routes");

// const CLAVE_CIFRADO = "Acamica2021";
// const btoa = require("btoa");
// const { query } = require("express");
// const jwt = require("jsonwebtoken");
// const connection = require("../database/connection");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/pedidos", pedidosRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/productos", productosRoutes);

app.listen(3000, () => {
  console.log("Server listening in port 3000");
});

// module.exports = app;

// //Devuelve todos los productos
// async function mostrarProductos() {
//   try {
//     const resultado = await connection.query("SELECT * FROM producto ORDER BY descripcion", {
//       type: sequelize.QueryTypes.SELECT,
//     });
//     console.log(resultado);
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para ver todos los productos, ejecutado por un usuario con Token
// app.get("/producto", esUnTokenValido, async (req, res) => {
//   const resultados = await mostrarProductos();
//   res.json(resultados);
// });

// //Crea un productos
// async function crearProducto(descripcion, precio) {
//   try {
//     const resultado = await connection.query("INSERT INTO producto VALUES (NULL, ?, ?)", {
//       replacements: [descripcion, precio],
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para crear un producto, ejecutado solamente por el admin
// app.post("/producto", esUnTokenValidoAdmin, async (req, res) => {
//   const resultados = await crearProducto(req.body.descripcion, req.body.precio);
//   res.json("EL producto ha sido creado correctamente");
// });

// //Borrar un producto
// async function borrarProducto(id) {
//   try {
//     const resultado = await connection.query("DELETE FROM producto WHERE id = :id", {
//       replacements: { id: id },
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para borrar un producto, ejecutado solamente por el admin
// app.delete("/producto", esUnTokenValidoAdmin, async (req, res) => {
//   const resultados = await borrarProducto(req.body.producto.id);
//   res.json("Se borro el producto correctamente");
// });

// //Actualizar un producto
// async function actualizarProducto(id, nuevoPrecio) {
//   try {
//     const resultado = await connection.query("UPDATE producto SET precio = :nuevoPrecio WHERE id = :id", {
//       replacements: { id: id, nuevoPrecio: nuevoPrecio },
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para actualizar el precio de un producto, ejecutado solamente por el admin
// app.put("/producto", esUnTokenValidoAdmin, async (req, res) => {
//   const resultados = await actualizarProducto(req.body.id, req.body.precio);
//   res.json("Precio del producto actualizado correctamente");
// });

//Validar usuario en la base de datos y crea token
// function esUnUsuarioValido(nombre, contrasena) {
//   const usuario = buscarUsuario(nombre, contrasena);
//   console.log(usuario);
//   if (usuario === "true") {
//     const token = jwt.sign({ nombre, contrasena }, CLAVE_CIFRADO);
//     console.log("ESTE ES EL TOKEN --> " + token);
//     return token;
//   } else {
//     return false;
//   }
// }

// async function buscarUsuario(nombre, contrasena) {
//   try {
//     const resultado = await connection.query("SELECT * FROM usuario WHERE usuario = :nombre AND contrasena = :contrasena", {
//       type: sequelize.QueryTypes.SELECT,
//       replacements: { nombre: nombre, contrasena: contrasena },
//     });
//     console.log(resultado);
//     if (resultado.length > 0) {
//       console.log("true");
//       var admin = resultado[0].es_admin;
//       const token = jwt.sign({ nombre, contrasena, admin }, CLAVE_CIFRADO);
//       console.log("ESTE ES EL TOKEN --> " + token);
//       return token;
//     } else {
//       console.log("false");
//       return false;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function getUsuario(nombre, contrasena) {
//   try {
//     const resultado = await connection.query("SELECT * FROM usuario WHERE usuario = :nombre AND contrasena = :contrasena", {
//       type: sequelize.QueryTypes.SELECT,
//       replacements: { nombre: nombre, contrasena: contrasena },
//     });
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

//Endpoint para mostrar los datos del usuario autenticado
// app.get("/datosUsuario", esUnTokenValido, (req, res, err) => {
//   const tokenDelRequest = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);

//   console.log(tokenDelRequest);

//   const token = getUsuario(tokenDelRequest.nombre, tokenDelRequest.contrasena);
//   token.then(function (resultado) {
//     console.log(resultado);
//     if (resultado) {
//       res.status(200).json({ resultado });
//     } else {
//       res.status(401).send("Usuario Invalido");
//     }
//   });
// });

// //Endpoint para autenticarse
// app.post("/login", (req, res, err) => {
//   const usuario = req.body.usuario;
//   const contrasena = req.body.contrasena;
//   const token = buscarUsuario(usuario, contrasena);
//   token.then(function (resultado) {
//     console.log(resultado);
//     if (resultado) {
//       res.status(200).json({ resultado });
//     } else {
//       res.status(401).send("Usuario Invalido");
//     }
//   });
// });

// // Crear usuario
// async function crearUsuario(usuario, contrasena, nombre_apellido, e_mail, telefono, direccion) {
//   try {
//     const resultado = await connection.query("INSERT INTO usuario VALUES (NULL, ?, ?, ?, ?, ?, ?, 'F')", {
//       replacements: [usuario, contrasena, nombre_apellido, e_mail, telefono, direccion],
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para crear un usuario
// app.post("/usuario", async (req, res) => {
//   const resultados = await crearUsuario(req.body.usuario, req.body.contrasena, req.body.nombre_apellido, req.body.e_mail, req.body.telefono, req.body.direccion);
//   res.json("Usuario creado correctamente");
// });

// //Validar TOKEN
// function esUnTokenValido(req, res, next) {
//   try {
//     const usuario = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);
//     req.usuarioValidado = usuario;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// //Validar TOKEN Admin
// function esUnTokenValidoAdmin(req, res, next) {
//   try {
//     if (typeof req.headers.authorization === "undefined") {
//       res.status(400).json({ error: "Usuario no autorizado" });
//     } else {
//       const usuario = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);
//       console.log(usuario);
//       if (usuario.admin == "T") {
//         req.usuarioValidado = usuario;
//         next();
//       } else {
//         res.status(400).json({ error: err.message });
//       }
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

// //Crear pedido
// async function crearPedidoCompleto(forma_de_pago, id_usuario, lista_producto) {
//   try {
//     const pedido = await crearPedido(forma_de_pago, id_usuario);
//     lista_producto.forEach(function (element) {
//       console.log(element);
//       const detalle = crearDetallePedido(pedido[0], element[0], element[1]);
//       detalle.then(function (resultado) {
//         console.log(resultado);
//         if (resultado) {
//           console.log("Exitoso");
//         } else {
//           console.log("Falló");
//         }
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function crearPedido(forma_de_pago, id_usuario) {
//   try {
//     var fecha = new Date();
//     const resultado = await connection.query("INSERT INTO pedido VALUES (NULL, 'NUE', ?, ?, ?)", {
//       replacements: [forma_de_pago, id_usuario, fecha],
//     });
//     console.log(resultado);
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function crearDetallePedido(id_pedido, id_producto, cantidad_platos) {
//   try {
//     const resultado = await connection.query("INSERT INTO detalle_pedido VALUES (NULL, ?, ?, ?)", {
//       replacements: [id_pedido, id_producto, cantidad_platos],
//     });
//     console.log("crearDetallePedido");
//     console.log(resultado);
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para crear pedido
// app.post("/crearPedido", esUnTokenValido, async (req, res) => {
//   const resultados = await crearPedidoCompleto(req.body.forma_de_pago, req.body.id_usuario, req.body.productos);
//   res.json("El pedido fué creado con éxito!");
// });

// //Mostrar todos los Pedidos
// async function mostrarPedidos() {
//   try {
//     const resultado = await connection.query(
//       "SELECT pe.estado, pe.fecha_hora, pe.id, pr.descripcion, pe.forma_de_pago, pr.precio, us.nombre_apellido, us.direccion " +
//         "FROM pedido pe, detalle_pedido dp, producto pr, usuario us " +
//         "WHERE pe.id = dp.id_pedido " +
//         "AND pr.id = dp.id_producto " +
//         "AND pe.id_usuario = us.id " +
//         "ORDER BY pe.id",
//       {
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );
//     console.log(resultado);
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Mostrar todos los pedidos de un usuario
// async function mostrarPedidosUsuario(nombre) {
//   try {
//     const resultado = await connection.query(
//       "SELECT pe.estado, pe.fecha_hora, pe.id, pr.descripcion, pe.forma_de_pago, pr.precio, us.nombre_apellido, us.direccion " +
//         "FROM pedido pe, detalle_pedido dp, producto pr, usuario us " +
//         "WHERE pe.id = dp.id_pedido " +
//         "AND pr.id = dp.id_producto " +
//         "AND pe.id_usuario = us.id " +
//         "AND us.usuario = :nombre " +
//         "ORDER BY pe.id",
//       {
//         type: sequelize.QueryTypes.SELECT,
//         replacements: { nombre: nombre },
//       }
//     );
//     console.log(resultado);
//     return resultado;
//   } catch (err) {
//     console.log(err);
//   }
// }

//Endpoint para mostrar todos los pedidos (admin), o todos los pedidos al usuario autenticado
// app.get("/pedido", esUnTokenValido, async (req, res) => {
//   try {
//     const usuario = jwt.verify(req.headers.authorization.split(" ")[1], CLAVE_CIFRADO);
//     if (usuario.admin == "T") {
//       const resultados = await mostrarPedidos();
//       res.json(resultados);
//     } else {
//       console.log(usuario);
//       const resultados = await mostrarPedidosUsuario(usuario.nombre);
//       res.json(resultados);
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });

//Actualizar estado de pedido
// async function actualizarEstadoPedido(id, nuevoEstado) {
//   try {
//     const resultado = await connection.query("UPDATE pedido SET estado = :nuevoEstado WHERE id = :id", {
//       replacements: { id: id, nuevoEstado: nuevoEstado },
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

//Endpoint para actualizar el estado del pedido, ejecutado solamente por el admin.
//Posibles estados: NUE (Nuevo), CON (Confirmado), PRE (En preparacion), EC (En camini), ENV (Enviado), CAN(Cancelado)
// app.put("/pedido", esUnTokenValidoAdmin, async (req, res) => {
//   const resultados = await actualizarEstadoPedido(req.body.id, req.body.estado);
//   res.json("Estado actualizado correctamente");
// });

//Borrar un pedido
// async function borrarDetallePedido(id_pedido) {
//   try {
//     const resultado = await connection.query("DELETE FROM detalle_pedido WHERE id_pedido = :id_pedido", {
//       replacements: { id_pedido: id_pedido },
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function borrarPedido(id) {
//   try {
//     const resultado = await connection.query("DELETE FROM pedido WHERE id = :id", {
//       replacements: { id: id },
//     });
//     console.log(resultado);
//   } catch (err) {
//     console.log(err);
//   }
// }

// //Endpoint para borrar un pedido, ejecutado solamente por el admin
// app.delete("/pedido", esUnTokenValidoAdmin, async (req, res) => {
//   await borrarDetallePedido(req.body.id);
//   await borrarPedido(req.body.id);
//   res.json("El pedido se eliminó correctamente");
// });
