/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const LoanTrackingModel = require("../../model/loan_tracking");
const Utility = require("../../utility");

const LoanTrackingController = {
  getLoanTracking: (req, res) => {
    const { limit = 5, offset = 0 } = req.body; // default values
    return new Promise((resolve, reject) => {
      LoanTrackingModel.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      })
        .then((list) => {
          const { count, rows } = list;
          if (count > 0) {
            resolve(res.status(200).send(Utility.formatResponse(200, { count, rows })));
          } else {
            resolve(res.status(404).send(Utility.formatResponse(404, "No Data Found")));
          }
        })
        .catch((err) => {
          console.error("Error fetching loan providers:", err);
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },

  createLoanTracking: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      LoanTrackingModel.create(payload)
        .then((loanTracking) => {
          resolve(res.status(200).send(Utility.formatResponse(200, loanTracking)));
        })
        .catch((err) => {
          console.error("Error creating loan provider:", err);
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },
};

module.exports = LoanTrackingController;
