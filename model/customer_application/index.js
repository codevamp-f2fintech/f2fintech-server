/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");

const CustomerApplication = sequelize.define(
  "customer_application",
  {
    customer_id: {
      type: Sequelize.INTEGER,
    },
    application_no: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
    tenure: {
      type: Sequelize.INTEGER,
    },
    interest_rate: {
      type: Sequelize.DECIMAL,
    },
    emi_amount: {
      type: Sequelize.DECIMAL,
    },
    emi_count: {
      type: Sequelize.INTEGER,
    },
    application_date: {
      type: "Timestamp",
    },
    start_date: {
      type: "Timestamp",
    },
    end_date: {
      type: Sequelize.DATE,
    },
    last_updated: {
      type: "Timestamp",
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = CustomerApplication;
