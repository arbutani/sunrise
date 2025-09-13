import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { Seller } from '../entity/seller.entity';
import { SellerRequestDto } from '../dto/sellerRequest.dto';
import { SellerDto } from '../dto/seller.dto';
export declare class SellerService {
    private readonly sellerRepository;
    private readonly errorMessageService;
    constructor(sellerRepository: typeof Seller, errorMessageService: ErrorMessageService);
    createSeller(requestDto: SellerRequestDto): Promise<SellerDto>;
    updateSeller(id: string, requestDto: SellerRequestDto): Promise<SellerDto>;
    getSeller(id: string): Promise<SellerDto>;
    getAllSellers(): Promise<SellerDto[]>;
    deleteSeller(id: string): Promise<{
        message: string;
    }>;
}
