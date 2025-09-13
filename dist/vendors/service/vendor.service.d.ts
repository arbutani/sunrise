import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { VendorDto } from '../dto/vendor.dto';
import { Vendor } from '../entity/vendor.entity';
import { VendorRequestDto } from '../dto/vendorRequest.dto';
export declare class VendorService {
    private readonly vendorRepository;
    private readonly errorMessageService;
    constructor(vendorRepository: typeof Vendor, errorMessageService: ErrorMessageService);
    createVendor(requestDto: VendorRequestDto): Promise<VendorDto>;
    updateVendor(id: string, requestDto: VendorRequestDto): Promise<VendorDto>;
    getVendor(id: string): Promise<VendorDto>;
    getAllVendors(): Promise<VendorDto[]>;
    deleteVendor(id: string): Promise<{
        message: string;
    }>;
}
