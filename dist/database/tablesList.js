"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableList = void 0;
const currencyConversionRates_entity_1 = require("../currencyConversionRates/entity/currencyConversionRates.entity");
const employeeManagement_entity_1 = require("../employeeManagement/entity/employeeManagement.entity");
const employeeSalary_entity_1 = require("../employeeSalaryManagement/entity/employeeSalary.entity");
const seller_entity_1 = require("../sellers/entity/seller.entity");
const vendor_entity_1 = require("../vendors/entity/vendor.entity");
exports.TableList = [
    employeeManagement_entity_1.Employee,
    employeeSalary_entity_1.EmployeeSalary,
    currencyConversionRates_entity_1.Currencyconversionrates,
    vendor_entity_1.Vendor,
    seller_entity_1.Seller,
];
//# sourceMappingURL=tablesList.js.map