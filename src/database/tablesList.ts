/* eslint-disable prettier/prettier */

import { Currencyconversionrates } from 'src/currencyConversionRates/entity/currencyConversionRates.entity';
import { Employee } from 'src/employeeManagement/entity/employeeManagement.entity';
import { EmployeeSalary } from 'src/employeeSalaryManagement/entity/employeeSalary.entity';
import { Inventory } from 'src/inventory/entity/inventory.entity';
import { ProductCategories } from 'src/productCategories/entity/productCategories.entity';
import { ProductDamages } from 'src/productDamages/entity/productDamages.entity';
import { Products } from 'src/products/entity/products.entity';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
import { Purchases } from 'src/purchases/entity/purchases.entity';
import { Sales } from 'src/sales/entity/sales.entity';
import { Seller } from 'src/sellers/entity/seller.entity';
import { Vendor } from 'src/vendors/entity/vendor.entity';

export const TableList = [
  Employee,
  EmployeeSalary,
  Currencyconversionrates,
  Vendor,
  Seller,
  ProductCategories,
  ProductSubcategory,
  Products,
  Purchases,
  Sales,
  ProductDamages,
  Inventory,
];
