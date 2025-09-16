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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const products_dto_1 = require("../dto/products.dto");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let ProductsService = class ProductsService {
    productsRepository;
    sequelize;
    errorMessageService;
    constructor(productsRepository, sequelize, errorMessageService) {
        this.productsRepository = productsRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createProducts(requestDto) {
        try {
            const findItem = await this.productsRepository.findOne({
                where: {
                    name: requestDto.name,
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('Products with this name already exists', 200);
            }
            const lastProducts = await this.productsRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastProducts && lastProducts.reference_number) {
                const match = lastProducts.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `PR${nextSeriesNumber}-${dateString}`;
            const fields = {
                subcategory_id: requestDto.subcategory_id,
                name: requestDto.name,
                description: requestDto.description,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.productsRepository.create(fields);
            if (item) {
                return new products_dto_1.ProductsDto(item);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Products', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateProducts(id, requestDto) {
        try {
            const oldItem = await this.productsRepository.findByPk(id);
            if (!oldItem) {
                throw this.errorMessageService.GeneralErrorCore('Products not found', 404);
            }
            const findItem = await this.productsRepository.findOne({
                where: {
                    name: requestDto.name,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('Products with this name already exists', 200);
            }
            const fields = {
                name: requestDto.name,
                description: requestDto.description,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.productsRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (item && item.length > 1) {
                return new products_dto_1.ProductsDto(item[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Products', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getProducts(id) {
        try {
            const item = await this.productsRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Products not found', 404);
            }
            return new products_dto_1.ProductsDto(item);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllProducts() {
        try {
            const items = await this.productsRepository.findAll();
            if (!items || items.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Products found', 404);
            }
            return items.map((item) => new products_dto_1.ProductsDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteProducts(id) {
        try {
            const item = await this.productsRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Products not found', 404);
            }
            const deleted = await this.productsRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Products deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Products', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCTS_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], ProductsService);
//# sourceMappingURL=products.service.js.map