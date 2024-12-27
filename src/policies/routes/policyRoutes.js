const express = require("express");
const { createPolicy, getPolicyDetails } = require("../controller/policyController");

const router = express.Router();

router.post("/:customerId", createPolicy);
router.get("/:policyId", getPolicyDetails);

module.exports = router;
