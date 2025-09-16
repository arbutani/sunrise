"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableList = void 0;
const currencyConversionRates_entity_1 = require("../currencyConversionRates/entity/currencyConversionRates.entity");
const employeeManagement_entity_1 = require("../employeeManagement/entity/employeeManagement.entity");
const employeeSalary_entity_1 = require("../employeeSalaryManagement/entity/employeeSalary.entity");
const productCategories_entity_1 = require("../productCategories/entity/productCategories.entity");
const products_entity_1 = require("../products/entity/products.entity");
const productSubcategory_entity_1 = require("../productSubcategory/entity/productSubcategory.entity");
const purchases_entity_1 = require("../purchases/entity/purchases.entity");
const sales_entity_1 = require("../sales/entity/sales.entity");
const seller_entity_1 = require("../sellers/entity/seller.entity");
const vendor_entity_1 = require("../vendors/entity/vendor.entity");
exports.TableList = [
    employeeManagement_entity_1.Employee,
    employeeSalary_entity_1.EmployeeSalary,
    currencyConversionRates_entity_1.Currencyconversionrates,
    vendor_entity_1.Vendor,
    seller_entity_1.Seller,
    productCategories_entity_1.ProductCategories,
    productSubcategory_entity_1.ProductSubcategory,
    products_entity_1.Products,
    purchases_entity_1.Purchases,
    sales_entity_1.Sales,
];
//# sourceMappingURL=tablesList.js.map