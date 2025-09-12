import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { CurrencyconversionratesService } from '../service/currencyConversionRates.service';
import { CurrencyconversionratesRequestDto } from '../dto/currencyConversionRatesRequest.dto';
export declare class CurrencyconversionratesController {
    private readonly currencyconversionratessarvice;
    private readonly errorMessageService;
    constructor(currencyconversionratessarvice: CurrencyconversionratesService, errorMessageService: ErrorMessageService);
    Currencyconversionrates(requestDto: CurrencyconversionratesRequestDto): Promise<SuccessResponseDto>;
    updateCurrencyconversionrates(id: string, requestDto: CurrencyconversionratesRequestDto): Promise<SuccessResponseDto>;
    getCurrencyconversionrates(id: string): Promise<SuccessResponseDto>;
    getAllCurrencyconversionrates(): Promise<any>;
    deleteCurrencyconversionrates(id: string): Promise<SuccessResponseDto>;
}
