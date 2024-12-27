const Customer = require("../../db/models/customer");
const Policy = require("../../db/models/policy");
const Claim = require("../../db/models/claim");

class CustomerService {
  static async createCustomer(customerData) {
    return Customer.create(customerData);
  }

  static async getCustomerDetails(customerId) {
    const customer = await Customer.findByPk(customerId, {
      include: [
        {
          model: Policy,
          include: [Claim],
        },
      ],
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  }
}

module.exports = CustomerService;
