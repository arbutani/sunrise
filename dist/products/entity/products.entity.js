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
exports.Products = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const productDamages_entity_1 = require("../../productDamages/entity/productDamages.entity");
const productSubcategory_entity_1 = require("../../productSubcategory/entity/productSubcategory.entity");
const purchases_entity_1 = require("../../purchases/entity/purchases.entity");
const sales_entity_1 = require("../../sales/entity/sales.entity");
let Products = class Products extends sequelize_typescript_1.Model {
};
exports.Products = Products;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => productSubcategory_entity_1.ProductSubcategory),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Products.prototype, "subcategory_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => productSubcategory_entity_1.ProductSubcategory),
    __metadata("design:type", productSubcategory_entity_1.ProductSubcategory)
], Products.prototype, "subcategory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Products.prototype, "reference_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Products.prototype, "reference_number_date", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'created_at',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({
        field: 'updated_at',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
    }),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => purchases_entity_1.Purchases),
    __metadata("design:type", Array)
], Products.prototype, "purchases", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sales_entity_1.Sales),
    __metadata("design:type", Array)
], Products.prototype, "sales", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => productDamages_entity_1.ProductDamages),
    __metadata("design:type", Array)
], Products.prototype, "damages", void 0);
exports.Products = Products = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'products',
        timestamps: false,
    })
], Products);
//# sourceMappingURL=products.entity.js.map