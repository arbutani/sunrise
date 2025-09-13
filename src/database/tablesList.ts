/* eslint-disable prettier/prettier */

import { Currencyconversionrates } from 'src/currencyConversionRates/entity/currencyConversionRates.entity';
import { Employee } from 'src/employeeManagement/entity/employeeManagement.entity';
import { EmployeeSalary } from 'src/employeeSalaryManagement/entity/employeeSalary.entity';
import { Seller } from 'src/sellers/entity/seller.entity';
import { Vendor } from 'src/vendors/entity/vendor.entity';

export const TableList = [
  Employee,
  EmployeeSalary,
  Currencyconversionrates,
  Vendor,
  Seller,
];
