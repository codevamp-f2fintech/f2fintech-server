/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH
 * restricted rights software. The use, reproduction, or disc
 * restrictions set forth in your license agreement with F2 F
 */

const xlsx = require("xlsx");
const LoanProvider = require("../../model/lender_providers");

const LoanProvidersController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the uploaded file
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Check if the required columns are present
    const requiredColumns = ["Provider Name", "Loan Amount", "Rate of Interest (ROI)", "Tenure", "Eligibility"];
    const missingColumns = requiredColumns.filter(column => !data[0].hasOwnProperty(column));
    if (missingColumns.length > 0) {
      return res.status(400).json({ error: `Missing columns: ${missingColumns.join(", ")}` });
    }

    // Map the data to the expected format
    const loanProviders = data.map((row) => ({
      provider_name: row["Provider Name"],
      loan_amount: row["Loan Amount"],
      roi: row["Rate of Interest (ROI)"],
      tenure: row["Tenure"],
      eligibility: row["Eligibility"],
    }));

    // Insert the data into the database
    await LoanProvider.bulkCreate(loanProviders);

    console.log(loanProviders);
    res.status(200).json({ message: "File imported successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = LoanProvidersController;