/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");

const salt = config.SALT;
const secret = config.SECRET;
const bucketName = config.BUCKET;
const region = config.REGION;
const accessKey = config.ACCESS_KEY;
const secretKey = config.SECRET_KEY;

const Utility = {
  /**
   * Creating hash of password by combining salt
   * @param {String} password
   * @return {String} encrypted password
   */
  createHash: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        err ? reject(err) : resolve(hash);
      });
    });
  },

  /**
   * Get signed token
   * @param {Integer} id userId
   * @return {String} auth token
   * @throws { Error } throws an error if there's an issue with the process
   */
  getSignedToken: (id) => {
    try {
      const token = jwt.sign({ id: id }, secret, {
        expiresIn: 86400,
      });
      return token;
    } catch (err) {
      console.error("JWT signing error:", err);
      throw err;
    }
  },

  /**
   * Comparing 2 passwords
   * @param {String} password
   * @param {String} hash
   * @return {Boolean} true/false
   */
  comparePassword: (password, hash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, isMatch) => {
        err ? reject(err) : resolve(isMatch);
      });
    });
  },

  // upload the document to s3 bucket
  uploadToS3: (folder, file, res) => {
    // Set the region and access keys
    AWS.config.update({
      region: region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });

    // Create a new instance of the S3 class
    const s3 = new AWS.S3();

    // Set the parameters for the file you want to upload
    const params = {
      Bucket: bucketName,
      Key: folder,
      Body: file.data,
      ContentType: file.mimetype,
    };

    // Upload the file to S3
    return s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error uploading file:", err);
        return res
          .status(500)
          .send(
            Utility.formatResponse(
              500,
              "Error occurred while uploading the file"
            )
          );
      } else {
        console.log(
          "File uploaded successfully. File location:",
          data.Location
        );
        return res.status(200).send(Utility.formatResponse(200, data.Location));
      }
    });
  },

  /** Middleware to verify 'x-access-token' header in the incoming request.
   */
  verifyToken: (req, res, next) => {
    return new Promise((resolve, reject) => {
      const type = req.headers["type"];
      const token = req.headers["x-access-token"];
      if (!token) {
        resolve(
          res.status(401).send(Utility.formatResponse(401, `No Token Provided`))
        );
      } else {
        jwt.verify(token, secret, (err, decoded) => {
          try {
            if (err) {
              if (err.name === "TokenExpiredError") {
                // Handle expired token
                resolve(
                  res
                    .status(401)
                    .send(Utility.formatResponse(401, "Token Expired"))
                );
              } else {
                // Handle other verification errors
                resolve(
                  res
                    .status(500)
                    .send(
                      Utility.formatResponse(
                        500,
                        "Failed To Authenticate Token"
                      )
                    )
                );
              }
            } else {
              // Token is valid, proceed with the next middleware
              req.body.userId = decoded.id;
              resolve(next());
            }
          } catch (err) {
            resolve(
              res
                .status(500)
                .send(
                  Utility.formatResponse(500, `Failed To Authenticate Token`)
                )
            );
          }
        });
      }
    });
  },

  /**
   * Formatting the response with status code
   * @param {Integer} statusCode
   * @param {Object/String} res
   * @param {Integer} count
   * @return {Object} formatted api response
   */

  formatResponse: (statusCode, res, count) => {
    let status = "";
    switch (statusCode) {
      case 200:
      case 202:
      case 204:
        status = `Success`;
        break;
      case 400:
      case 401:
      case 403:
      case 404:
      case 408:
      case 409:
      case 429:
      case 500:
      case 502:
      case 503:
      case 505:
        status = "Error";
        break;
      default:
        status = "Success";
        break;
    }
    return status === "Success"
      ? count ? {
        status,
        data: res,
        count: count
      } : {
        status,
        data: res,
      }
      : {
        status,
        msg: res,
      };
  },
};

module.exports = Utility;
