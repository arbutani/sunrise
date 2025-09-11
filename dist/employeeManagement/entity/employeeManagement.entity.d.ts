import { Model } from 'sequelize-typescript';
import { EmployeeSalary } from 'src/employeeSalaryManagement/entity/employeeSalary.entity';
export declare class Employee extends Model<Employee> {
    id: string;
    employee_salary: EmployeeSalary[];
    reference_number: string;
    reference_number_date: Date;
    employee_name: string;
    email_address: string;
    password: string;
    employee_type: string;
    createdAt: Date;
    updatedAt: Date;
}
