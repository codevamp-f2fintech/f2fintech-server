/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "f2-fintech-web.c5wyoe202y9d.ap-southeast-1.rds.amazonaws.com",
  PORT: process.env.PORT || 8080,
  DB: process.env.DB || "f2_fintech_web",
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USERNAME: process.env.DB_USERNAME || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || 'FiNtECh2',
  SALT: process.env.SALT || 12,
  SECRET: process.env.SECRET || "F#2@FIN!&TECH%20",
};
