/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */


const Utility = {
    /**
    * Formatting the response with status code
   * @param {Integer} statusCode
   * @param {Object/String} res
   * @return {Object} formatted api response
    */
    
  formatResponse: (statusCode, res) => {
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
      ? {
        status,
        data: res,
      }
      : {
        status,
        msg: res,
      };
  }
}

module.exports = Utility;