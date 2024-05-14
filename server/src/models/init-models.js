var DataTypes = require("sequelize").DataTypes;
var _Customers = require("./Customers");
var _Medications = require("./Medications");
var _Users = require("./Users");

function initModels(sequelize) {
  var Customers = _Customers(sequelize, DataTypes);
  var Medications = _Medications(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);


  return {
    Customers,
    Medications,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
