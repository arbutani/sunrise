/* eslint-disable prettier/prettier */

import { CurrencyconversionratesModule } from './currencyConversionRates/module/currencyConversionRates.module';
import { DatabaseModule } from './database/module/database.module';
import { EmployeeModule } from './employeeManagement/module/employeeManagement.module';
import { InventoryModule } from './inventory/module/inventory.module';
import { ProductCategoriesModule } from './productCategories/module/productCategories.module';
import { ProductDamagesModule } from './productDamages/module/productDamages.module';
import { ProductsModule } from './products/module/products.module';
import { ProductSubcategoryModule } from './productSubcategory/module/productSubcategory.module';
import { PurchasesModule } from './purchases/module/purchases.module';
import { SalesModule } from './sales/module/sales.module';
import { SellerModule } from './sellers/module/seller.module';
import { SharedModule } from './shared/module/shared.module';
import { VendorModule } from './vendors/module/vendor.module';

export const moduleList = [
  SharedModule,
  EmployeeModule,
  DatabaseModule,
  CurrencyconversionratesModule,
  VendorModule,
  SellerModule,
  ProductCategoriesModule,
  ProductSubcategoryModule,
  ProductsModule,
  PurchasesModule,
  SalesModule,
  ProductDamagesModule,
  InventoryModule,
];
