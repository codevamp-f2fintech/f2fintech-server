/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */
const LoanTrackingModel = require("../../model/loan_tracking");
const { formatResponse } = require("../../utility");

const LoanTrackingController = {
  getLoanTracking: (req, res) => {
    return new Promise((resolve, reject) => {
      LoanTrackingModel.findAndCountAll({
        limit: 5,
        offset: 0,
      })
      .then((list) => {
        const { count, rows } = list;
        console.log(list, "response");
        if (count > 0) {
          res.status(200).send(formatResponse(200, { count, rows }));
          resolve();
        } else {
          res.status(404).send(formatResponse(404, `No Data Found`));
          resolve();
        }
      })
      .catch((err) => {
        console.error("Error fetching loan providers:", err);
        res.status(500).send(formatResponse(500, err));
        reject(err);
      });
    });
  },

  createLoanTracking: (req, res) => {
    const payload = req.body;
    return new Promise((resolve, reject) => {
      LoanTrackingModel.create({ ...payload })
      .then((loanTracking) => {
        res.status(200).send(formatResponse(200, loanTracking));
        resolve();
      })
      .catch((err) => {
        console.error("Error creating loan provider:", err);
        res.status(500).send(formatResponse(500, err));
        reject(err);
      });
    });
  },
};

module.exports = LoanTrackingController;
