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
exports.InventoryRequestDto = void 0;
const class_validator_1 = require("class-validator");
class InventoryRequestDto {
    product_id;
    available_qty;
    damaged_qty;
}
exports.InventoryRequestDto = InventoryRequestDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Product id must be a valid UUID' }),
    __metadata("design:type", String)
], InventoryRequestDto.prototype, "product_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Available qty is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Available qty must be a number' }),
    __metadata("design:type", Number)
], InventoryRequestDto.prototype, "available_qty", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Damaged qty is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Damaged qty must be a number' }),
    __metadata("design:type", Number)
], InventoryRequestDto.prototype, "damaged_qty", void 0);
//# sourceMappingURL=inventoryRequest.dto.js.map