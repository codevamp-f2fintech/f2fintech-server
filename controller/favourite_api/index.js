/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const FavouriteApiModel = require("../../model/favourite_api");
const Utility = require("../../utility");

const FavouriteApiController = {
  createFavouriteApi: (req, res, next) => {
    const payload = req.body;
    console.log(payload, "payload");
    return new Promise((resolve, reject) => {
      FavouriteApiModel.create(payload)
        .then((result) => {
          resolve(res.status(200).send(Utility.formatResponse(200, result)));
        })
        .catch((err) => {
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
    });
  },

  getFavouriteApi: (req, res, next) => {
    const { limit = 10, offset = 0 } = req.body; // default values
    return new Promise((resolve, reject) => {
      FavouriteApiModel.findAndCountAll({
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
};

module.exports = FavouriteApiController;
