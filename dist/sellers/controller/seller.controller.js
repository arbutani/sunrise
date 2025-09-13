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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const seller_service_1 = require("../service/seller.service");
const sellerRequest_dto_1 = require("../dto/sellerRequest.dto");
let SellerController = class SellerController {
    sellerService;
    errorMessageService;
    constructor(sellerService, errorMessageService) {
        this.sellerService = sellerService;
        this.errorMessageService = errorMessageService;
    }
    async createSeller(requestDto) {
        try {
            const data = await this.sellerService.createSeller(requestDto);
            return this.errorMessageService.success(data, true, 'Seller created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateSeller(id, requestDto) {
        try {
            const data = await this.sellerService.updateSeller(id, requestDto);
            return this.errorMessageService.success(data, true, 'Seller updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getSeller(id) {
        try {
            const data = await this.sellerService.getSeller(id);
            return this.errorMessageService.success(data, true, 'Seller retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllSellers() {
        try {
            return await this.sellerService.getAllSellers();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteSeller(id) {
        try {
            const data = await this.sellerService.deleteSeller(id);
            return this.errorMessageService.success(data, true, 'Seller deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sellerRequest_dto_1.SellerRequestDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "createSeller", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sellerRequest_dto_1.SellerRequestDto]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "updateSeller", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getSeller", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getAllSellers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "deleteSeller", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)('sellers'),
    __metadata("design:paramtypes", [seller_service_1.SellerService,
        errormessage_service_1.ErrorMessageService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map