/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const express = require("express");

const CustomerController = require("../../controller/customer");
const CustomerDocumentController = require("../../controller/customer_document");
const CustomerInfoController = require("../../controller/customer_info");
const CustomerReviewController = require("../../controller/customer_review");
const CustomerFavouriteController = require("../../controller/customer_favourite");
const CustomerLoanApplicationController = require("../../controller/customer_application");
const LoanProviderController = require("../../controller/loan_provider");
const LoanTrackingController = require("../../controller/loan_tracking");
const NotificationController = require("../../controller/notification");

const { checkAuthenticated } = require("../../config/passportConfig");

const router = express.Router();

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "API Working Fine." });
});

//-----------------------------------CUSTOMER---------------------------------------
router.post("/create-customer", CustomerController.register);
router.patch(
  "/update-customer",
  checkAuthenticated,
  CustomerController.updateCustomer
);
router.get("/get-customer", checkAuthenticated, CustomerController.getCustomer);
router.post("/login", CustomerController.loginCustomer);

//---------------------------------CUSTOMER DOCUMENT------------------------------------
router.post(
  "/create-customer-document",
  CustomerDocumentController.createCustomerDocument
);
router.get(
  "/get-customer-document",
  CustomerDocumentController.getCustomerDocument
);
//-----------------------------------RATING AND REVIEW---------------------------------------
router.get("/get-rating", CustomerReviewController.getCustomerReview);
router.post("/create-rating", CustomerReviewController.createCustomerReview);

//--------------------------------CUSTOMER FAVOURITE-------------------------------------
router.post("/create-favourite", CustomerFavouriteController.createFavourite);
router.get("/get-favourite", CustomerFavouriteController.getFavourite);

//-----------------------------------CUSTOMER INFO---------------------------------------
router.post("/create-customer-info", CustomerInfoController.createCustomerInfo);
router.get("/get-customer-info", CustomerInfoController.getCustomerInfo);
router.get("/customer-info/:id", CustomerInfoController.getCustomerInfoById);

router.get("/get-customer-profile/:id", CustomerController.getCustomerProfile);
router.post("/reset-password", CustomerController.resetPassword);
router.post(
  "/update-customer-profile",
  CustomerController.updateCustomerProfile
);

//-----------------------------------CUSTOMER REVIEW---------------------------------------
router.get("/get-customer-review", CustomerReviewController.getCustomerReview);
router.post(
  "/create-customer-review",
  CustomerReviewController.createCustomerReview
);

//-----------------------------------LOAN APPLICATION---------------------------------------
router.post(
  "/create-loanapplication",
  CustomerLoanApplicationController.createLoanApplication
);
router.get(
  "/get-loanapplication",
  CustomerLoanApplicationController.getLoanApplication
);
router.get(
  "/get-loanapplication/:id",
  CustomerLoanApplicationController.getLoanApplicationById
);

//-----------------------------------LOAN PROVIDER---------------------------------------
router.get("/get-loan-provider", LoanProviderController.getLoanProvider);
router.post("/create-loan-provider", LoanProviderController.createLoanProvider);

//-----------------------------------LOAN TRACKING---------------------------------------
router.get("/get-loan-tracking", LoanTrackingController.getLoanTracking);
router.post("/create-loan-tracking", LoanTrackingController.createLoanTracking);

//-----------------------------------NOTIFICATIONS---------------------------------------
router.get("/get-notifications", NotificationController.getNotifications);
router.post("/create-notification", NotificationController.createNotification);


module.exports = router;
