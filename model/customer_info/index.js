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
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
    },
    pan: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    aadhaar: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    bank: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    bank_ac_type: {
      type: Sequelize.ENUM("current", "savings"),
      allowNull: false,
    },
    occupation_type: {
      type: Sequelize.ENUM("business", "salary"),
      allowNull: false,
    },
    occupation: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    gst_registered: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    gst_number: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    landmark: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    zipcode: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = CustomerInfoModel;
