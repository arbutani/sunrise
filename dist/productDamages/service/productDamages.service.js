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
exports.ProductDamagesService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const productdamages_dto_1 = require("../dto/productdamages.dto");
let ProductDamagesService = class ProductDamagesService {
    productDamagesRepository;
    sequelize;
    errorMessageService;
    constructor(productDamagesRepository, sequelize, errorMessageService) {
        this.productDamagesRepository = productDamagesRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createProductDamages(requestDto) {
        try {
            const lastProductDamages = await this.productDamagesRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastProductDamages && lastProductDamages.reference_number) {
                const match = lastProductDamages.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `PD${nextSeriesNumber}-${dateString}`;
            const fields = {
                product_id: requestDto.product_id,
                damage_type: requestDto.damage_type,
                quantity: requestDto.quantity,
                remarks: requestDto.remarks,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.productDamagesRepository.create(fields);
            if (item) {
                return new productdamages_dto_1.ProductDamagesDto(item);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create ProductDamages', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateProductDamages(id, requestDto) {
        try {
            const oldItem = await this.productDamagesRepository.findByPk(id);
            if (!oldItem) {
                throw this.errorMessageService.GeneralErrorCore('ProductDamages not found', 404);
            }
            const findItem = await this.productDamagesRepository.findOne({
                where: {
                    quantity: requestDto.quantity,
                    damage_type: requestDto.damage_type,
                    remarks: requestDto.remarks,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('ProductDamages with this catagory already exists', 200);
            }
            const fields = {
                quantity: requestDto.quantity,
                damage_type: requestDto.damage_type,
                remarks: requestDto.remarks,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.productDamagesRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (item && item.length > 1) {
                return new productdamages_dto_1.ProductDamagesDto(item[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update ProductDamages', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getProductDamages(id) {
        try {
            const item = await this.productDamagesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('ProductDamages not found', 404);
            }
            return new productdamages_dto_1.ProductDamagesDto(item);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllProductDamages() {
        try {
            const items = await this.productDamagesRepository.findAll();
            if (!items || items.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO ProductDamages found', 404);
            }
            return items.map((item) => new productdamages_dto_1.ProductDamagesDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteProductDamages(id) {
        try {
            const item = await this.productDamagesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('ProductDamages not found', 404);
            }
            const deleted = await this.productDamagesRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'productDamages deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete item', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.ProductDamagesService = ProductDamagesService;
exports.ProductDamagesService = ProductDamagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_DAMAGES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], ProductDamagesService);
//# sourceMappingURL=productDamages.service.js.map