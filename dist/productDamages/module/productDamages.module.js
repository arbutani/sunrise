"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDamagesModule = void 0;
const common_1 = require("@nestjs/common");
const productDamages_provider_1 = require("../provider/productDamages.provider");
const productDamages_service_1 = require("../service/productDamages.service");
const productDamages_controller_1 = require("../controller/productDamages.controller");
let ProductDamagesModule = class ProductDamagesModule {
};
exports.ProductDamagesModule = ProductDamagesModule;
exports.ProductDamagesModule = ProductDamagesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [productDamages_controller_1.ProductDamagesController],
        providers: [...productDamages_provider_1.ProductDamagesProvider, productDamages_service_1.ProductDamagesService],
    })
], ProductDamagesModule);
//# sourceMappingURL=productDamages.module.js.map