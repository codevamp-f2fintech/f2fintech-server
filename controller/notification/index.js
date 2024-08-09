/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */
const NotificationModel = require("../../model/notification");
const Utility = require("../../utility");

const NotificationController = {
  getNotifications: (req, res) => {
    NotificationModel.findAndCountAll({
      limit: 5,
      offset: 0,
      order: [["id", "DESC"]], // Assuming 'id' is an existing column
    })
      .then((list) => {
        const { count, rows } = list;
        count > 0 ?
          res.status(200).send(Utility.formatResponse(200, { count, rows }))
          :
          res.status(404).send(Utility.formatResponse(404, "No Data Found"));
      })
      .catch((err) => {
        res.status(500).send(Utility.formatResponse(500, err.message));
      });
  },

  createNotification: (req, res) => {
    const payload = req.body;
    NotificationModel.create({ ...payload })
      .then((notification) => {
        res.status(200).send(Utility.formatResponse(200, notification));
      })
      .catch((err) => {
        res.status(500).send(Utility.formatResponse(500, err.message));
      });
  },
};

module.exports = NotificationController;
