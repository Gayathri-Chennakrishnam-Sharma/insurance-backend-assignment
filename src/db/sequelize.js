const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeInstance = new Sequelize(
  process.env.ADMIN_DB_NAME,
  process.env.ADMIN_DB_USERNAME,
  process.env.ADMIN_DB_PASSWORD,
  {
    host: process.env.ADMIN_DB_HOST,
    port: process.env.ADMIN_DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

// sequelizeInstance
//   .sync({ force: false }) // Set to `true` only if you want to drop and recreate tables
//   .then(() => {
//     console.log("Database synchronized successfully.");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing the database:", error);
//   });


module.exports = sequelizeInstance;