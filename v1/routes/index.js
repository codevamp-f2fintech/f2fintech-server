const express = require("express");
const LoanProviderController = require("../../controller/loan_provider");
const CustomerReviewController = require("../../controller/customer_review");
const CustomerController = require("../../controller/customer");
const LoanApplicationController = require("../../controller/loan_application");
const { checkAuthenticated } = require("../../config/passportConfig");
const LoanStatusController = require("../../controller/loan_status");
const NotificationController = require("../../controller/notifications");

const router = express.Router();

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "API Working Fine." });
});

//-----------------------------------LOAN PROVIDER---------------------------------------
router.get('/get-loan-provider', LoanProviderController.getLoanProvider);
router.post('/create-loan-provider', LoanProviderController.createLoanProvider);

//-----------------------------------CUSTOMER---------------------------------------
router.post("/create-customer", CustomerController.register);

router.patch(
  "/update-customer",
  checkAuthenticated,
  CustomerController.updateCustomer
);

router.get("/get-customer", checkAuthenticated, CustomerController.getCustomer);
router.post("/login", CustomerController.loginCustomer);

//-----------------------------------CUSTOMER REVIEW---------------------------------------
router.get('/get-customer-review', CustomerReviewController.getCustomerReview);
router.post('/create-customer-review', CustomerReviewController.createCustomerReview);

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
router.get('/get-loan-status', LoanStatusController.getLoanStatus);

//-----------------------------------NOTIFICATIONS---------------------------------------
router.get('/get-notifications', NotificationController.getNotifications);
router.post('/create-notification', NotificationController.createNotification);


module.exports = router;
