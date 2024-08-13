/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");
const { underscoredIf } = require("sequelize/lib/utils");

const FavouriteApiModel = sequelize.define(
  "customer_favourite",
  {
    loan_provider_id: {
      type: Sequelize.INTEGER,
    },
    customer_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = FavouriteApiModel;
