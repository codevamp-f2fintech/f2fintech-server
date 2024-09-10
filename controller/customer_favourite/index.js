/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Utility = require("../../utility");
const CustomerFavouriteModel = require("../../model/customer_favourite");

const CustomerFavouriteController = {
  createFavourite: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      CustomerFavouriteModel.create(payload)
        .then((result) => {
          resolve(res.status(200).send(Utility.formatResponse(200, result)));
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },

  getFavourite: (req, res) => {
    const { limit = 10, offset = 0 } = req.body;
    return new Promise((resolve, reject) => {
      CustomerFavouriteModel.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      })
        .then((list) => {
          const { count, rows } = list;
          if (count > 0) {
            resolve(res.status(200).send(Utility.formatResponse(200, rows)));
          } else {
            resolve(
              res.status(404).send(Utility.formatResponse(404, "No Data Found"))
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

  removeFavourite: async (req, res) => {
    const {  loan_provider_id } = req.body;

    if (!loan_provider_id) {
      return res.status(400).send(Utility.formatResponse(400, "Missing loan_provider_id"));
    }

    try {
      const result = await CustomerFavouriteModel.destroy({
        where: {  loan_provider_id:  loan_provider_id },
      });

      if (result) {
        res.status(200).send(Utility.formatResponse(200, "Favourite removed successfully"));
      } else {
        res.status(404).send(Utility.formatResponse(404, "Favourite not found"));
      }
    } catch (err) {
      res.status(500).send(Utility.formatResponse(500, err.message));
    }
  },
};

module.exports = CustomerFavouriteController;
