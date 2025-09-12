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
exports.CurrencyconversionratesService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const currencyConversionRates_dto_1 = require("../dto/currencyConversionRates.dto");
let CurrencyconversionratesService = class CurrencyconversionratesService {
    currencyconversionratsRepository;
    sequelize;
    errorMessageService;
    constructor(currencyconversionratsRepository, sequelize, errorMessageService) {
        this.currencyconversionratsRepository = currencyconversionratsRepository;
        this.sequelize = sequelize;
        this.errorMessageService = errorMessageService;
    }
    async createcurrencyconversionrate(requestDto) {
        try {
            const findCurrencyconversionrate = await this.currencyconversionratsRepository.findOne({
                where: {
                    country_name: requestDto.country_name,
                },
            });
            if (findCurrencyconversionrate) {
                throw this.errorMessageService.GeneralErrorCore('Currencyconversionrate with this country name already exists', 200);
            }
            const fields = {
                country_name: requestDto.country_name,
                currency_code: requestDto.currency_code,
                conversion_rate: requestDto.conversion_rate,
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const createcurrencyconversionrate = await this.currencyconversionratsRepository.create(fields);
            if (createcurrencyconversionrate) {
                return new currencyConversionRates_dto_1.CurrencyconversionratesDto(createcurrencyconversionrate);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Createcurrencyconversionrate', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateCurrencyconversionrates(id, requestDto) {
        try {
            const oldCurrencyconversionrates = await this.currencyconversionratsRepository.findByPk(id);
            if (!oldCurrencyconversionrates) {
                throw this.errorMessageService.GeneralErrorCore('Currency conversion rates not found', 404);
            }
            const findCurrencyconversionrates = await this.currencyconversionratsRepository.findOne({
                where: {
                    country_name: requestDto.country_name,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findCurrencyconversionrates) {
                throw this.errorMessageService.GeneralErrorCore('Currencyconversionrates with this country name already exists', 200);
            }
            const fields = {
                country_name: requestDto.country_name,
                currency_code: requestDto.currency_code,
                conversion_rate: requestDto.conversion_rate,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const Currencyconversionrates = await this.currencyconversionratsRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (Currencyconversionrates && Currencyconversionrates.length > 1) {
                return new currencyConversionRates_dto_1.CurrencyconversionratesDto(Currencyconversionrates[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Currencyconversionrates', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getCurrencyconversionrates(id) {
        try {
            const Currencyconversionrates = await this.currencyconversionratsRepository.findByPk(id);
            if (!Currencyconversionrates) {
                throw this.errorMessageService.GeneralErrorCore('Currencyconversionrates not found', 404);
            }
            return new currencyConversionRates_dto_1.CurrencyconversionratesDto(Currencyconversionrates);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllCurrencyconversionrates() {
        try {
            const Currencyconversionrates = await this.currencyconversionratsRepository.findAll();
            if (!Currencyconversionrates || Currencyconversionrates.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Currencyconversionrates found', 404);
            }
            return Currencyconversionrates.map((Currencyconversionrates) => new currencyConversionRates_dto_1.CurrencyconversionratesDto(Currencyconversionrates));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteCurrencyconversionratese(id) {
        try {
            const Currencyconversionrates = await this.currencyconversionratsRepository.findByPk(id);
            if (!Currencyconversionrates) {
                throw this.errorMessageService.GeneralErrorCore('Currencyconversionrates not found', 404);
            }
            const deleted = await this.currencyconversionratsRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Currencyconversionrates deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Currencyconversionrates', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.CurrencyconversionratesService = CurrencyconversionratesService;
exports.CurrencyconversionratesService = CurrencyconversionratesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CURRENCY_CONVERSION_RATES_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SEQUELIZE')),
    __metadata("design:paramtypes", [Object, sequelize_typescript_1.Sequelize,
        errormessage_service_1.ErrorMessageService])
], CurrencyconversionratesService);
//# sourceMappingURL=currencyConversionRates.service.js.map