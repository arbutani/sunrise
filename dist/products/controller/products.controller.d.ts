import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { ProductsRequestDto } from '../dto/productsRequest.dto';
import { ProductsService } from '../service/products.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly errorMessageService;
    constructor(productsService: ProductsService, errorMessageService: ErrorMessageService);
    createProducts(requestDto: ProductsRequestDto): Promise<SuccessResponseDto>;
    updateProducts(id: string, requestDto: ProductsRequestDto): Promise<SuccessResponseDto>;
    getProducts(id: string): Promise<SuccessResponseDto>;
    getAllProducts(): Promise<any>;
    deleteProducts(id: string): Promise<SuccessResponseDto>;
}
