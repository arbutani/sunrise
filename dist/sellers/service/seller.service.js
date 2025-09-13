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
exports.SellerService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const seller_dto_1 = require("../dto/seller.dto");
let SellerService = class SellerService {
    sellerRepository;
    errorMessageService;
    constructor(sellerRepository, errorMessageService) {
        this.sellerRepository = sellerRepository;
        this.errorMessageService = errorMessageService;
    }
    async createSeller(requestDto) {
        try {
            const findSeller = await this.sellerRepository.findOne({
                where: {
                    name: requestDto.name,
                    email: requestDto.email,
                    mobile: requestDto.mobile,
                },
            });
            if (findSeller) {
                throw this.errorMessageService.GeneralErrorCore('Seller with this email or mobile already exists', 200);
            }
            const lastSeller = await this.sellerRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastSeller &&
                lastSeller.reference_number &&
                lastSeller.reference_number) {
                const match = lastSeller.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `SR${nextSeriesNumber}-${dateString}`;
            const fields = {
                name: requestDto.name,
                email: requestDto.email,
                address: requestDto.address,
                mobile: requestDto.mobile,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                type: requestDto.type,
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const seller = await this.sellerRepository.create(fields);
            if (seller) {
                return new seller_dto_1.SellerDto(seller);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Seller', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateSeller(id, requestDto) {
        try {
            const oldSeller = await this.sellerRepository.findByPk(id);
            if (!oldSeller) {
                throw this.errorMessageService.GeneralErrorCore('Seller not found', 404);
            }
            const findSeller = await this.sellerRepository.findOne({
                where: {
                    email: requestDto.email,
                    mobile: requestDto.mobile,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findSeller) {
                throw this.errorMessageService.GeneralErrorCore('Seller with this catagory already exists', 200);
            }
            const fields = {
                name: requestDto.name,
                email: requestDto.email,
                address: requestDto.address,
                mobile: requestDto.mobile,
                type: requestDto.type,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const seller = await this.sellerRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (seller && seller.length > 1) {
                return new seller_dto_1.SellerDto(seller[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update Seller', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getSeller(id) {
        try {
            const seller = await this.sellerRepository.findByPk(id);
            if (!seller) {
                throw this.errorMessageService.GeneralErrorCore('Seller not found', 404);
            }
            return new seller_dto_1.SellerDto(seller);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllSellers() {
        try {
            const sellers = await this.sellerRepository.findAll();
            if (!sellers || sellers.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Seller found', 404);
            }
            return sellers.map((seller) => new seller_dto_1.SellerDto(seller));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteSeller(id) {
        try {
            const seller = await this.sellerRepository.findByPk(id);
            if (!seller) {
                throw this.errorMessageService.GeneralErrorCore('Seller not found', 404);
            }
            const deleted = await this.sellerRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Seller deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Seller', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.SellerService = SellerService;
exports.SellerService = SellerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SELLER_REPOSITORY')),
    __metadata("design:paramtypes", [Object, errormessage_service_1.ErrorMessageService])
], SellerService);
//# sourceMappingURL=seller.service.js.map