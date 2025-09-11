/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EmployeeType } from 'src/enum/employeeManagement/employeeType.enum';

export class EmployeeRequestDto {
  @IsNotEmpty({ message: 'Reference number is required' })
  @IsString({ message: 'Reference number must be a string' })
  reference_number: string;

  @IsNotEmpty({ message: 'Reference number date is required' })
  @IsString({ message: 'Reference number date must be a string' })
  reference_number_date: string;

  @IsNotEmpty({ message: 'Employee name is required' })
  @IsString({ message: 'Employee name must be a string' })
  employee_name: string;

  @IsNotEmpty({ message: 'Email address is required' })
  @IsString({ message: 'Email address must be a string' })
  email_address: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsNotEmpty({ message: 'Employee type is required' })
  @IsEnum(EmployeeType, {
    message: 'Employee type must be one of the allowed values',
  })
  employee_type: string;
}
