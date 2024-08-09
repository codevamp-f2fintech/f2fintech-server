/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const passport = require("passport");

const CustomerModel = require("../../model/customer");
const sendEmail = require("../../utility/email");
const Utility = require("../../utility");

const login = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, customer, info) => {
      if (err) return reject(err);
      if (!customer) {
        return resolve(
          res.status(401).send(Utility.formatResponse(401, info.message))
        );
      }
      req.logIn(customer, (err) => {
        if (err) return reject(err);
        resolve(
          res.status(200).send(
            Utility.formatResponse(200, {
              token: Utility.getSignedToken(customer.id),
              name: customer.name,
              id: customer.id,
            })
          )
        );
      });
    })(req, res, next);
  });
};

const CustomerController = {
  register: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      if (payload.password) {
        Utility.createHash(payload.password)
          .then((hash) => {
            payload.password = hash;
            CustomerModel.create({ ...payload })
              .then((customer) => {
                const token = Utility.getSignedToken(customer.id);
                resolve(
                  res
                    .status(200)
                    .send(
                      Utility.formatResponse(200, { token, id: customer.id })
                    )
                );
              })
              .catch((err) => {
                reject(res.status(500).send(Utility.formatResponse(500, err)));
              });
          })
          .catch((err) => {
            reject(res.status(500).send(Utility.formatResponse(500, err)));
          });
      } else {
        CustomerModel.create({ ...payload })
          .then((customer) => {
            // make a func -sendemail under utility file keep
            const mailOptions = {
              from: "rituanuragi1@gmail.com",
              to: payload.email,
              subject: "Welcome to F2 Fintech - Reset Your Password",
              html: `
               
               <div style="background-color: #f9f9f9; padding: 10px;">
              <div
                style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 10px; margin-right:0px">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsW7BlfVZmbNX3uaGdcdmdVd_zsaapbNpww&s" alt="F2 Fintech Logo" style="max-width: 100px;" />
            </div>
           

                <p style="font-size: 18px; color: #2c3ce3;">Hello <b>${payload.name}!</b></p>
                <p style="font-size: 16px; color: #555;">We're glad to have you on board at F2 Fintech.</p>
                <p style="font-size: 16px; color: #555;">We have created your user account with the entered contact number.</p>
                <p style="font-size: 16px; text-align: center; margin: 20px 0;">
                <a href="http://localhost:5173/reset-password" 
               style="color: #ffffff; background-color: #2c3ce3; padding: 12px 25px; text-decoration: none; border-radius: 25px; display: inline-block;">
              Kindly Reset Your Password By Clicking Here
            </a>
          </p>
                <br />
                <p style="font-size: 16px; color: #555;">Thanks and Regards,<br />F2 Fintech</p>
              </div>
            </div>
              `,
            };

            sendEmail(mailOptions).catch((err) =>
              console.error("Error sending email:", err)
            );
            const token = Utility.getSignedToken(customer.id);
            resolve(
              res
                .status(200)
                .send(Utility.formatResponse(200, { token, id: customer.id }))
            );
          })
          .catch((err) => {
            reject(res.status(500).send(Utility.formatResponse(500, err)));
          });
      }
    });
  },

  updateCustomer: (req, res) => {
    const payload = req.body;

    return new Promise((resolve, reject) => {
      let updatePromise = Promise.resolve(payload);
      if (payload.password) {
        updatePromise = Utility.createHash(payload.password)
          .then((hash) => {
            payload.password = hash;
            return payload;
          })
          .catch((err) => {
            reject(
              res.status(500).send(Utility.formatResponse(500, err.message))
            );
          });
      }

      updatePromise
        .then((updatedPayload) => {
          CustomerModel.update(
            { ...updatedPayload },
            { where: { id: payload.id } }
          )
            .then(() => {
              resolve(
                res
                  .status(200)
                  .send(Utility.formatResponse(200, `Updated Successfully`))
              );
            })
            .catch((err) => {
              reject(res.status(500).send(Utility.formatResponse(500, err)));
            });
        })
        .catch((err) => {
          console.error("Error updating customer: " + err);
          reject(
            res.status(500).send(Utility.formatResponse(500, err.message))
          );
        });
    });
  },

  getCustomer: (req, res) => {
    const { limit = 10, offset = 0 } = req.body; // default values

    return new Promise((resolve, reject) => {
      CustomerModel.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      })
        .then((list) => {
          const { count, rows } = list;
          if (count > 0) {
            resolve(
              res.status(200).send(Utility.formatResponse(200, { count, rows }))
            );
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

  getCustomerProfile: (req, res) => {
    const { id } = req.params; // default values

    return new Promise((resolve, reject) => {
      CustomerModel.findByPk(id)
        .then((customer) => {
          if (customer) {
            resolve(
              res.status(200).send(Utility.formatResponse(200, { customer }))
            );
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

  resetPassword: (req, res) => {
    const { customerId, newPassword } = req.body;

    CustomerModel.findOne({ where: { id: customerId } })
      .then((existingCustomer) => {
        if (!existingCustomer) {
          return res
            .status(404)
            .send(Utility.formatResponse(404, "Customer not found"));
        }

        return Utility.createHash(newPassword);
      })
      .then((hash) => {
        return CustomerModel.update(
          { password: hash },
          { where: { id: customerId } }
        );
      })
      .then(() => {
        res.status(200).send(Utility.formatResponse(200, "Success"));
      })
      .catch((err) => {
        res.status(500).send(Utility.formatResponse(500, err));
      });
  },

  updateCustomerProfile: (req, res) => {
    const { customerId, name, email, gender, contact } = req.body;
    CustomerModel.update(
      { name: name, email: email, gender: gender, contact: contact },
      { where: { id: customerId } }
    )
      .then(() => {
        res.status(200).send(Utility.formatResponse(200, "Success"));
      })
      .catch((err) => {
        res
          .status(505)
          .send(Utility.formatResponse(505, "Contact already Exist"));
      });
  },

  loginCustomer: (req, res, next) => {
    login(req, res, next).catch((err) => {
      console.error("Error during authentication: " + err);
      res.status(500).send(Utility.formatResponse(500, err.message));
    });
  },
};

module.exports = CustomerController;
