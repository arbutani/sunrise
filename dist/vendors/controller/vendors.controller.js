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
exports.VendorController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const vendorRequest_dto_1 = require("../dto/vendorRequest.dto");
const vendor_service_1 = require("../service/vendor.service");
let VendorController = class VendorController {
    vendorService;
    errorMessageService;
    constructor(vendorService, errorMessageService) {
        this.vendorService = vendorService;
        this.errorMessageService = errorMessageService;
    }
    async createVendor(requestDto) {
        try {
            const data = await this.vendorService.createVendor(requestDto);
            return this.errorMessageService.success(data, true, 'Vendor created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateVendor(id, requestDto) {
        try {
            const data = await this.vendorService.updateVendor(id, requestDto);
            return this.errorMessageService.success(data, true, 'Vendor updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getVendor(id) {
        try {
            const data = await this.vendorService.getVendor(id);
            return this.errorMessageService.success(data, true, 'Vendor retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllVendors() {
        try {
            return await this.vendorService.getAllVendors();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteVendor(id) {
        try {
            const data = await this.vendorService.deleteVendor(id);
            return this.errorMessageService.success(data, true, 'Vendor deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.VendorController = VendorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendorRequest_dto_1.VendorRequestDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "createVendor", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, vendorRequest_dto_1.VendorRequestDto]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "updateVendor", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getVendor", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "getAllVendors", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VendorController.prototype, "deleteVendor", null);
exports.VendorController = VendorController = __decorate([
    (0, common_1.Controller)('vendors'),
    __metadata("design:paramtypes", [vendor_service_1.VendorService,
        errormessage_service_1.ErrorMessageService])
], VendorController);
//# sourceMappingURL=vendors.controller.js.map