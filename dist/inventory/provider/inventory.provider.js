"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryProvider = void 0;
const inventory_entity_1 = require("../entity/inventory.entity");
exports.InventoryProvider = [
    {
        provide: 'INVENTORY_REPOSITORY',
        useValue: inventory_entity_1.Inventory,
    },
];
//# sourceMappingURL=inventory.provider.js.map