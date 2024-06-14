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
    return new Promise((resolve, reject) => {
      LoanProviderModel.findAndCountAll({
        limit: 5,
        offset: 0,
        order: [["roi", "ASC"]],
      })
        .then((list) => {
          const { count, rows } = list;
          count > 0
            ? resolve(
                res.status(200).send(formatResponse(200, { count, rows }))
              )
            : resolve(
                res.status(404).send(formatResponse(404, `No Data Found`))
              );
        })
        .catch((err) => {
          reject(res.status(500).send(formatResponse(500, err)));
        });
    });
  },

  createLoanProvider: (req, res) => {
    const payload = req.body;
    return new Promise((resolve, reject) => {
      LoanProviderModel.create({ ...payload })
        .then((loanProvider) => {
          resolve(
            res.status(200).send(Utility.formatResponse(200, loanProvider))
          );
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },
};

module.exports = LoanProviderController;
