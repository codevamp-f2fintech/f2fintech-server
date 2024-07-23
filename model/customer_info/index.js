/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");
const sequelize = require("../../sequelize");

const CustomerInfoModel = sequelize.define(
  "customer_info",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    customer_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
    },
    pan: {
      type: Sequelize.STRING,
    },
    aadhaar: {
      type: Sequelize.STRING,
    },
    bank: {
      type: Sequelize.STRING,
    },
    bank_ac_type: {
      type: Sequelize.ENUM,
      values: ["current", "savings"],
    },
    occupation_type: {
      type: Sequelize.ENUM,
      values: ["business", "salary"],
    },
    occupation: {
      type: Sequelize.STRING,
    },
    gst_registered: {
      type: Sequelize.BOOLEAN,
    },
    gst_number: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    landmark: {
      type: Sequelize.STRING,
    },
    zipcode: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = CustomerInfoModel;
