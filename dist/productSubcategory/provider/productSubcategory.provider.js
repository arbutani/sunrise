"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubcategoryProvider = void 0;
const productSubcategory_entity_1 = require("../entity/productSubcategory.entity");
exports.ProductSubcategoryProvider = [
    {
        provide: 'PRODUCT_SUBCATEGORY_REPOSITORY',
        useValue: productSubcategory_entity_1.ProductSubcategory,
    },
];
//# sourceMappingURL=productSubcategory.provider.js.map