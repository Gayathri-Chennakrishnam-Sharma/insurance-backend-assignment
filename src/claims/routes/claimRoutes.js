const express = require("express");
const { fileClaim, updateClaimStatus } = require("../controller/claimController");

const router = express.Router();

router.post("/:policyId", fileClaim);
router.put("/:claimId", updateClaimStatus);

module.exports = router;