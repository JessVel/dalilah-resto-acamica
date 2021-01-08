const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 8080;

const pedidosRoutes = require("./routes/pedido_routes");
const productosRoutes = require("./routes/productos_routes");
const usuarioRoutes = require("./routes/usuario_routes");

const app = express();

app.use(express.json()).use(cors());

app.use("/pedidos", pedidosRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/productos", productosRoutes);

app.listen(port, () => {
  console.log(`Server listening in ${port}`);
  console.log(process.env.PORT);
  console.log(process.env.CLAVE_CIFRADO);
});
