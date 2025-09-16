"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesProvider = void 0;
const purchases_entity_1 = require("../entity/purchases.entity");
exports.PurchasesProvider = [
    {
        provide: 'PURCHASES_REPOSITORY',
        useValue: purchases_entity_1.Purchases,
    },
];
//# sourceMappingURL=purchases.provider.js.map