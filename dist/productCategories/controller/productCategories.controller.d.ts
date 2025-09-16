import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { ProductCategoriesRequestDto } from '../dto/productCategoriesRequest.dto';
import { ProductCategoriesService } from '../service/productCategories.service';
export declare class ProductCategoriesController {
    private readonly productCategoriesService;
    private readonly errorMessageService;
    constructor(productCategoriesService: ProductCategoriesService, errorMessageService: ErrorMessageService);
    createProductCategories(requestDto: ProductCategoriesRequestDto): Promise<SuccessResponseDto>;
    updateProductCategories(id: string, requestDto: ProductCategoriesRequestDto): Promise<SuccessResponseDto>;
    getProductCategories(id: string): Promise<SuccessResponseDto>;
    getAllProductCategories(): Promise<any>;
    deleteProductCategories(id: string): Promise<SuccessResponseDto>;
}
