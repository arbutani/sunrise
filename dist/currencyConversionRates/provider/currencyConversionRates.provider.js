"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyconversionratesProvider = void 0;
const currencyConversionRates_entity_1 = require("../entity/currencyConversionRates.entity");
exports.CurrencyconversionratesProvider = [
    {
        provide: 'CURRENCY_CONVERSION_RATES_REPOSITORY',
        useValue: currencyConversionRates_entity_1.Currencyconversionrates,
    },
];
//# sourceMappingURL=currencyConversionRates.provider.js.map