"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleList = void 0;
const currencyConversionRates_module_1 = require("./currencyConversionRates/module/currencyConversionRates.module");
const database_module_1 = require("./database/module/database.module");
const employeeManagement_module_1 = require("./employeeManagement/module/employeeManagement.module");
const productCategories_module_1 = require("./productCategories/module/productCategories.module");
const products_module_1 = require("./products/module/products.module");
const productSubcategory_module_1 = require("./productSubcategory/module/productSubcategory.module");
const purchases_module_1 = require("./purchases/module/purchases.module");
const sales_module_1 = require("./sales/module/sales.module");
const seller_module_1 = require("./sellers/module/seller.module");
const shared_module_1 = require("./shared/module/shared.module");
const vendor_module_1 = require("./vendors/module/vendor.module");
exports.moduleList = [
    shared_module_1.SharedModule,
    employeeManagement_module_1.EmployeeModule,
    database_module_1.DatabaseModule,
    currencyConversionRates_module_1.CurrencyconversionratesModule,
    vendor_module_1.VendorModule,
    seller_module_1.SellerModule,
    productCategories_module_1.ProductCategoriesModule,
    productSubcategory_module_1.ProductSubcategoryModule,
    products_module_1.ProductsModule,
    purchases_module_1.PurchasesModule,
    sales_module_1.SalesModule,
];
//# sourceMappingURL=moduleList.js.map