const sequelize = require("sequelize");
const connection = new sequelize("mysql://root:@127.0.0.1:3306/delilah_resto");

module.exports.connection = connection;
module.exports.sequelize = sequelize;
