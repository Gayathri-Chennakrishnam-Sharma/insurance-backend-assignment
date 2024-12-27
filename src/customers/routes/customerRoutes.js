const express = require("express");
const { createCustomer, getCustomerDetails } = require("../controller/customerController.js");

const router = express.Router();

router.post("/", createCustomer);
router.get("/:customerId", getCustomerDetails);

module.exports = router;