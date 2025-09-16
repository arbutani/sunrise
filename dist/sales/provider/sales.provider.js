"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesProvider = void 0;
const sales_entity_1 = require("../entity/sales.entity");
exports.SalesProvider = [
    {
        provide: 'SALES_REPOSITORY',
        useValue: sales_entity_1.Sales,
    },
];
//# sourceMappingURL=sales.provider.js.map