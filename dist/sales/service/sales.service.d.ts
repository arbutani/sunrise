import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { Sequelize } from 'sequelize-typescript';
import { Sales } from '../entity/sales.entity';
import { SalesRequestDto } from '../dto/salesRequest.dto';
import { SalesDto } from '../dto/sales.dto';
export declare class SalesService {
    private readonly salesRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(salesRepository: typeof Sales, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createSales(requestDto: SalesRequestDto): Promise<SalesDto>;
    updateSales(id: string, requestDto: SalesRequestDto): Promise<SalesDto>;
    getsales(id: string): Promise<SalesDto>;
    getAllsales(): Promise<SalesDto[]>;
    deletesales(id: string): Promise<{
        message: string;
    }>;
}
