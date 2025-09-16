"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesProvider = void 0;
const productCategories_entity_1 = require("../entity/productCategories.entity");
exports.ProductCategoriesProvider = [
    {
        provide: 'PRODUCT_CATEGORIES_REPOSITORY',
        useValue: productCategories_entity_1.ProductCategories,
    },
];
//# sourceMappingURL=productCategories.provider.js.map