/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const CustomerLoanApplication = require("../../model/customer_application");
const Utility = require("../../utility");

const CustomerApplicationController = {
  createApplication: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      CustomerLoanApplication.create(payload)
        .then((result) => {
          resolve(res.status(200).send(Utility.formatResponse(200, result.id)));
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },

  getApplications: (req, res) => {
    const { limit = 10, offset = 0 } = req.body; // default values

    return new Promise((resolve, reject) => {
      CustomerLoanApplication.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      })
        .then((list) => {
          const { count, rows } = list;
          if (count > 0) {
            resolve(res.status(200).send(Utility.formatResponse(200, rows)));
          } else {
            resolve(
              res.status(404).send(Utility.formatResponse(404, `No Data Found`))
            );
          }
        })
        .catch((err) => {
          reject(
            res.status(500).send(Utility.formatResponse(500, err.message))
          );
        });
    });
  },

  getApplicationById: (req, res) => {
    const { id } = req.params;

    return new Promise((resolve, reject) => {
      CustomerLoanApplication.findOne({ where: { customer_id: id } })
        .then((data) => {
          if (data) {
            resolve(res.status(200).send(Utility.formatResponse(200, data)));
          } else {
            resolve(
              res.status(404).send(Utility.formatResponse(404, `No Data Found`))
            );
          }
        })
        .catch((err) => {
          reject(
            res.status(500).send(Utility.formatResponse(500, err.message))
          );
        });
    });
  },
};

module.exports = CustomerApplicationController;
