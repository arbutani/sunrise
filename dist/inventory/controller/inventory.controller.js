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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const inventoryRequest_dto_1 = require("../dto/inventoryRequest.dto");
const inventory_service_1 = require("../service/inventory.service");
let InventoryController = class InventoryController {
    inventoryService;
    errorMessageService;
    constructor(inventoryService, errorMessageService) {
        this.inventoryService = inventoryService;
        this.errorMessageService = errorMessageService;
    }
    async createInventory(requestDto) {
        try {
            const data = await this.inventoryService.createInventory(requestDto);
            return this.errorMessageService.success(data, true, 'Inventory created successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async updateInventory(id, requestDto) {
        try {
            const data = await this.inventoryService.updateInventory(id, requestDto);
            return this.errorMessageService.success(data, true, 'Inventory updated successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getInventory(id) {
        try {
            const data = await this.inventoryService.getInventory(id);
            return this.errorMessageService.success(data, true, 'Inventory retrieved successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async getAllInventory() {
        try {
            return await this.inventoryService.getAllInventory();
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
    async deleteInventory(id) {
        try {
            const data = await this.inventoryService.deleteInventory(id);
            return this.errorMessageService.success(data, true, 'Inventory deleted successfully', {});
        }
        catch (error) {
            throw this.errorMessageService.error(error);
        }
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventoryRequest_dto_1.InventoryRequestDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createInventory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventoryRequest_dto_1.InventoryRequestDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateInventory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getAllInventory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "deleteInventory", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService,
        errormessage_service_1.ErrorMessageService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map