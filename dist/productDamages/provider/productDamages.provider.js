"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDamagesProvider = void 0;
const productDamages_entity_1 = require("../entity/productDamages.entity");
exports.ProductDamagesProvider = [
    {
        provide: 'PRODUCT_DAMAGES_REPOSITORY',
        useValue: productDamages_entity_1.ProductDamages,
    },
];
//# sourceMappingURL=productDamages.provider.js.map