import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { Sequelize } from 'sequelize-typescript';
import { ProductDamages } from '../entity/productDamages.entity';
import { ProductDamagesRequestDto } from '../dto/productDamagesRequest.dto';
import { ProductDamagesDto } from '../dto/productdamages.dto';
export declare class ProductDamagesService {
    private readonly productDamagesRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(productDamagesRepository: typeof ProductDamages, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createProductDamages(requestDto: ProductDamagesRequestDto): Promise<ProductDamagesDto>;
    updateProductDamages(id: string, requestDto: ProductDamagesRequestDto): Promise<ProductDamagesDto>;
    getProductDamages(id: string): Promise<ProductDamagesDto>;
    getAllProductDamages(): Promise<ProductDamagesDto[]>;
    deleteProductDamages(id: string): Promise<{
        message: string;
    }>;
}
