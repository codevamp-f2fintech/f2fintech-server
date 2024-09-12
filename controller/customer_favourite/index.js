/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const CustomerFavouriteModel = require("../../model/customer_favourite");
const Utility = require("../../utility");

const CustomerFavouriteController = {
  // Create a favourite in the database
  createFavourite: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      CustomerFavouriteModel.create({ ...payload })
        .then((result) => {
          resolve(res.status(200).send(Utility.formatResponse(200, result)));
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },

  // Get favourites from db
  getFavourites: (req, res) => {
    const { loan_provider_id, customer_id, limit = 10, offset = 0 } = req.body;

    // run when loan_provider_id and customer_id are provided
    if (loan_provider_id && customer_id) {
      return new Promise((resolve, reject) => {
        CustomerFavouriteModel.findOne({
          where: { loan_provider_id, customer_id },
        })
          .then((favorite) => {
            if (favorite) {
              resolve(res.status(200).send(Utility.formatResponse(200, { isFavorite: true })));
            } else {
              resolve(res.status(200).send(Utility.formatResponse(200, { isFavorite: false })));
            }
          })
          .catch((err) => {
            reject(res.status(500).send(Utility.formatResponse(500, err.message)));
          });
      });
    }

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

  // Remove a favourite from the database using loan_provider_id and customer_id
  removeFavourite: async (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      CustomerFavouriteModel.destroy({
        where: { loan_provider_id: payload.loan_provider_id, customer_id: payload.customer_id }
      })
        .then((data) => {
          if (data) {
            resolve(res.status(200).send(Utility.formatResponse(200, 'Removed Successfully')));
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
  }
};

module.exports = CustomerFavouriteController;
