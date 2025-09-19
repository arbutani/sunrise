/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from '../entity/employeeManagement.entity';
import { EmployeeRequestDto } from '../dto/employeeManagementRequest.dto';
import { EmployeeDto } from '../dto/employeeManagement.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmployeeSalary } from 'src/employeeSalaryManagement/entity/employeeSalary.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_SALARY_REPOSITORY')
    private readonly employeeSalaryRepository: typeof EmployeeSalary,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: typeof Employee,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
    private readonly jwtService: JwtService,
  ) {}

  async createemployee(requestDto: EmployeeRequestDto) {
    try {
      const findEmployee = await this.employeeRepository.findOne({
        where: { email_address: requestDto.email_address },
      });

      if (findEmployee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee with this email address already exists',
          200,
        );
      }

      const lastEmployee = await this.employeeRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastEmployee && lastEmployee.reference_number) {
        const match = lastEmployee.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      const dateString = moment().format('DDMMYY');
      const newReferenceNumber = `E${nextSeriesNumber}-${dateString}`;
      const hashedPassword = await bcrypt.hash(requestDto.password, 10);

      const employeeFields = {
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        employee_name: requestDto.employee_name,
        email_address: requestDto.email_address,
        password: hashedPassword,
        employee_type: requestDto.employee_type,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const employee = await this.employeeRepository.create(employeeFields);

      // Check for nested salary data
      if (requestDto.salary) {
        const { employee_id: _ignored, ...salaryData } = requestDto.salary;
        const salaryFields = {
          employee_id: employee.id,
          ...salaryData,
          reference_number: newReferenceNumber,
          reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        } as any;
        await this.employeeSalaryRepository.create(salaryFields);
      }

      const newEmployee = await this.employeeRepository.findByPk(employee.id, {
        include: [EmployeeSalary],
      });
      return new EmployeeDto(newEmployee);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { email_address: email },
      });

      if (!employee) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, employee.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: employee.id, email: employee.email_address };
      const token = await this.jwtService.signAsync(payload, {
        secret: 'MY_SECRET_KEY',
        expiresIn: '1h',
      });

      return {
        access_token: token,
        employee: new EmployeeDto(employee),
      };
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateEmployee(id: string, requestDto: EmployeeRequestDto) {
    try {
      const oldEmployee = await this.employeeRepository.findByPk(id);

      if (!oldEmployee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found',
          404,
        );
      }

      const findEmployee = await this.employeeRepository.findOne({
        where: {
          email_address: requestDto.email_address,
          id: { [Op.ne]: id },
        },
      });

      if (findEmployee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee with this email address already exists',
          200,
        );
      }

      const hashedPassword = requestDto.password
        ? await bcrypt.hash(requestDto.password, 10)
        : oldEmployee.password;

      const employeeFields = {
        employee_name: requestDto.employee_name,
        email_address: requestDto.email_address,
        employee_type: requestDto.employee_type,
        password: hashedPassword,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const [updatedCount] = await this.employeeRepository.update(
        employeeFields,
        {
          where: { id },
        },
      );

      if (updatedCount > 0) {
        // Create a new salary record for the update if nested salary data is provided
        if (requestDto.salary) {
          const { employee_id, ...salaryData } = requestDto.salary;
          const salaryFields = {
            employee_id: id,
            ...salaryData,
            reference_number: oldEmployee.reference_number,
            reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
          } as any;
          await this.employeeSalaryRepository.create(salaryFields);
        }
        const updatedEmployee = await this.employeeRepository.findByPk(id);
        return new EmployeeDto(updatedEmployee);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update employee',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getEmployee(id: string) {
    try {
      const employee = await this.employeeRepository.findByPk(id, {
        include: [
          {
            model: EmployeeSalary,
            attributes: [
              'id',
              'monthly_salary',
              'working_days',
              'working_hour',
              'over_time',
              'leave_day',
              'total_attempts_day',
              'total_payable_salary',
              'reference_number',
              'reference_number_date',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
      });
      if (!employee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found',
          404,
        );
      }
      return new EmployeeDto(employee);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.employeeRepository.findAll({
        include: [
          {
            model: EmployeeSalary,
            attributes: [
              'id',
              'monthly_salary',
              'working_days',
              'working_hour',
              'over_time',
              'leave_day',
              'total_attempts_day',
              'total_payable_salary',
              'reference_number',
              'reference_number_date',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
      });
      if (!employees || employees.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Employee found',
          404,
        );
      }
      return employees.map((employee) => new EmployeeDto(employee));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteEmployee(id: string) {
    try {
      const employee = await this.employeeRepository.findByPk(id);
      if (!employee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found',
          404,
        );
      }

      await this.employeeSalaryRepository.destroy({
        where: { employee_id: id },
      });

      const deleted = await this.employeeRepository.destroy({
        where: { id: id },
      });

      if (deleted) {
        return { message: 'Employee deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Employee',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
