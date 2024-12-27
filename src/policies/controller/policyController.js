const PolicyService = require("../service/policyService.js");

exports.createPolicy = async (req, res) => {
  try {
    const { customerId } = req.params;
    const policy = await PolicyService.createPolicy(customerId, req.body);
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPolicyDetails = async (req, res) => {
  try {
    const { policyId } = req.params;
    const policyDetails = await PolicyService.getPolicyDetails(policyId);
    res.json(policyDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
