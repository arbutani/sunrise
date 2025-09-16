/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { SalesService } from '../service/sales.service';
import { SalesRequestDto } from '../dto/salesRequest.dto';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createSales(
    @Body() requestDto: SalesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.salesService.createSales(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Sales created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateSales(
    @Param('id') id: string,
    @Body() requestDto: SalesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.salesService.updateSales(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Sales updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getSales(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.salesService.getsales(id);
      return this.errorMessageService.success(
        data,
        true,
        'Sales retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllSales(): Promise<any> {
    try {
      return await this.salesService.getAllsales();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteSales(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.salesService.deletesales(id);
      return this.errorMessageService.success(
        data,
        true,
        'Sales deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
