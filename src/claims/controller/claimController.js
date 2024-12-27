const ClaimService = require("../service/claimService.js");

exports.fileClaim = async (req, res) => {
  try {
    const { policyId } = req.params;
    const claim = await ClaimService.createClaim(policyId, req.body);
    res.status(201).json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateClaimStatus = async (req, res) => {
  try {
    const { claimId } = req.params;
    const { status } = req.body;
    const claim = await ClaimService.updateClaimStatus(claimId, status);
    res.json(claim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
