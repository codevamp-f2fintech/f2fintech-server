/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");

const LoanStatusModel = sequelize.define(
  "loan_status",
  {
    provider_name: {
      type: Sequelize.STRING,
    },
    loan_amount: {
      type: Sequelize.FLOAT,
    },
    roi: {
      type: Sequelize.FLOAT,
    },
    tenure: {
      type: Sequelize.INTEGER,
    },
    eligibility: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = LoanStatusModel;
