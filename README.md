# Delilah Resto Acamica 🍱🍕🍔🍟🌭🥗🥟🍣🍜

## Descripción general

Este proyecto plantea la creación de un sistema de pedidos online para un restaurante. Deberás poner en funcionamiento las partes necesarias para montar una REST API que permita realizar altas, bajas, modificaciones y obtención de información sobre una estructura de datos que podría consumir un cliente. Parte del desafío estará enfocado en lograr que el desarrollo del proyecto sea puesto en producción utilizando web services.

## Herramientas 🛠

MySQL <br/>
SQL <br/>
Express <br/>
Node.js <br/>

## Para correrlo 🚀

Ejecutar los archivos `create_tables.sql` y `inserts.sql` que se encuentran dentro de la carpeta `database`.

Correr el proyecto con el script `start` o desde la terminal con `nodemon server.js`.

### Ejemplo de endpoint

http://localhost:3000/login <br/>
usuario: admin <br/>
contraseña: 12345 <br/>
Se debe copiar el token devuelto.

Para utilizar, por ejemplo el método GET, en campo "value" agregar la palabra "bearer" + TOKEN.
