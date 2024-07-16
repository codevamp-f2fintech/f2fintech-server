/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const session = require("express-session");

const config = require("./config");
const rateLimiter = require("./utility/rateLimiter");
const v1Routes = require("./v1/routes");
const { passport, checkAuthenticated } = require("./config/passportConfig");

// const CustomerController = require("./controller/customer");
let { connectToMysql } = require("./db");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  method: "POST",
  //this will allow multiple domains to connect
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// app.post("/create-customer", CustomerController.register);

// app.post("/api/v1/create-customer-info", (req, res) => {
//   const formData = req.body;
//   console.log("Data received from UI:", formData);
//   res.json({ message: "Data received" });
// });

app.use(cors(corsOptions));
app.use(rateLimiter);

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", v1Routes);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
