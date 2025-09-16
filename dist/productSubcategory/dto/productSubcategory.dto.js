"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubcategoryDto = void 0;
const moment_1 = __importDefault(require("moment"));
class ProductSubcategoryDto {
    id;
    category_id;
    name;
    description;
    reference_number;
    reference_number_date;
    createdAt;
    updatedAt;
    constructor(data) {
        data = data.dataValues ? data.dataValues : data;
        this.id = data.id;
        this.category_id = data.category_id;
        this.name = data.name;
        this.description = data.description;
        this.reference_number = data.reference_number;
        this.reference_number_date = data.reference_number_date;
        const createdAt = data.createdAt
            ? data.createdAt
            : data.created_at
                ? data.created_at
                : '';
        const updatedAt = data.updatedAt
            ? data.updatedAt
            : data.updated_at
                ? data.updated_at
                : '';
        if (createdAt) {
            this.createdAt = (0, moment_1.default)(createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY hh:mm A');
        }
        if (updatedAt) {
            this.updatedAt = (0, moment_1.default)(updatedAt, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY hh:mm A');
        }
    }
}
exports.ProductSubcategoryDto = ProductSubcategoryDto;
//# sourceMappingURL=productSubcategory.dto.js.map