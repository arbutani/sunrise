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
import { CurrencyconversionratesService } from '../service/currencyConversionRates.service';
import { CurrencyconversionratesRequestDto } from '../dto/currencyConversionRatesRequest.dto';

@Controller('currency-conversion-rates')
export class CurrencyconversionratesController {
  constructor(
    private readonly currencyconversionratessarvice: CurrencyconversionratesService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async Currencyconversionrates(
    @Body() requestDto: CurrencyconversionratesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const currencyconversionrate =
        await this.currencyconversionratessarvice.createcurrencyconversionrate(
          requestDto,
        );
      return this.errorMessageService.success(
        currencyconversionrate,
        true,
        'Currencyconversionrates created successfully',
        {},
      );
    } catch (error: unknown) {
      throw this.errorMessageService.error(error as Error);
    }
  }

  @Put(':id')
  async updateCurrencyconversionrates(
    @Param('id') id: string,
    @Body() requestDto: CurrencyconversionratesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratessarvice.updateCurrencyconversionrates(
          id,
          requestDto,
        );
      return this.errorMessageService.success(
        Currencyconversionrates,
        true,
        'Currencyconversionrates updated successfully',
        {},
      );
    } catch (error: unknown) {
      throw this.errorMessageService.error(error as Error);
    }
  }

  @Get(':id')
  async getCurrencyconversionrates(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratessarvice.getCurrencyconversionrates(
          id,
        );
      return this.errorMessageService.success(
        Currencyconversionrates,
        true,
        'Currencyconversionrates retrieved successfully',
        {},
      );
    } catch (error: unknown) {
      throw this.errorMessageService.error(error as Error);
    }
  }
  @Get()
  async getAllCurrencyconversionrates(): Promise<any> {
    try {
      return await this.currencyconversionratessarvice.getAllCurrencyconversionrates();
    } catch (error: unknown) {
      throw this.errorMessageService.error(error as Error);
    }
  }
  @Delete(':id')
  async deleteCurrencyconversionrates(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratessarvice.deleteCurrencyconversionratese(
          id,
        );
      return this.errorMessageService.success(
        Currencyconversionrates,
        true,
        'Currencyconversionrates deleted successfully',
        {},
      );
    } catch (error: unknown) {
      throw this.errorMessageService.error(error as Error);
    }
  }
}
