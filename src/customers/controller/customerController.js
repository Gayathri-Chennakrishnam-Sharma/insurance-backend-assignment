const CustomerService = require("../service/customerService");

exports.createCustomer = async (req, res) => {
  try {
    console.log("req found--", req);
    const customer = await CustomerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerDetails = await CustomerService.getCustomerDetails(customerId);
    res.json(customerDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};