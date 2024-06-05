/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const config = require("./config");

/**
 * Specifying database configurations
 * @param  {String} database name
 * @param  {String} username
 * @param  {String} password
 * @param  {Object} cofiguration
 * @return {Object} sequelize object
 */
const sequelize = new Sequelize(
  config.DB,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.HOST,
    port: config.DB_PORT,
    dialect: "mysql", //explicitly specifying mysql database
    dialectOptions: {
      useUTC: false, //for reading from the database
    },
  }
);
module.exports = sequelize;
