const Sequelize = require("sequelize");
module.exports.connection = new Sequelize("new", "postgres", "123", {
    host:'localhost',
    dialect: 'postgres',
    //storage: 'database.sqlite'
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });