"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyconversionratesController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const currencyConversionRates_service_1 = require("../service/currencyConversionRates.service");
const currencyConversionRatesRequest_dto_1 = require("../dto/currencyConversionRatesRequest.dto");
let CurrencyconversionratesController = class CurrencyconversionratesController {
    currencyconversionratessarvice;
    errorMessageService;
    constructor(currencyconversionratessarvice, errorMessageService) {
        this.currencyconversionratessarvice = currencyconversionratessarvice;
        this.errorMessageService = errorMessageService;
    }
    async Currencyconversionrates(requestDto) {
        try {
            const currencyconversionrate = await this.currencyconversionratessarvice.createcurrencyconversionrate(requestDto);
            return this.errorMessageService.success(currencyconversionrate, true, 'Currencyconversionrates created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateCurrencyconversionrates(id, requestDto) {
        try {
            const Currencyconversionrates = await this.currencyconversionratessarvice.updateCurrencyconversionrates(id, requestDto);
            return this.errorMessageService.success(Currencyconversionrates, true, 'Currencyconversionrates updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getCurrencyconversionrates(id) {
        try {
            const Currencyconversionrates = await this.currencyconversionratessarvice.getCurrencyconversionrates(id);
            return this.errorMessageService.success(Currencyconversionrates, true, 'Currencyconversionrates retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllCurrencyconversionrates() {
        try {
            return await this.currencyconversionratessarvice.getAllCurrencyconversionrates();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteCurrencyconversionrates(id) {
        try {
            const Currencyconversionrates = await this.currencyconversionratessarvice.deleteCurrencyconversionratese(id);
            return this.errorMessageService.success(Currencyconversionrates, true, 'Currencyconversionrates deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.CurrencyconversionratesController = CurrencyconversionratesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [currencyConversionRatesRequest_dto_1.CurrencyconversionratesRequestDto]),
    __metadata("design:returntype", Promise)
], CurrencyconversionratesController.prototype, "Currencyconversionrates", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, currencyConversionRatesRequest_dto_1.CurrencyconversionratesRequestDto]),
    __metadata("design:returntype", Promise)
], CurrencyconversionratesController.prototype, "updateCurrencyconversionrates", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyconversionratesController.prototype, "getCurrencyconversionrates", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CurrencyconversionratesController.prototype, "getAllCurrencyconversionrates", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CurrencyconversionratesController.prototype, "deleteCurrencyconversionrates", null);
exports.CurrencyconversionratesController = CurrencyconversionratesController = __decorate([
    (0, common_1.Controller)('currency-conversion-rates'),
    __metadata("design:paramtypes", [currencyConversionRates_service_1.CurrencyconversionratesService,
        errormessage_service_1.ErrorMessageService])
], CurrencyconversionratesController);
//# sourceMappingURL=currencyConversionRates.controller.js.map