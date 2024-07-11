/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */
const LoanProviderModel = require("../../model/loan_provider");
const { formatResponse } = require("../../utility");

const LoanProviderController = {
  getLoanProvider: (req, res) => {
    LoanProviderModel.findAndCountAll({
      limit: 5,
      offset: 0,
    })
      .then((list) => {
        const { count, rows } = list;
        if (count > 0) {
          res.status(200).send(formatResponse(200, { count, rows }));
        } else {
          res.status(404).send(formatResponse(404, "No Data Found"));
        }
      })
      .catch((err) => {
        console.error("Error fetching loan providers:", err);
        res.status(500).send(formatResponse(500, err.message));
      });
  },

  createLoanProvider: (req, res) => {
    const payload = req.body;
    LoanProviderModel.create({ ...payload })
      .then((loanProvider) => {
        res.status(200).send(formatResponse(200, loanProvider));
      })
      .catch((err) => {
        console.error("Error creating loan provider:", err);
        res.status(500).send(formatResponse(500, err.message));
      });
  },
};

module.exports = LoanProviderController;
