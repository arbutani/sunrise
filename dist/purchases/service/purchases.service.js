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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const purchases_dto_1 = require("../dto/purchases.dto");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let PurchasesService = class PurchasesService {
    purchasesRepository;
    sequelize;
    errorMessageService;
    constructor(purchasesRepository, sequelize, errorMessageService) {
        this.purchasesRepository = purchasesRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createPurchases(requestDto) {
        try {
            const lastPurchases = await this.purchasesRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastPurchases && lastPurchases.reference_number) {
                const match = lastPurchases.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `PUR${nextSeriesNumber}-${dateString}`;
            const fields = {
                product_id: requestDto.product_id,
                vendor_id: requestDto.vendor_id,
                currency_id: requestDto.currency_id,
                quantity: requestDto.quantity,
                unit_price_original: requestDto.unit_price_original,
                currency_code: requestDto.currency_code,
                purchase_date: requestDto.purchase_date,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.purchasesRepository.create(fields);
            if (item) {
                return new purchases_dto_1.PurchasesDto(item);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Purchases', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updatePurchases(id, requestDto) {
        try {
            const oldItem = await this.purchasesRepository.findByPk(id);
            if (!oldItem) {
                throw this.errorMessageService.GeneralErrorCore('Purchases not found', 404);
            }
            const findItem = await this.purchasesRepository.findOne({
                where: {
                    product_id: requestDto.product_id,
                    vendor_id: requestDto.vendor_id,
                    currency_id: requestDto.currency_id,
                    quantity: requestDto.quantity,
                    unit_price_original: requestDto.unit_price_original,
                    purchase_date: requestDto.purchase_date,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findItem) {
                throw this.errorMessageService.GeneralErrorCore('Purchases with this catagory already exists', 200);
            }
            const fields = {
                quantity: requestDto.quantity,
                unit_price_original: requestDto.unit_price_original,
                purchase_date: requestDto.purchase_date,
                currency_code: requestDto.currency_code,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const item = await this.purchasesRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (item && item.length > 1) {
                return new purchases_dto_1.PurchasesDto(item[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Purchases', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getPurchases(id) {
        try {
            const item = await this.purchasesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Purchases not found', 404);
            }
            return new purchases_dto_1.PurchasesDto(item);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllPurchases() {
        try {
            const items = await this.purchasesRepository.findAll();
            if (!items || items.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Purchases found', 404);
            }
            return items.map((item) => new purchases_dto_1.PurchasesDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deletePurchases(id) {
        try {
            const item = await this.purchasesRepository.findByPk(id);
            if (!item) {
                throw this.errorMessageService.GeneralErrorCore('Purchases not found', 404);
            }
            const deleted = await this.purchasesRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Purchases deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Purchases', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PURCHASES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map