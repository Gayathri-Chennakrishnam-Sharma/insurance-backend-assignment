const Claim = require("../../db/models/claim");
const Policy = require("../../db/models/policy");

class ClaimService {
  static async createClaim(policyId, claimData) {
    console.log("claim data coming--", claimData);
    const policy = await Policy.findByPk(policyId);
    if (!policy) {
      throw new Error("Policy not found");
    }

    return Claim.create({ ...claimData, PolicyId: policyId });
  }

  static async updateClaimStatus(claimId, status) {
    const claim = await Claim.findByPk(claimId);
    if (!claim) {
      throw new Error("Claim not found");
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
      throw new Error("Invalid status");
    }

    claim.status = status;
    await claim.save();
    return claim;
  }

  static async calculateTotalClaimAmount(customerId) {
    const claims = await Claim.findAll({
      include: {
        model: Policy,
        where: { CustomerId: customerId },
      },
    });

    return claims.reduce((total, claim) => total + claim.amount, 0);
  }
}

module.exports = ClaimService;