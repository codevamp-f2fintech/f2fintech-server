/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");

const NotificationModel = sequelize.define(
  "notification",
  {
    customer_id: {
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'sent', 'error']
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = NotificationModel;

