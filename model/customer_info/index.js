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
      type: Sequelize.STRING(100),
    },
    number: {
      type: Sequelize.STRING(100),
    },
    email: {
      type: Sequelize.STRING(100),
    },
    customer_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "customers",
        key: "id",
      },
    },
    pan: {
      type: Sequelize.STRING(100),
    },
    aadhaar: {
      type: Sequelize.STRING(100),
    },
    bank: {
      type: Sequelize.STRING(100),
    },
    bank_ac_type: {
      type: Sequelize.ENUM("current", "savings"),
    },
    occupation_type: {
      type: Sequelize.ENUM("business", "salary"),
    },
    occupation: {
      type: Sequelize.STRING(100),
    },
    gst_registered: {
      type: Sequelize.BOOLEAN,
    },
    gst_number: {
      type: Sequelize.STRING(100),
    },
    street: {
      type: Sequelize.STRING(100),
    },
    landmark: {
      type: Sequelize.STRING(100),
    },
    zipcode: {
      type: Sequelize.STRING(100),
    },
    city: {
      type: Sequelize.STRING(50),
    },
    state: {
      type: Sequelize.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = CustomerInfoModel;
