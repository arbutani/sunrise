/* eslint-disable prettier/prettier */
import { Currencyconversionrates } from '../entity/currencyConversionRates.entity';

export const CurrencyconversionratesProvider = [
  {
    provide: 'CURRENCY_CONVERSION_RATES_REPOSITORY',
    useValue: Currencyconversionrates,
  },
];
