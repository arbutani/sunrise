import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { ProductSubcategoryDto } from '../dto/productSubcategory.dto';
import { Sequelize } from 'sequelize-typescript';
import { ProductSubcategory } from '../entity/productSubcategory.entity';
import { ProductSubcategoryRequestDto } from '../dto/productSubcategoryRequest.dto';
export declare class ProductSubcategoryService {
    private readonly productSubcategoryRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(productSubcategoryRepository: typeof ProductSubcategory, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createProductSubcategory(requestDto: ProductSubcategoryRequestDto): Promise<ProductSubcategoryDto>;
    updateProductSubcategory(id: string, requestDto: ProductSubcategoryRequestDto): Promise<ProductSubcategoryDto>;
    getProductSubcategory(id: string): Promise<ProductSubcategoryDto>;
    getAllproductSubcategory(): Promise<ProductSubcategoryDto[]>;
    deleteProductSubcategory(id: string): Promise<{
        message: string;
    }>;
}
