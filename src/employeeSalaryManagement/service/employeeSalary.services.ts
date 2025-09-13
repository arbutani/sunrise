/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Sequelize } from 'sequelize-typescript';
import { EmployeeSalary } from '../entity/employeeSalary.entity';
import { Employee } from 'src/employeeManagement/entity/employeeManagement.entity';
import { EmployeeSalaryRequestDto } from '../dto/employeeSalaryRequest.dto';
import { EmployeeSalaryDto } from '../dto/employeeSalary.dto';

@Injectable()
export class EmployeeSalaryService {
  constructor(
    @Inject('EMPLOYEE_SALARY_REPOSITORY')
    private readonly employeeSalaryRepository: typeof EmployeeSalary,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: typeof Employee,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async create(requestDto: EmployeeSalaryRequestDto) {
    try {
      const findEmployee = await this.employeeRepository.findOne({
        where: {
          id: requestDto.employee_id,
        },
      });
      if (!findEmployee) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found.',
          200,
        );
      }

      // Find the last employee to determine the next series number
      const lastEmployeeSalary = await this.employeeSalaryRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastEmployeeSalary && lastEmployeeSalary.reference_number) {
        // Use a regular expression to extract any number from the last reference_number.
        // This makes the logic more robust and handles different formats.
        const match = lastEmployeeSalary.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      // Generate the date string in DDMMYY format as requested
      const dateString = moment().format('DDMMYY');

      // Construct the new reference number
      const newReferenceNumber = `ES${nextSeriesNumber}-${dateString}`;

      const fields = {
        employee_id: requestDto.employee_id,
        monthly_salary: requestDto.monthly_salary,
        working_days: requestDto.working_days,
        working_hour: requestDto.working_hour,
        over_time: requestDto.over_time,
        leave_day: requestDto.leave_day,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const employeesalary = await this.employeeSalaryRepository.create(fields);
      if (employeesalary) {
        return new EmployeeSalaryDto(employeesalary);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to save employee salary data.',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async get(id: string) {
    try {
      const employeesalary = await this.employeeSalaryRepository.findByPk(id);
      if (!employeesalary) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found',
          404,
        );
      }
      return new EmployeeSalaryDto(employeesalary);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteEmployee(id: string) {
    try {
      const employeesalary = await this.employeeSalaryRepository.findByPk(id);
      if (!employeesalary) {
        throw this.errorMessageService.GeneralErrorCore(
          'Employee not found',
          404,
        );
      }
      const deleted = await this.employeeSalaryRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Employee salary deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Employee Salary',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  /*async getAll(): Promise<EmployeeSalaryDto[]> {
    try {
      const salaries = await this.employeeSalaryRepository.findAll({
        include: [
          {
            model: this.employeeRepository,
            attributes: [
              'monthly_salary',
              'working_days',
              'working_hour',
              'over_time',
              'leave_day',
              'total_attempts_day',
              'total_payable_salary',
              'reference_number',
            ], // Add more fields if needed
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return salaries.map((salary) => new EmployeeSalaryDto(salary));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }*/

  async getAllEmployees() {
    try {
      const employees = await this.employeeSalaryRepository.findAll();
      if (!employees || employees.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Employee found',
          404,
        );
      }
      return employees.map((employee) => new EmployeeSalaryDto(employee));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
