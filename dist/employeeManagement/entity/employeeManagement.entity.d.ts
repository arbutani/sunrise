import { Model } from 'sequelize-typescript';
import { EmployeeSalary } from 'src/employeeSalaryManagement/entity/employeeSalary.entity';
export declare class Employee extends Model<Employee> {
    id: string;
    employee_salary: string;
    reference_number: string;
    reference_number_date: Date;
    employee_name: string;
    email_address: string;
    password: string;
    salaries: EmployeeSalary[];
    employee_type: string;
    createdAt: Date;
    updatedAt: Date;
}
