/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const nodemailer = require("nodemailer");

/**
 * Send an email
 * @param {String} to - recipient email address
 * @param {String} subject - email subject
 * @return {Promise} - resolves if email is sent successfully
 */
const sendEmail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rituanuragi1@gmail.com",
        pass: "geon ylan rgeq mfld",
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("getting email error", error);
        reject(error);
      } else {
        resolve(
          res
            .status(200)
            .send(Utility.formatResponse(200, { token, id: customer.id }))
        );
      }
    });
  });
};

module.exports = sendEmail;
