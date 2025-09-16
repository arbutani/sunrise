import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { ProductCategoriesDto } from '../dto/productCategories.dto';
import { Sequelize } from 'sequelize-typescript';
import { ProductCategories } from '../entity/productCategories.entity';
import { ProductCategoriesRequestDto } from '../dto/productCategoriesRequest.dto';
export declare class ProductCategoriesService {
    private readonly productCategoriesRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(productCategoriesRepository: typeof ProductCategories, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createProductCategories(requestDto: ProductCategoriesRequestDto): Promise<ProductCategoriesDto>;
    updateProductCategories(id: string, requestDto: ProductCategoriesRequestDto): Promise<ProductCategoriesDto>;
    getProductCategories(id: string): Promise<ProductCategoriesDto>;
    getAllProductCategories(): Promise<ProductCategoriesDto[]>;
    deleteProductCategories(id: string): Promise<{
        message: string;
    }>;
}
