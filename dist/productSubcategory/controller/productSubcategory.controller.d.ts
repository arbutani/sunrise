import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { ProductSubcategoryRequestDto } from '../dto/productSubcategoryRequest.dto';
import { ProductSubcategoryService } from '../service/productSubcategory.service';
export declare class ProductSubcategoryController {
    private readonly productSubcategoryService;
    private readonly errorMessageService;
    constructor(productSubcategoryService: ProductSubcategoryService, errorMessageService: ErrorMessageService);
    createProductSubcategory(requestDto: ProductSubcategoryRequestDto): Promise<SuccessResponseDto>;
    updateProductSubcategory(id: string, requestDto: ProductSubcategoryRequestDto): Promise<SuccessResponseDto>;
    getProductSubcategory(id: string): Promise<SuccessResponseDto>;
    getAllproductSubcategory(): Promise<any>;
    deleteProductSubcategory(id: string): Promise<SuccessResponseDto>;
}
