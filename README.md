# Delilah Resto Acamica 🍱🍕🍔🍟🌭🥗🥟🍣🍜

## Descripción general

Crearás el backend para un sistema de pedidos online para un restaurante poniendo en funcionamiento las partes necesarias para montar una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

## Herramientas 🛠

MySQL <br/>
SQL <br/>
Express <br/>
Node.js <br/>

## Para correrlo 🚀

Ir a la branch 

Ejecutar los archivos `create_tables.sql` y `inserts.sql` que se encuentran dentro de la carpeta `db` dentro de `src`.

Correr el proyecto con el script `start` o desde la terminal con `node server.js`.

### Ejemplo de endpoint

http://localhost:3000/login <br/>
usuario: admin <br/>
contraseña: 12345 <br/>
Se debe copiar el token devuelto.

Para utilizar, por ejemplo el método GET, en campo "value" agregar la palabra "bearer" + TOKEN.
