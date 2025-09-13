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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerRequestDto = void 0;
const class_validator_1 = require("class-validator");
const sellerType_1 = require("../../enum/seller/sellerType");
class SellerRequestDto {
    name;
    email;
    address;
    mobile;
    type;
}
exports.SellerRequestDto = SellerRequestDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    __metadata("design:type", String)
], SellerRequestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    __metadata("design:type", String)
], SellerRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Address is required' }),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    __metadata("design:type", String)
], SellerRequestDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mobile is required' }),
    (0, class_validator_1.IsString)({ message: 'Mobile must be a string' }),
    __metadata("design:type", String)
], SellerRequestDto.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Seller type is required' }),
    (0, class_validator_1.IsEnum)(sellerType_1.SellerType, {
        message: 'Employee type must be one of the allowed values',
    }),
    __metadata("design:type", String)
], SellerRequestDto.prototype, "type", void 0);
//# sourceMappingURL=sellerRequest.dto.js.map