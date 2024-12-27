const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize.js");
const Policy = require("./policy.js");

const Claim = sequelize.define("Claim", {
  claimNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  claimAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  claimReason:{
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
    defaultValue: "PENDING",
  },
});

Policy.hasMany(Claim, { foreignKey: 'PolicyId' });
Claim.belongsTo(Policy,  { foreignKey: 'PolicyId' });

module.exports = Claim;