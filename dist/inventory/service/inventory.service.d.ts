import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { Sequelize } from 'sequelize-typescript';
import { Inventory } from '../entity/inventory.entity';
import { InventoryRequestDto } from '../dto/inventoryRequest.dto';
import { InventoryDto } from '../dto/inventory.dto';
export declare class InventoryService {
    private readonly inventoryRepository;
    private readonly sequelize;
    private readonly errorMessageService;
    constructor(inventoryRepository: typeof Inventory, sequelize: Sequelize, errorMessageService: ErrorMessageService);
    createInventory(requestDto: InventoryRequestDto): Promise<InventoryDto>;
    updateInventory(id: string, requestDto: InventoryRequestDto): Promise<InventoryDto>;
    getInventory(id: string): Promise<InventoryDto>;
    getAllInventory(): Promise<InventoryDto[]>;
    deleteInventory(id: string): Promise<{
        message: string;
    }>;
}
