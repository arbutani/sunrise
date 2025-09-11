/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { EmployeeSalaryService } from '../service/employeeSalary.services';
import { EmployeeSalaryRequestDto } from '../dto/employeeSalaryRequest.dto';
import { EmployeeSalaryDto } from '../dto/employeeSalary.dto';

@Controller('employee-salary')
export class EmployeeSalaryController {
  constructor(
    private readonly employeeSalaryService: EmployeeSalaryService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createEmployee(
    @Body() requestDto: EmployeeSalaryRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const EmployeeSAlary =
        await this.employeeSalaryService.create(requestDto);
      return this.errorMessageService.success(
        EmployeeSAlary,
        true,
        'Salary collected successfully',
        {},
      );
      //throw this.errorMessageService.GeneralErrorCore("wait",200);
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const EmployeeSAlary = await this.employeeSalaryService.get(id);
      return this.errorMessageService.success(
        EmployeeSAlary,
        true,
        'Employee SAlary retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  /*@Get()
  async getDTEmployee(@Query() requestDto: EmployeeSalaryDto): Promise<any> {
    try {
      const employeeData = await this.employeeSalaryService.getAll();

      return this.errorMessageService.success(
        employeeData,
        true,
        'Employee data retrieved successfully',
        {},
      );
    } catch (err) {
      const safeError = err instanceof Error ? err : new Error(String(err));
      throw this.errorMessageService.error(safeError);
    }
  }*/

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const EmployeeSalary =
        await this.employeeSalaryService.deleteEmployee(id);
      return this.errorMessageService.success(
        EmployeeSalary,
        true,
        'Employee Salary deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get()
  async getAllEmployees(): Promise<any> {
    try {
      return await this.employeeSalaryService.getAllEmployees();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
