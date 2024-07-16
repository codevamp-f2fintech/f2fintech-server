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
    LoanTrackingModel.findAndCountAll({
      limit: 5,
      offset: 0,
    })
    .then(list => {
      const { count, rows } = list;
      if (count > 0) {
        res.status(200).send(formatResponse(200, { count, rows }));
      } else {
        res.status(404).send(formatResponse(404, `No Data Found`));
      }
    })
    .catch(err => {
      console.error("Error fetching loan tracking data:", err);
      res.status(500).send(formatResponse(500, err));
    });
  },

  createLoanTracking: (req, res) => {
    const payload = req.body;
    LoanTrackingModel.create({ ...payload })
    .then(loanTracking => {
      res.status(200).send(formatResponse(200, loanTracking));
    })
    .catch(err => {
      console.error("Error creating loan tracking entry:", err);
      res.status(500).send(formatResponse(500, err));
    });
  },

  updateLoanTracking: (req, res) => {
    const { id, status } = req.body;
    LoanTrackingModel.update({ status }, { where: { id } })
    .then(loanTracking => {
      if (loanTracking[0] === 0) {
        res.status(404).send(formatResponse(404, `No Data Found`));
      } else {
        res.status(200).send(formatResponse(200, `Loan Tracking status updated successfully`));
      }
    })
    .catch(err => {
      console.error("Error updating loan tracking entry:", err);
      res.status(500).send(formatResponse(500, err));
    });
  },
};

module.exports = LoanTrackingController;
