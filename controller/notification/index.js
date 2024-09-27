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
    const { id: userId } = req.params;

    NotificationModel.findAndCountAll({
      where: { customer_id: userId },

      offset: 0,
      order: [["created_at", "DESC"]],
      attributes: ["id", "message", "created_at", "type", "status"],
    })
      .then((list) => {
        const { count, rows } = list;

        count > 0
          ? res.status(200).send(Utility.formatResponse(200, { count, rows }))
          : res.status(404).send(Utility.formatResponse(404, "No Data Found"));
      })
      .catch((err) => {
        res.status(500).send(Utility.formatResponse(500, err.message));
      });
  },

  createNotification: (req, res) => {
    const payload = req.body;
    NotificationModel.create({ ...payload })
      .then((notification) => {
        res.status(200).send(Utility.formatResponse(200, notification.id));
      })
      .catch((err) => {
        res.status(500).send(Utility.formatResponse(500, err.message));
      });
  },

  markAsRead: (req, res) => {
    const { id } = req.params;
    return new Promise((resolve, reject) => {
      NotificationModel.update({ status: 'read' }, { where: { id: id } })
        .then(() => {
          resolve(res
            .status(200)
            .send(Utility.formatResponse(200, "Notification marked as read")));
        })
        .catch(err => {
          reject(res.status(500).send(Utility.formatResponse(500, err.message)));
        })
    })
  },

  markAllAsRead: (req, res) => {
    const { userId } = req.params;
    return new Promise((resolve, reject) => {
      NotificationModel.update({ status: "read" }, { where: { customer_id: userId } })
        .then(([updatedRows]) => {
          if (updatedRows > 0) {
            resolve(res
              .status(200)
              .send(Utility.formatResponse(200, `${updatedRows} notifications marked as read`)));
          } else {
            resolve(res
              .status(404)
              .send(Utility.formatResponse(404, "No unread notifications found")));
          }
        })
        .catch(err => {
          reject(res.status(500).send(Utility.formatResponse(500, err.message)));
        });
    });
  },
};

module.exports = NotificationController;
