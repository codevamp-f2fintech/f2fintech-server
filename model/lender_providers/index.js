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
  "lender_provider",
   {
  provider_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  loan_amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  roi: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  tenure: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  eligibility: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});



module.exports = LoanProviderModel;