import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { InventoryRequestDto } from '../dto/inventoryRequest.dto';
import { InventoryService } from '../service/inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    private readonly errorMessageService;
    constructor(inventoryService: InventoryService, errorMessageService: ErrorMessageService);
    createInventory(requestDto: InventoryRequestDto): Promise<SuccessResponseDto>;
    updateInventory(id: string, requestDto: InventoryRequestDto): Promise<SuccessResponseDto>;
    getInventory(id: string): Promise<SuccessResponseDto>;
    getAllInventory(): Promise<any>;
    deleteInventory(id: string): Promise<SuccessResponseDto>;
}
