/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const express = require("express");

const { formatResponse, verifyToken } = require("../../utility");
const CustomerController = require("../../controller/customer");
const FavouriteApiController = require("../../controller/favourite_api");
const { checkAuthenticated } = require("../../config/passportConfig");
const router = express.Router();

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).send(formatResponse(200, "API Working Fine."));
});

//-----------------------------------CUSTOMER---------------------------------------
router.post("/create", CustomerController.register);

router.patch("/update", checkAuthenticated, CustomerController.updateCustomer);

router.get("/get-customer", checkAuthenticated, CustomerController.getCustomer);

router.post("/login", CustomerController.loginCustomer);

//-----------------------------------FAVOURITE API---------------------------------------
router.post("/create-favourite-api", FavouriteApiController.createFavouriteApi);
router.get("/getFavouriteApi", FavouriteApiController.getFavouriteApi);
module.exports = router;
