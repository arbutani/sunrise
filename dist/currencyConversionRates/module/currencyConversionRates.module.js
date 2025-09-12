"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyconversionratesModule = void 0;
const common_1 = require("@nestjs/common");
const currencyConversionRates_controller_1 = require("../controller/currencyConversionRates.controller");
const currencyConversionRates_provider_1 = require("../provider/currencyConversionRates.provider");
const currencyConversionRates_service_1 = require("../service/currencyConversionRates.service");
let CurrencyconversionratesModule = class CurrencyconversionratesModule {
};
exports.CurrencyconversionratesModule = CurrencyconversionratesModule;
exports.CurrencyconversionratesModule = CurrencyconversionratesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [currencyConversionRates_controller_1.CurrencyconversionratesController],
        providers: [
            ...currencyConversionRates_provider_1.CurrencyconversionratesProvider,
            currencyConversionRates_service_1.CurrencyconversionratesService,
        ],
        exports: [],
    })
], CurrencyconversionratesModule);
//# sourceMappingURL=currencyConversionRates.module.js.map