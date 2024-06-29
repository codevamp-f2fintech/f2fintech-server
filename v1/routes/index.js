/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const express = require("express");
const multer = require("multer");

const { formatResponse } = require("../../utility");
const CustomerController = require("../../controller/customer");
const FavouriteApiController = require("../../controller/favourite_api");
const { checkAuthenticated } = require("../../config/passportConfig");
const CustomerDocumentController = require("../../controller/customer_document");
// const {
  // importLoanProviders,
// } = require("../../controller/loanProviderController");

const LoanProvidersController = require("../../controller/lender_providers");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

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
router.post("/create-favourite", FavouriteApiController.createFavourite);
router.get("/get-favourite", FavouriteApiController.getFavourite);

//--------------------------CUSTOMER DOCUMENT API----------------------------
router.post(
  "/create-customer-document",
  CustomerDocumentController.createCustomerDocument
);
router.get(
  "/get-customer-document",
  CustomerDocumentController.getCustomerDocument
);

//--------------------------LOAN PROVIDERS API----------------------------
router.post("/import-loan-providers", upload.single("file"), LoanProvidersController);

module.exports = router;
