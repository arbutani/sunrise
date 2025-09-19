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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const inventory_dto_1 = require("../dto/inventory.dto");
let InventoryService = class InventoryService {
    inventoryRepository;
    sequelize;
    errorMessageService;
    constructor(inventoryRepository, sequelize, errorMessageService) {
        this.inventoryRepository = inventoryRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createInventory(requestDto) {
        try {
            const findItem = await this.inventoryRepository.findOne({
                where: {
                    product_id: requestDto.product_id,
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('Inventory with this email already exists', 200);
            }
            const lastInventory = await this.inventoryRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastInventory && lastInventory.reference_number) {
                const match = lastInventory.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `IV${nextSeriesNumber}-${dateString}`;
            const fields = {
                product_id: requestDto.product_id,
                available_qty: requestDto.available_qty,
                damaged_qty: requestDto.damaged_qty,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.inventoryRepository.create(fields);
            if (item) {
                return new inventory_dto_1.InventoryDto(item);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Inventory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateInventory(id, requestDto) {
        try {
            const oldItem = await this.inventoryRepository.findByPk(id);
            if (!oldItem) {
                throw this.errorMessageService.GeneralErrorCore('Inventory not found', 404);
            }
            const findItem = await this.inventoryRepository.findOne({
                where: {
                    available_qty: requestDto.available_qty,
                    damaged_qty: requestDto.damaged_qty,
                    product_id: requestDto.product_id,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('Inventory with this catagory already exists', 200);
            }
            const fields = {
                available_qty: requestDto.available_qty,
                damaged_qty: requestDto.damaged_qty,
                product_id: requestDto.product_id,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.inventoryRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (item && item.length > 1) {
                return new inventory_dto_1.InventoryDto(item[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Inventory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getInventory(id) {
        try {
            const item = await this.inventoryRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Inventory not found', 404);
            }
            return new inventory_dto_1.InventoryDto(item);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllInventory() {
        try {
            const items = await this.inventoryRepository.findAll();
            if (!items || items.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Inventory found', 404);
            }
            return items.map((item) => new inventory_dto_1.InventoryDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteInventory(id) {
        try {
            const item = await this.inventoryRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Inventory not found', 404);
            }
            const deleted = await this.inventoryRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Inventory deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Inventory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('INVENTORY_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map