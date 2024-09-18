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
const CustomerApplicationController = require("../../controller/customer_application");
const LoanProviderController = require("../../controller/loan_provider");
const LoanTrackingController = require("../../controller/loan_tracking");
const NotificationController = require("../../controller/notification");

const { checkAuthenticated } = require("../../config/passportConfig");
const QueryController = require("../../controller/query");
const QueryResponseController = require("../../controller/query_response");

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
router.post("/create-document", CustomerDocumentController.createDocument);
router.post("/upload-to-s3", CustomerDocumentController.uploadDocumentToS3);

router.get(
  "/get-customer-document/:id",
  CustomerDocumentController.getCustomerProfilePhoto
);

//--------------------------------CUSTOMER FAVOURITE-------------------------------------
router.post("/get-favourites", CustomerFavouriteController.getFavourites);
router.post("/create-favourite", CustomerFavouriteController.createFavourite);
router.post("/remove-favourite", CustomerFavouriteController.removeFavourite);

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

//-----------------------------------CUSTOMER APPLICATION-----------------------------------
router.post(
  "/create-application",
  CustomerApplicationController.createApplication
);
router.get(
  "/get-applications",
  CustomerApplicationController.getApplications
);
router.get(
  "/get-application-by-id/:id",
  CustomerApplicationController.getApplicationById
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

//-----------------------------------QUERY---------------------------------------
router.post("/create-query", QueryController.createQuery);
router.get("/get-query", QueryController.getQueries);

//-----------------------------------QUERY RESPONSE---------------------------------------
router.post("/create-query-response", QueryResponseController.createQueryResponse);
router.get("/get-query-response", QueryResponseController.getQueryResponse);
router.put("/update-query-response", QueryResponseController.updateQueryResponse);

//-----------------------------------RATING AND REVIEW---------------------------------------
router.get("/get-rating", CustomerReviewController.getCustomerReview);
router.post("/create-rating", CustomerReviewController.createCustomerReview);


module.exports = router;
