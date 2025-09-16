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
exports.ProductCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const productCategoriesRequest_dto_1 = require("../dto/productCategoriesRequest.dto");
const productCategories_service_1 = require("../service/productCategories.service");
let ProductCategoriesController = class ProductCategoriesController {
    productCategoriesService;
    errorMessageService;
    constructor(productCategoriesService, errorMessageService) {
        this.productCategoriesService = productCategoriesService;
        this.errorMessageService = errorMessageService;
    }
    async createProductCategories(requestDto) {
        try {
            const data = await this.productCategoriesService.createProductCategories(requestDto);
            return this.errorMessageService.success(data, true, 'ProductCategories created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateProductCategories(id, requestDto) {
        try {
            const data = await this.productCategoriesService.updateProductCategories(id, requestDto);
            return this.errorMessageService.success(data, true, 'ProductCategories updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getProductCategories(id) {
        try {
            const data = await this.productCategoriesService.getProductCategories(id);
            return this.errorMessageService.success(data, true, 'ProductCategories retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllProductCategories() {
        try {
            return await this.productCategoriesService.getAllProductCategories();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteProductCategories(id) {
        try {
            const data = await this.productCategoriesService.deleteProductCategories(id);
            return this.errorMessageService.success(data, true, 'ProductCategories deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.ProductCategoriesController = ProductCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productCategoriesRequest_dto_1.ProductCategoriesRequestDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "createProductCategories", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, productCategoriesRequest_dto_1.ProductCategoriesRequestDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "updateProductCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "getProductCategories", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "getAllProductCategories", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "deleteProductCategories", null);
exports.ProductCategoriesController = ProductCategoriesController = __decorate([
    (0, common_1.Controller)('productCategories'),
    __metadata("design:paramtypes", [productCategories_service_1.ProductCategoriesService,
        errormessage_service_1.ErrorMessageService])
], ProductCategoriesController);
//# sourceMappingURL=productCategories.controller.js.map