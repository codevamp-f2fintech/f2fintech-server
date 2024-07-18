const multer = require("multer");
const express = require("express");
const LoanProviderController = require("../../controller/loan_provider");
const CustomerReviewController = require("../../controller/customer_review");

const CustomerController = require("../../controller/customer");
const LoanApplicationController = require("../../controller/loan_application");
const { checkAuthenticated } = require("../../config/passportConfig");
const LoanStatusController = require("../../controller/loan_status");
const NotificationController = require("../../controller/notification");


const { formatResponse, verifyToken } = require("../../utility");
const CustomerController = require("../../controller/customer");
const FavouriteApiController = require("../../controller/favourite_api");
const LoanApplicationController = require("../../controller/loan_application");
const { checkAuthenticated } = require("../../config/passportConfig");
const LoanStatusController = require("../../controller/loan_status");
const CustomerDocumentController = require("../../controller/customer_document");
const { importLoanProviders } = require("../../controller/loan_provider");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//-----------------------------------TEST---------------------------------------
router.get("/test", (req, res) => {
  res.status(200).json({ status: 200, message: "API Working Fine." });
});

//-----------------------------------LOAN PROVIDER---------------------------------------
router.get("/get-loan-provider", LoanProviderController.getLoanProvider);
router.post("/create-loan-provider", LoanProviderController.createLoanProvider);

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

router.get("/get-customer-review", CustomerReviewController.getCustomerReview); // Corrected controller
router.post(
  "/create-customer-review",
  CustomerReviewController.createCustomerReview
); // Corrected controller


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
