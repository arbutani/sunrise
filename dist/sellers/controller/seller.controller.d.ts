import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { SellerService } from '../service/seller.service';
import { SellerRequestDto } from '../dto/sellerRequest.dto';
export declare class SellerController {
    private readonly sellerService;
    private readonly errorMessageService;
    constructor(sellerService: SellerService, errorMessageService: ErrorMessageService);
    createSeller(requestDto: SellerRequestDto): Promise<SuccessResponseDto>;
    updateSeller(id: string, requestDto: SellerRequestDto): Promise<SuccessResponseDto>;
    getSeller(id: string): Promise<SuccessResponseDto>;
    getAllSellers(): Promise<any>;
    deleteSeller(id: string): Promise<SuccessResponseDto>;
}
