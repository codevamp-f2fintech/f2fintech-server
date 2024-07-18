/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const passport = require("passport");
const Utility = require("../../utility");
const CustomerModel = require("../../model/customer");

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
      CustomerModel.findOne({ where: { contact: payload.contact } })
        .then((existingCustomer) => {
          if (existingCustomer) {
            return res.status(409).send(
              Utility.formatResponse(409, {
                message: "Phone number already registered",
              })
            );
          } else {
            Utility.createHash(payload.password)
              .then((hash) => {
                payload.password = hash;
                CustomerModel.create({ ...payload })
                  .then((customer) => {
                    const token = Utility.getSignedToken(customer.id);
                    resolve(
                      res.status(200).send(
                        Utility.formatResponse(200, {
                          token,
                          id: customer.id,
                        })
                      )
                    );
                  })
                  .catch((err) => {
                    reject(
                      res.status(500).send(Utility.formatResponse(500, err))
                    );
                  });
              })
              .catch((err) => {
                console.log("Error creating hash:", err);
                reject(res.status(500).send(Utility.formatResponse(500, err)));
              });
          }
        })
        .catch((err) => {
          console.log("Error finding existing customer:", err);
          reject(res.status(500).send(Utility.formatResponse(500, err)));
        });
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
    console.log(id, "customer id");
    return new Promise((resolve, reject) => {
      CustomerModel.findByPk(id)
        .then((customer) => {
          console.log("customer", customer);
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
    console.log("payload", req.body);

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
        console.log("Password updated successfully");
        res.status(200).send(Utility.formatResponse(200, "Success"));
      })
      .catch((err) => {
        console.log("Error:", err);
        res.status(500).send(Utility.formatResponse(500, err.message));
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
