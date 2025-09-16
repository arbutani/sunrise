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
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const sales_service_1 = require("../service/sales.service");
const salesRequest_dto_1 = require("../dto/salesRequest.dto");
let SalesController = class SalesController {
    salesService;
    errorMessageService;
    constructor(salesService, errorMessageService) {
        this.salesService = salesService;
        this.errorMessageService = errorMessageService;
    }
    async createSales(requestDto) {
        try {
            const data = await this.salesService.createSales(requestDto);
            return this.errorMessageService.success(data, true, 'Sales created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateSales(id, requestDto) {
        try {
            const data = await this.salesService.updateSales(id, requestDto);
            return this.errorMessageService.success(data, true, 'Sales updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getSales(id) {
        try {
            const data = await this.salesService.getsales(id);
            return this.errorMessageService.success(data, true, 'Sales retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllSales() {
        try {
            return await this.salesService.getAllsales();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteSales(id) {
        try {
            const data = await this.salesService.deletesales(id);
            return this.errorMessageService.success(data, true, 'Sales deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [salesRequest_dto_1.SalesRequestDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "createSales", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, salesRequest_dto_1.SalesRequestDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "updateSales", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getSales", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "getAllSales", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "deleteSales", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService,
        errormessage_service_1.ErrorMessageService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map