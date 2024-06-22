const express = require("express");
const LoanProviderController = require("../../controller/loan_provider");
const CustomerReviewController = require("../../controller/customer_review"); // Added correct import
const CustomerController = require("../../controller/customer");
const { formatResponse, verifyToken } = require("../../utility");
const LoanApplicationController = require("../../controller/loan_application");
const { checkAuthenticated } = require("../../config/passportConfig");
const router = express.Router();

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).send(formatResponse(200, "API Working Fine."));
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
router.get('/get-customer-review', CustomerReviewController.getCustomerReview); // Corrected controller
router.post('/create-customer-review', CustomerReviewController.createCustomerReview); // Corrected controller

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

module.exports = router;
