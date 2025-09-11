/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Sequelize } from 'sequelize-typescript';
import { Op, WhereOptions } from 'sequelize';
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
      const fields = {
        employee_id: requestDto.employee_id,
        monthly_salary: requestDto.monthly_salary,
        working_days: requestDto.working_days,
        working_hour: requestDto.working_hour,
        over_time: requestDto.over_time,
        leave_day: requestDto.leave_day,
        reference_number: requestDto.reference_number,
        reference_number_date: requestDto.reference_number_date,
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
