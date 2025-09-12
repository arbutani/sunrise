/* eslint-disable prettier/prettier */

import moment from 'moment';

export class EmployeeDto {
  id: string;
  reference_number: string;
  reference_number_date: string;
  employee_name: string;
  email_address: string;
  //password: string;
  employee_type: any;
  employee_salary: any;
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
