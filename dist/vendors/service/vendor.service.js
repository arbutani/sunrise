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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const errormessage_service_1 = require("../../shared/services/errormessage.service");
const moment_1 = __importDefault(require("moment"));
const vendor_dto_1 = require("../dto/vendor.dto");
const sequelize_1 = require("sequelize");
let VendorService = class VendorService {
    vendorRepository;
    errorMessageService;
    constructor(vendorRepository, errorMessageService) {
        this.vendorRepository = vendorRepository;
        this.errorMessageService = errorMessageService;
    }
    async createVendor(requestDto) {
        try {
            const findVendor = await this.vendorRepository.findOne({
                where: {
                    name: requestDto.name,
                    contact_info: requestDto.contact_info,
                },
            });
            if (findVendor) {
                throw this.errorMessageService.GeneralErrorCore('Vendor already exists', 200);
            }
            const lastVendors = await this.vendorRepository.findOne({
                order: [['createdAt', 'DESC']],
            });
            let nextSeriesNumber = 1;
            if (lastVendors && lastVendors.reference_number) {
                const match = lastVendors.reference_number.match(/\d+/);
                if (match) {
                    const lastSeriesNumber = parseInt(match[0], 10);
                    if (!isNaN(lastSeriesNumber)) {
                        nextSeriesNumber = lastSeriesNumber + 1;
                    }
                }
            }
            const dateString = (0, moment_1.default)().format('DDMMYY');
            const newReferenceNumber = `V${nextSeriesNumber}-${dateString}`;
            const fields = {
                name: requestDto.name,
                contact_info: requestDto.contact_info,
                address: requestDto.address,
                country: requestDto.country,
                reference_number: newReferenceNumber,
                reference_number_date: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                createdAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const vendor = await this.vendorRepository.create(fields);
            if (vendor) {
                return new vendor_dto_1.VendorDto(vendor);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to create Vendors', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async updateVendor(id, requestDto) {
        try {
            const oldVendor = await this.vendorRepository.findByPk(id);
            if (!oldVendor) {
                throw this.errorMessageService.GeneralErrorCore('Vendor not found', 404);
            }
            const findVendor = await this.vendorRepository.findOne({
                where: {
                    name: requestDto.name,
                    contact_info: requestDto.contact_info,
                    id: { [sequelize_1.Op.ne]: id },
                },
            });
            if (findVendor) {
                throw this.errorMessageService.GeneralErrorCore('Vendor already exists', 200);
            }
            const fields = {
                name: requestDto.name,
                contact_info: requestDto.contact_info,
                address: requestDto.address,
                country: requestDto.country,
                updatedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            };
            const vendor = await this.vendorRepository.update(fields, {
                where: { id },
                returning: true,
            });
            if (vendor && vendor.length > 1) {
                return new vendor_dto_1.VendorDto(vendor[1][0]);
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to update vendor', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getVendor(id) {
        try {
            const vendor = await this.vendorRepository.findByPk(id);
            if (!vendor) {
                throw this.errorMessageService.GeneralErrorCore('Vendor not found', 404);
            }
            return new vendor_dto_1.VendorDto(vendor);
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async getAllVendors() {
        try {
            const vendors = await this.vendorRepository.findAll();
            if (!vendors || vendors.length === 0) {
                throw this.errorMessageService.GeneralErrorCore('NO Vendors found', 404);
            }
            return vendors.map((item) => new vendor_dto_1.VendorDto(item));
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
    async deleteVendor(id) {
        try {
            const vendor = await this.vendorRepository.findByPk(id);
            if (!vendor) {
                throw this.errorMessageService.GeneralErrorCore('Vendor not found', 404);
            }
            const deleted = await this.vendorRepository.destroy({
                where: { id: id },
            });
            if (deleted) {
                return { message: 'Vendor deleted successfully' };
            }
            else {
                throw this.errorMessageService.GeneralErrorCore('Failed to delete Vendor', 200);
            }
        }
        catch (error) {
            throw this.errorMessageService.CatchHandler(error);
        }
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('VENDOR_REPOSITORY')),
    __metadata("design:paramtypes", [Object, errormessage_service_1.ErrorMessageService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map