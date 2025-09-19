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
exports.ProductDamagesController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const productDamages_service_1 = require("../service/productDamages.service");
const productDamagesRequest_dto_1 = require("../dto/productDamagesRequest.dto");
let ProductDamagesController = class ProductDamagesController {
    productDamagesService;
    errorMessageService;
    constructor(productDamagesService, errorMessageService) {
        this.productDamagesService = productDamagesService;
        this.errorMessageService = errorMessageService;
    }
    async createProductDamages(requestDto) {
        try {
            const data = await this.productDamagesService.createProductDamages(requestDto);
            return this.errorMessageService.success(data, true, 'ProductDamages created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateProductDamages(id, requestDto) {
        try {
            const data = await this.productDamagesService.updateProductDamages(id, requestDto);
            return this.errorMessageService.success(data, true, 'ProductDamages updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getProductDamages(id) {
        try {
            const data = await this.productDamagesService.getProductDamages(id);
            return this.errorMessageService.success(data, true, 'ProductDamages retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllproductDamages() {
        try {
            return await this.productDamagesService.getAllProductDamages();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteProductDamages(id) {
        try {
            const data = await this.productDamagesService.deleteProductDamages(id);
            return this.errorMessageService.success(data, true, 'ProductDamages deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.ProductDamagesController = ProductDamagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productDamagesRequest_dto_1.ProductDamagesRequestDto]),
    __metadata("design:returntype", Promise)
], ProductDamagesController.prototype, "createProductDamages", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, productDamagesRequest_dto_1.ProductDamagesRequestDto]),
    __metadata("design:returntype", Promise)
], ProductDamagesController.prototype, "updateProductDamages", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDamagesController.prototype, "getProductDamages", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductDamagesController.prototype, "getAllproductDamages", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductDamagesController.prototype, "deleteProductDamages", null);
exports.ProductDamagesController = ProductDamagesController = __decorate([
    (0, common_1.Controller)('productdamages'),
    __metadata("design:paramtypes", [productDamages_service_1.ProductDamagesService,
        errormessage_service_1.ErrorMessageService])
], ProductDamagesController);
//# sourceMappingURL=productDamages.controller.js.map