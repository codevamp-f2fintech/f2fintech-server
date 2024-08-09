/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const CustomerReviewModel = require("../../model/customer_review");
const Utility = require("../../utility");

const CustomerReviewController = {
  getCustomerReview: (req, res) => {
    return new Promise((resolve, reject) => {
      CustomerReviewModel.findAndCountAll({
        limit: 5,
        offset: 0,
        order: [["rating", "ASC"]],
      })
        .then((list) => {
          const { count, rows } = list;
          count > 0
            ? resolve(res.status(200).send(Utility.formatResponse(200, { count, rows })))
            : resolve(res.status(404).send(Utility.formatResponse(404, `No Data Found`)));
        })
        .catch((err) => {
          reject(res.status(500).send(formatResponse(500, err)));
        });
    });
  },

  createCustomerReview: (req, res) => {
    const payload = req.body;
    return new Promise((resolve, reject) => {
      CustomerReviewModel.create({ ...payload })
        .then((customerReview) => {
          resolve(res.status(200).send(Utility.formatResponse(200, customerReview)));
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },
};

module.exports = CustomerReviewController;
