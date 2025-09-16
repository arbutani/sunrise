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
exports.PurchasesController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const purchasesRequest_dto_1 = require("../dto/purchasesRequest.dto");
const purchases_service_1 = require("../service/purchases.service");
let PurchasesController = class PurchasesController {
    purchasesService;
    errorMessageService;
    constructor(purchasesService, errorMessageService) {
        this.purchasesService = purchasesService;
        this.errorMessageService = errorMessageService;
    }
    async createPurchases(requestDto) {
        try {
            const data = await this.purchasesService.createPurchases(requestDto);
            return this.errorMessageService.success(data, true, 'Purchases created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updatePurchases(id, requestDto) {
        try {
            const data = await this.purchasesService.updatePurchases(id, requestDto);
            return this.errorMessageService.success(data, true, 'Purchases updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getPurchases(id) {
        try {
            const data = await this.purchasesService.getPurchases(id);
            return this.errorMessageService.success(data, true, 'Purchases retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllPurchases() {
        try {
            return await this.purchasesService.getAllPurchases();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deletePurchases(id) {
        try {
            const data = await this.purchasesService.deletePurchases(id);
            return this.errorMessageService.success(data, true, 'Purchases deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.PurchasesController = PurchasesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchasesRequest_dto_1.PurchasesRequestDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "createPurchases", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchasesRequest_dto_1.PurchasesRequestDto]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "updatePurchases", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getPurchases", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "getAllPurchases", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchasesController.prototype, "deletePurchases", null);
exports.PurchasesController = PurchasesController = __decorate([
    (0, common_1.Controller)('purchases'),
    __metadata("design:paramtypes", [purchases_service_1.PurchasesService,
        errormessage_service_1.ErrorMessageService])
], PurchasesController);
//# sourceMappingURL=purchases.controller.js.map