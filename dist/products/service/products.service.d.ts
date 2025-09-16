import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { ProductsDto } from '../dto/products.dto';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../entity/products.entity';
import { ProductsRequestDto } from '../dto/productsRequest.dto';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(productsRepository: typeof Products, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createProducts(requestDto: ProductsRequestDto): Promise<ProductsDto>;
    updateProducts(id: string, requestDto: ProductsRequestDto): Promise<ProductsDto>;
    getProducts(id: string): Promise<ProductsDto>;
    getAllProducts(): Promise<ProductsDto[]>;
    deleteProducts(id: string): Promise<{
        message: string;
    }>;
}
