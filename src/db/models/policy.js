const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");
const Customer = require("./customer");

const Policy = sequelize.define("Policy", {
  policyNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  coverageAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  premium: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Customer.hasMany(Policy, { foreignKey: 'CustomerId' });
Policy.belongsTo(Customer, { foreignKey: 'CustomerId' });

module.exports = Policy;