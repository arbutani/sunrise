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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const sales_dto_1 = require("../dto/sales.dto");
let SalesService = class SalesService {
    salesRepository;
    sequelize;
    errorMessageService;
    constructor(salesRepository, sequelize, errorMessageService) {
        this.salesRepository = salesRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createSales(requestDto) {
        try {
            const lastSales = await this.salesRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastSales && lastSales.reference_number) {
                const match = lastSales.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `SA${nextSeriesNumber}-${dateString}`;
            const fields = {
                product_id: requestDto.product_id,
                seller_id: requestDto.seller_id,
                currency_id: requestDto.currency_id,
                quantity: requestDto.quantity,
                unit_price_original: requestDto.unit_price_original,
                shipping_cost_original: requestDto.shipping_cost_original,
                currency_code: requestDto.currency_code,
                sale_date: requestDto.sale_date,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.salesRepository.create(fields);
            if (item) {
                return new sales_dto_1.SalesDto(item);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Sales', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateSales(id, requestDto) {
        try {
            const oldItem = await this.salesRepository.findByPk(id);
            if (!oldItem) {
                throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
            }
            const findItem = await this.salesRepository.findOne({
                where: {
                    product_id: requestDto.product_id,
                    seller_id: requestDto.seller_id,
                    currency_id: requestDto.currency_id,
                    quantity: requestDto.quantity,
                    unit_price_original: requestDto.unit_price_original,
                    shipping_cost_original: requestDto.shipping_cost_original,
                    sale_date: requestDto.sale_date,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('sales with this catagory already exists', 200);
            }
            const fields = {
                quantity: requestDto.quantity,
                unit_price_original: requestDto.unit_price_original,
                shipping_cost_original: requestDto.shipping_cost_original,
                sale_date: requestDto.sale_date,
                currency_code: requestDto.currency_code,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.salesRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (item && item.length > 1) {
                return new sales_dto_1.SalesDto(item[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Sales', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getsales(id) {
        try {
            const item = await this.salesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
            }
            return new sales_dto_1.SalesDto(item);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllsales() {
        try {
            const items = await this.salesRepository.findAll();
            if (!items || items.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Sales found', 404);
            }
            return items.map((item) => new sales_dto_1.SalesDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deletesales(id) {
        try {
            const item = await this.salesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
            }
            const deleted = await this.salesRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Sales deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Sales', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SALES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], SalesService);
//# sourceMappingURL=sales.service.js.map