import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { ProductDamagesService } from '../service/productDamages.service';
import { ProductDamagesRequestDto } from '../dto/productDamagesRequest.dto';
export declare class ProductDamagesController {
    private readonly productDamagesService;
    private readonly errorMessageService;
    constructor(productDamagesService: ProductDamagesService, errorMessageService: ErrorMessageService);
    createProductDamages(requestDto: ProductDamagesRequestDto): Promise<SuccessResponseDto>;
    updateProductDamages(id: string, requestDto: ProductDamagesRequestDto): Promise<SuccessResponseDto>;
    getProductDamages(id: string): Promise<SuccessResponseDto>;
    getAllproductDamages(): Promise<any>;
    deleteProductDamages(id: string): Promise<SuccessResponseDto>;
}
