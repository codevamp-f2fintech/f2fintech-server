/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");

const LoanProviderModel = sequelize.define(
  "loan_provider",
  {
    name: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.STRING,
    },
    max_amount: {
      type: Sequelize.INTEGER,
    },
    min_amount: {
      type: Sequelize.INTEGER,
    },
    max_tenure: {
      type: Sequelize.INTEGER,
    },
    roi: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = LoanProviderModel;
