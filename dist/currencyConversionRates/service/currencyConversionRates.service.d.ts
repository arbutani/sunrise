import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { Sequelize } from 'sequelize-typescript';
import { Currencyconversionrates } from '../entity/currencyConversionRates.entity';
import { CurrencyconversionratesRequestDto } from '../dto/currencyConversionRatesRequest.dto';
import { CurrencyconversionratesDto } from '../dto/currencyConversionRates.dto';
export declare class CurrencyconversionratesService {
    private readonly currencyconversionratsRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(currencyconversionratsRepository: typeof Currencyconversionrates, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createcurrencyconversionrate(requestDto: CurrencyconversionratesRequestDto): Promise<CurrencyconversionratesDto>;
    updateCurrencyconversionrates(id: string, requestDto: CurrencyconversionratesRequestDto): Promise<CurrencyconversionratesDto>;
    getCurrencyconversionrates(id: string): Promise<CurrencyconversionratesDto>;
    getAllCurrencyconversionrates(): Promise<CurrencyconversionratesDto[]>;
    deleteCurrencyconversionratese(id: string): Promise<{
        message: string;
    }>;
}
