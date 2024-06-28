/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");
const sequelize = require("../../sequelize");

const CustomerReviewModel = sequelize.define(
  "customer_review",
  {
    customer_id: {
      type: Sequelize.INTEGER,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    review: {
      type: Sequelize.STRING, // Corrected VARCHAR to STRING
    },
    created_at: {
      type: Sequelize.DATE, // Corrected type
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CustomerReviewModel;
