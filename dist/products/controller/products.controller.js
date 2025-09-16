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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const productsRequest_dto_1 = require("../dto/productsRequest.dto");
const products_service_1 = require("../service/products.service");
let ProductsController = class ProductsController {
    productsService;
    errorMessageService;
    constructor(productsService, errorMessageService) {
        this.productsService = productsService;
        this.errorMessageService = errorMessageService;
    }
    async createProducts(requestDto) {
        try {
            const data = await this.productsService.createProducts(requestDto);
            return this.errorMessageService.success(data, true, 'Products created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateProducts(id, requestDto) {
        try {
            const data = await this.productsService.updateProducts(id, requestDto);
            return this.errorMessageService.success(data, true, 'Products updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getProducts(id) {
        try {
            const data = await this.productsService.getProducts(id);
            return this.errorMessageService.success(data, true, 'Products retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllProducts() {
        try {
            return await this.productsService.getAllProducts();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteProducts(id) {
        try {
            const data = await this.productsService.deleteProducts(id);
            return this.errorMessageService.success(data, true, 'Products deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [productsRequest_dto_1.ProductsRequestDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProducts", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, productsRequest_dto_1.ProductsRequestDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        errormessage_service_1.ErrorMessageService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map