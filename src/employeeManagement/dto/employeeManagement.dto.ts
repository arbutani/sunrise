/* eslint-disable prettier/prettier */

import moment from 'moment';
import { EmployeeSalaryDto } from 'src/employeeSalaryManagement/dto/employeeSalary.dto';

export class EmployeeDto {
  id: string;
  reference_number: string;
  reference_number_date: string;
  employee_name: string;
  email_address: string;
  //password: string;
  employee_type: any;
  employee_salary: any;
  salaries: EmployeeSalaryDto[];
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.reference_number = data.reference_number;
    this.reference_number_date = data.reference_number_date;
    this.employee_name = data.employee_name;
    this.email_address = data.email_address;
    //this.password = data.password;
    this.employee_type = data.type;
    this.employee_salary = data.employee_salary;

    // Map the salaries array from the input data to EmployeeSalaryDto instances
    if (data.salaries && Array.isArray(data.salaries)) {
      this.salaries = data.salaries.map(
        (salary) => new EmployeeSalaryDto(salary),
      );
    } else {
      this.salaries = []; // Initialize as an empty array if no salaries exist
    }

    const createdAt = data.createdAt
      ? data.createdAt
      : data.created_at
        ? data.created_at
        : '';
    const updatedAt = data.updatedAt
      ? data.updatedAt
      : data.updated_at
        ? data.updated_at
        : '';
    if (createdAt) {
      this.createdAt = moment(createdAt, 'YYYY-MM-DD HH:mm:ss').format(
        'DD-MM-YYYY hh:mm A',
      );
    }
    if (updatedAt) {
      this.updatedAt = moment(updatedAt, 'YYYY-MM-DD HH:mm:ss').format(
        'DD-MM-YYYY hh:mm A',
      );
    }
  }
}
