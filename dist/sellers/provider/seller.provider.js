"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerProvider = void 0;
const seller_entity_1 = require("../entity/seller.entity");
exports.SellerProvider = [
    {
        provide: 'SELLER_REPOSITORY',
        useValue: seller_entity_1.Seller,
    },
];
//# sourceMappingURL=seller.provider.js.map