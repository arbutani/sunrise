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
exports.Purchases = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const currencyConversionRates_entity_1 = require("../../currencyConversionRates/entity/currencyConversionRates.entity");
const products_entity_1 = require("../../products/entity/products.entity");
const vendor_entity_1 = require("../../vendors/entity/vendor.entity");
let Purchases = class Purchases extends sequelize_typescript_1.Model {
};
exports.Purchases = Purchases;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Purchases.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_entity_1.Products),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Purchases.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => products_entity_1.Products),
    __metadata("design:type", products_entity_1.Products)
], Purchases.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => vendor_entity_1.Vendor),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Purchases.prototype, "vendor_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => vendor_entity_1.Vendor),
    __metadata("design:type", vendor_entity_1.Vendor)
], Purchases.prototype, "vendor", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => currencyConversionRates_entity_1.Currencyconversionrates),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Purchases.prototype, "currency_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => currencyConversionRates_entity_1.Currencyconversionrates),
    __metadata("design:type", currencyConversionRates_entity_1.Currencyconversionrates)
], Purchases.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Purchases.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Purchases.prototype, "unit_price_original", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.NUMBER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Purchases.prototype, "unit_price_inr", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Purchases.prototype, "currency_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Purchases.prototype, "purchase_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Purchases.prototype, "reference_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Purchases.prototype, "reference_number_date", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Purchases.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Purchases.prototype, "updatedAt", void 0);
exports.Purchases = Purchases = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'purchases',
        timestamps: false,
    })
], Purchases);
//# sourceMappingURL=purchases.entity.js.map