import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { PurchasesRequestDto } from '../dto/purchasesRequest.dto';
import { PurchasesService } from '../service/purchases.service';
export declare class PurchasesController {
    private readonly purchasesService;
    private readonly errorMessageService;
    constructor(purchasesService: PurchasesService, errorMessageService: ErrorMessageService);
    createPurchases(requestDto: PurchasesRequestDto): Promise<SuccessResponseDto>;
    updatePurchases(id: string, requestDto: PurchasesRequestDto): Promise<SuccessResponseDto>;
    getPurchases(id: string): Promise<SuccessResponseDto>;
    getAllPurchases(): Promise<any>;
    deletePurchases(id: string): Promise<SuccessResponseDto>;
}
