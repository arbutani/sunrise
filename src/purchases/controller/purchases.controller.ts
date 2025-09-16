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
import { PurchasesRequestDto } from '../dto/purchasesRequest.dto';
import { PurchasesService } from '../service/purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createPurchases(
    @Body() requestDto: PurchasesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.purchasesService.createPurchases(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Purchases created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updatePurchases(
    @Param('id') id: string,
    @Body() requestDto: PurchasesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.purchasesService.updatePurchases(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Purchases updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getPurchases(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.purchasesService.getPurchases(id);
      return this.errorMessageService.success(
        data,
        true,
        'Purchases retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllPurchases(): Promise<any> {
    try {
      return await this.purchasesService.getAllPurchases();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deletePurchases(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.purchasesService.deletePurchases(id);
      return this.errorMessageService.success(
        data,
        true,
        'Purchases deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
