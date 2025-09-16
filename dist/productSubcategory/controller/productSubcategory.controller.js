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
exports.ProductSubcategoryController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const productSubcategoryRequest_dto_1 = require("../dto/productSubcategoryRequest.dto");
const productSubcategory_service_1 = require("../service/productSubcategory.service");
let ProductSubcategoryController = class ProductSubcategoryController {
    productSubcategoryService;
    errorMessageService;
    constructor(productSubcategoryService, errorMessageService) {
        this.productSubcategoryService = productSubcategoryService;
        this.errorMessageService = errorMessageService;
    }
    async createProductSubcategory(requestDto) {
        try {
            const data = await this.productSubcategoryService.createProductSubcategory(requestDto);
            return this.errorMessageService.success(data, true, 'ProductSubcategory created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateProductSubcategory(id, requestDto) {
        try {
            const data = await this.productSubcategoryService.updateProductSubcategory(id, requestDto);
            return this.errorMessageService.success(data, true, 'ProductSubcategory updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getProductSubcategory(id) {
        try {
            const data = await this.productSubcategoryService.getProductSubcategory(id);
            return this.errorMessageService.success(data, true, 'ProductSubcategory retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllproductSubcategory() {
        try {
            return await this.productSubcategoryService.getAllproductSubcategory();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteProductSubcategory(id) {
        try {
            const data = await this.productSubcategoryService.deleteProductSubcategory(id);
            return this.errorMessageService.success(data, true, 'ProductSubcategory deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.ProductSubcategoryController = ProductSubcategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productSubcategoryRequest_dto_1.ProductSubcategoryRequestDto]),
    __metadata("design:returntype", Promise)
], ProductSubcategoryController.prototype, "createProductSubcategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, productSubcategoryRequest_dto_1.ProductSubcategoryRequestDto]),
    __metadata("design:returntype", Promise)
], ProductSubcategoryController.prototype, "updateProductSubcategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductSubcategoryController.prototype, "getProductSubcategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductSubcategoryController.prototype, "getAllproductSubcategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductSubcategoryController.prototype, "deleteProductSubcategory", null);
exports.ProductSubcategoryController = ProductSubcategoryController = __decorate([
    (0, common_1.Controller)('product-sub-category'),
    __metadata("design:paramtypes", [productSubcategory_service_1.ProductSubcategoryService,
        errormessage_service_1.ErrorMessageService])
], ProductSubcategoryController);
//# sourceMappingURL=productSubcategory.controller.js.map