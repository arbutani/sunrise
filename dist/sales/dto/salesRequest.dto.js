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
exports.SalesRequestDto = void 0;
const class_validator_1 = require("class-validator");
class SalesRequestDto {
    product_id;
    seller_id;
    currency_id;
    quantity;
    unit_price_original;
    shipping_cost_original;
    currency_code;
    sale_date;
}
exports.SalesRequestDto = SalesRequestDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Product ID must be a valid UUID' }),
    __metadata("design:type", String)
], SalesRequestDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Vendor ID must be a valid UUID' }),
    __metadata("design:type", String)
], SalesRequestDto.prototype, "seller_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Currency ID must be a valid UUID' }),
    __metadata("design:type", String)
], SalesRequestDto.prototype, "currency_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantity must be a number' }),
    __metadata("design:type", Number)
], SalesRequestDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Unit price original is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Unit price original must be a number' }),
    __metadata("design:type", Number)
], SalesRequestDto.prototype, "unit_price_original", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Shipping cost original is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Shipping cost original must be a number' }),
    __metadata("design:type", Number)
], SalesRequestDto.prototype, "shipping_cost_original", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Currency code is required' }),
    (0, class_validator_1.IsString)({ message: 'Currency code must be a string' }),
    __metadata("design:type", String)
], SalesRequestDto.prototype, "currency_code", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Sale date is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Sale date must be a valid ISO date string' }),
    __metadata("design:type", String)
], SalesRequestDto.prototype, "sale_date", void 0);
//# sourceMappingURL=salesRequest.dto.js.map