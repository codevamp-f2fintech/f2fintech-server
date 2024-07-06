/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */
const NotificationModel = require("../../model/notifications");

const NotificationController = {
  getNotifications: async (req, res) => {
    try {
      const list = await NotificationModel.findAndCountAll({
        limit: 5,
        offset: 0,
        order: [["id", "DESC"]], // Assuming 'id' is an existing column
      });
      const { count, rows } = list;
      if (count > 0) {
        res.status(200).json({ status: 200, data: { count, rows } });
      } else {
        res.status(404).json({ status: 404, message: "No Data Found" });
      }
    } catch (err) {
      res.status(500).json({ status: 500, error: err.message });
    }
  },

  createNotification: async (req, res) => {
    const payload = req.body;
    try {
      const notification = await NotificationModel.create({ ...payload });
      res.status(200).json({ status: 200, data: notification });
    } catch (err) {
      res.status(500).json({ status: 500, error: err.message });
    }
  },
};

module.exports = NotificationController;


