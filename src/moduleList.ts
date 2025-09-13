/* eslint-disable prettier/prettier */

import { CurrencyconversionratesModule } from './currencyConversionRates/module/currencyConversionRates.module';
import { DatabaseModule } from './database/module/database.module';
import { EmployeeModule } from './employeeManagement/module/employeeManagement.module';
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
];
