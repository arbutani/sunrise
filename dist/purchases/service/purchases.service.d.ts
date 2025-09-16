import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { PurchasesDto } from '../dto/purchases.dto';
import { Sequelize } from 'sequelize-typescript';
import { Purchases } from '../entity/purchases.entity';
import { PurchasesRequestDto } from '../dto/purchasesRequest.dto';
export declare class PurchasesService {
    private readonly purchasesRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(purchasesRepository: typeof Purchases, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createPurchases(requestDto: PurchasesRequestDto): Promise<PurchasesDto>;
    updatePurchases(id: string, requestDto: PurchasesRequestDto): Promise<PurchasesDto>;
    getPurchases(id: string): Promise<PurchasesDto>;
    getAllPurchases(): Promise<PurchasesDto[]>;
    deletePurchases(id: string): Promise<{
        message: string;
    }>;
}
