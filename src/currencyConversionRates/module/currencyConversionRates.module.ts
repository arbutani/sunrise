/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CurrencyconversionratesController } from '../controller/currencyConversionRates.controller';
import { CurrencyconversionratesProvider } from '../provider/currencyConversionRates.provider';
import { CurrencyconversionratesService } from '../service/currencyConversionRates.service';

@Module({
  imports: [],
  controllers: [CurrencyconversionratesController],
  providers: [
    ...CurrencyconversionratesProvider,
    CurrencyconversionratesService,
  ],
  exports: [],
})
export class CurrencyconversionratesModule {}


