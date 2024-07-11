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
  "loan_providers",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    home: {
      type: Sequelize.TINYINT, // Using TINYINT for boolean representation
      allowNull: false,
    },
    homeimage: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    interest_rate: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    short_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    long_description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    charges: {
      type: Sequelize.STRING, // Using STRING for varchar representation
      allowNull: true,
    },
    minimum_kyc: { // Corrected typo
      type: Sequelize.TEXT,
      allowNull: true,
    },
    document_required: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = LoanProviderModel;
