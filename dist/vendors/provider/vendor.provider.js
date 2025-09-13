"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProvider = void 0;
const vendor_entity_1 = require("../entity/vendor.entity");
exports.VendorProvider = [
    {
        provide: 'VENDOR_REPOSITORY',
        useValue: vendor_entity_1.Vendor,
    },
];
//# sourceMappingURL=vendor.provider.js.map