/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const multer = require("multer");
const express = require("express");
const LoanProviderController = require("../../controller/loan_provider");
const CustomerReviewController = require("../../controller/customer_review");
const CustomerInfoController = require("../../controller/customer_info");
const CustomerController = require("../../controller/customer");
const LoanApplicationController = require("../../controller/loan_application");
const { checkAuthenticated } = require("../../config/passportConfig");
const LoanStatusController = require("../../controller/loan_status");
const NotificationController = require("../../controller/notification");

const { formatResponse, verifyToken } = require("../../utility");
const FavouriteApiController = require("../../controller/favourite_api");

const CustomerDocumentController = require("../../controller/customer_document");
const { importLoanProviders } = require("../../controller/loan_provider");
const LoanTrackingController = require("../../controller/loan_tracker");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "API Working Fine." });
});

//-----------------------------------LOAN PROVIDER---------------------------------------
router.get("/get-loan-provider", LoanProviderController.getLoanProvider);
router.post("/create-loan-provider", LoanProviderController.createLoanProvider);
// router.post(
//   "/loan-providers/toggle-favorite/:id",
//   LoanProviderController.toggleFavorite
// );

//-----------------------------------CUSTOMER---------------------------------------
router.post("/create-customer", CustomerController.register);

router.patch(
  "/update-customer",
  checkAuthenticated,
  CustomerController.updateCustomer
);

router.get("/get-customer", checkAuthenticated, CustomerController.getCustomer);

router.post("/login", CustomerController.loginCustomer);

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
  LoanApplicationController.createLoanApplication
);

router.get(
  "/get-loanapplication",
  LoanApplicationController.getLoanApplication
);

router.get(
  "/get-loanapplication/:id",
  LoanApplicationController.getLoanApplicationById
);

//-----------------------------------LOAN STATUS---------------------------------------
router.get("/get-loan-status", LoanStatusController.getLoanStatus);

//-----------------------------------NOTIFICATIONS---------------------------------------
router.get("/get-notifications", NotificationController.getNotifications);
router.post("/create-notification", NotificationController.createNotification);

//-----------------------------------LOAN TRACKING---------------------------------------
router.get("/get-loan-tracking", LoanTrackingController.getLoanTracking);
router.post("/create-loan-tracking", LoanTrackingController.createLoanTracking);

module.exports = router;
