/* eslint-disable prettier/prettier */

import { CurrencyconversionratesModule } from './currencyConversionRates/module/currencyConversionRates.module';
import { DatabaseModule } from './database/module/database.module';
import { EmployeeModule } from './employeeManagement/module/employeeManagement.module';
//import { EmployeeSalaryModule } from './employeeSalaryManagement/module/employeeSalary.module';
import { SharedModule } from './shared/module/shared.module';

export const moduleList = [
  SharedModule,
  EmployeeModule,
  DatabaseModule,
  CurrencyconversionratesModule,
  //EmployeeSalaryModule,
];
