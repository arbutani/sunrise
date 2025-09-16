"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesDto = void 0;
const moment_1 = __importDefault(require("moment"));
class PurchasesDto {
    id;
    product_id;
    vendor_id;
    currency_id;
    quantity;
    unit_price_original;
    unit_price_inr;
    currency_code;
    purchase_date;
    reference_number;
    reference_number_date;
    createdAt;
    updatedAt;
    constructor(data) {
        data = data.dataValues ? data.dataValues : data;
        this.id = data.id;
        this.product_id = data.product_id;
        this.vendor_id = data.vendor_id;
        this.currency_id = data.currency_id;
        this.quantity = data.quantity;
        this.unit_price_original = data.unit_price_original;
        this.unit_price_inr = data.unit_price_inr;
        this.currency_code = data.currency_code;
        this.purchase_date = data.purchase_date;
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
exports.PurchasesDto = PurchasesDto;
//# sourceMappingURL=purchases.dto.js.map