const Policy = require("../../db/models/policy");
const Customer = require("../../db/models/customer");

class PolicyService {
  static async createPolicy(customerId, policyData) {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    return Policy.create({ ...policyData, CustomerId: customerId });
  }

  static async getPolicyDetails(policyId) {
    const policy = await Policy.findByPk(policyId, {
      include: [Customer],
    });

    if (!policy) {
      throw new Error("Policy not found");
    }

    return policy;
  }
}

module.exports = PolicyService;
