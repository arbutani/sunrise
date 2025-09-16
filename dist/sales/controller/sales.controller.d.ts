import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { SalesService } from '../service/sales.service';
import { SalesRequestDto } from '../dto/salesRequest.dto';
export declare class SalesController {
    private readonly salesService;
    private readonly errorMessageService;
    constructor(salesService: SalesService, errorMessageService: ErrorMessageService);
    createSales(requestDto: SalesRequestDto): Promise<SuccessResponseDto>;
    updateSales(id: string, requestDto: SalesRequestDto): Promise<SuccessResponseDto>;
    getSales(id: string): Promise<SuccessResponseDto>;
    getAllSales(): Promise<any>;
    deleteSales(id: string): Promise<SuccessResponseDto>;
}
