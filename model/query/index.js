/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Sequelize = require("sequelize");

const sequelize = require("../../sequelize");

const QueryModel = sequelize.define(
    "query",
    {
        customer_id: {
            type: Sequelize.INTEGER,
        },
        title: {
            type: Sequelize.ENUM,
            values: ["general inquiry", "technical support", "billing", "bank statement", "repayment", "foreclosure", "disbursement", "restructuring", "grievance"]
        },
        description: {
            type: Sequelize.STRING,
        },
        attachment: {
            type: Sequelize.STRING,

        },
        status: {
            type: Sequelize.ENUM,
            values: ["to do", "in progress", "hold", "done"]
        },
        created_at: {
            type: "Timestamp"
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = QueryModel;

