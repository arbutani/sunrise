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
exports.ProductCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const productCategories_dto_1 = require("../dto/productCategories.dto");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let ProductCategoriesService = class ProductCategoriesService {
    productCategoriesRepository;
    sequelize;
    errorMessageService;
    constructor(productCategoriesRepository, sequelize, errorMessageService) {
        this.productCategoriesRepository = productCategoriesRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createProductCategories(requestDto) {
        try {
            const findProductCategories = await this.productCategoriesRepository.findOne({
                where: {
                    name: requestDto.name,
                },
            });
            if (findProductCategories) {
                throw this.errorMessageService.GeneralErrorCore('ProductCategories with this Name already exists', 200);
            }
            const lastProductCategories = await this.productCategoriesRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastProductCategories &&
                lastProductCategories.reference_number &&
                lastProductCategories.reference_number) {
                const match = lastProductCategories.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `PC${nextSeriesNumber}-${dateString}`;
            const fields = {
                name: requestDto.name,
                description: requestDto.description,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const productCategories = await this.productCategoriesRepository.create(fields);
            if (productCategories) {
                return new productCategories_dto_1.ProductCategoriesDto(productCategories);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create ProductCategories', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateProductCategories(id, requestDto) {
        try {
            const oldProductCategories = await this.productCategoriesRepository.findByPk(id);
            if (!oldProductCategories) {
                throw this.errorMessageService.GeneralErrorCore('ProductCategories not found', 404);
            }
            const findProductCategories = await this.productCategoriesRepository.findOne({
                where: {
                    name: requestDto.name,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findProductCategories) {
                throw this.errorMessageService.GeneralErrorCore('ProductCategories with this categories already exists', 200);
            }
            const fields = {
                name: requestDto.name,
                description: requestDto.description,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const productCategories = await this.productCategoriesRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (productCategories && productCategories.length > 1) {
                return new productCategories_dto_1.ProductCategoriesDto(productCategories[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update ProductCategories', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getProductCategories(id) {
        try {
            const productCategories = await this.productCategoriesRepository.findByPk(id);
            if (!productCategories) {
                throw this.errorMessageService.GeneralErrorCore('ProductCategories not found', 404);
            }
            return new productCategories_dto_1.ProductCategoriesDto(productCategories);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllProductCategories() {
        try {
            const productCategories = await this.productCategoriesRepository.findAll();
            if (!productCategories || productCategories.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO ProductCategories found', 404);
            }
            return productCategories.map((productCategories) => new productCategories_dto_1.ProductCategoriesDto(productCategories));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteProductCategories(id) {
        try {
            const productCategories = await this.productCategoriesRepository.findByPk(id);
            if (!productCategories) {
                throw this.errorMessageService.GeneralErrorCore('ProductCategories not found', 404);
            }
            const deleted = await this.productCategoriesRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'ProductCategories deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete ProductCategories', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.ProductCategoriesService = ProductCategoriesService;
exports.ProductCategoriesService = ProductCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_CATEGORIES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], ProductCategoriesService);
//# sourceMappingURL=productCategories.service.js.map