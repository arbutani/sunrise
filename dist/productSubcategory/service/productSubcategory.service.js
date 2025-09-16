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
exports.ProductSubcategoryService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const productSubcategory_dto_1 = require("../dto/productSubcategory.dto");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let ProductSubcategoryService = class ProductSubcategoryService {
    productSubcategoryRepository;
    sequelize;
    errorMessageService;
    constructor(productSubcategoryRepository, sequelize, errorMessageService) {
        this.productSubcategoryRepository = productSubcategoryRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createProductSubcategory(requestDto) {
        try {
            const findProductSubcategory = await this.productSubcategoryRepository.findOne({
                where: {
                    name: requestDto.name,
                },
            });
            if (findProductSubcategory) {
                throw this.errorMessageService.GeneralErrorCore('ProductSubcategory with this name already exists', 200);
            }
            const lastProductSubcategory = await this.productSubcategoryRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastProductSubcategory && lastProductSubcategory.reference_number) {
                const match = lastProductSubcategory.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `PSC${nextSeriesNumber}-${dateString}`;
            const fields = {
                category_id: requestDto.category_id,
                name: requestDto.name,
                description: requestDto.description,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const productSubcategory = await this.productSubcategoryRepository.create(fields);
            if (productSubcategory) {
                return new productSubcategory_dto_1.ProductSubcategoryDto(productSubcategory);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create ProductSubcategory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateProductSubcategory(id, requestDto) {
        try {
            const oldProductSubcategory = await this.productSubcategoryRepository.findByPk(id);
            if (!oldProductSubcategory) {
                throw this.errorMessageService.GeneralErrorCore('ProductSubcategory not found', 404);
            }
            const findProductSubcategory = await this.productSubcategoryRepository.findOne({
                where: {
                    name: requestDto.name,
                    description: requestDto.description,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findProductSubcategory) {
                throw this.errorMessageService.GeneralErrorCore('ProductSubcategory with this name and discription already exists', 200);
            }
            const fields = {
                name: requestDto.name,
                description: requestDto.description,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const productSubcategory = await this.productSubcategoryRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (productSubcategory && productSubcategory.length > 1) {
                return new productSubcategory_dto_1.ProductSubcategoryDto(productSubcategory[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update productSubcategory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getProductSubcategory(id) {
        try {
            const productSubcategory = await this.productSubcategoryRepository.findByPk(id);
            if (!productSubcategory) {
                throw this.errorMessageService.GeneralErrorCore('ProductSubcategory not found', 404);
            }
            return new productSubcategory_dto_1.ProductSubcategoryDto(productSubcategory);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllproductSubcategory() {
        try {
            const productSubcategory = await this.productSubcategoryRepository.findAll();
            if (!productSubcategory || productSubcategory.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO ProductSubcategory found', 404);
            }
            return productSubcategory.map((productSubcategory) => new productSubcategory_dto_1.ProductSubcategoryDto(productSubcategory));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteProductSubcategory(id) {
        try {
            const productSubcategory = await this.productSubcategoryRepository.findByPk(id);
            if (!productSubcategory) {
                throw this.errorMessageService.GeneralErrorCore('ProductSubcategory not found', 404);
            }
            const deleted = await this.productSubcategoryRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'ProductSubcategory deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete ProductSubcategory', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.ProductSubcategoryService = ProductSubcategoryService;
exports.ProductSubcategoryService = ProductSubcategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_SUBCATEGORY_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], ProductSubcategoryService);
//# sourceMappingURL=productSubcategory.service.js.map