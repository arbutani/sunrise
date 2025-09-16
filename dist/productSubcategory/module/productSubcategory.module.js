"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSubcategoryModule = void 0;
const common_1 = require("@nestjs/common");
const productSubcategory_provider_1 = require("../provider/productSubcategory.provider");
const productSubcategory_service_1 = require("../service/productSubcategory.service");
const productSubcategory_controller_1 = require("../controller/productSubcategory.controller");
let ProductSubcategoryModule = class ProductSubcategoryModule {
};
exports.ProductSubcategoryModule = ProductSubcategoryModule;
exports.ProductSubcategoryModule = ProductSubcategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [productSubcategory_controller_1.ProductSubcategoryController],
        providers: [...productSubcategory_provider_1.ProductSubcategoryProvider, productSubcategory_service_1.ProductSubcategoryService],
    })
], ProductSubcategoryModule);
//# sourceMappingURL=productSubcategory.module.js.map