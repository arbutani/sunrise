import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { VendorRequestDto } from '../dto/vendorRequest.dto';
import { VendorService } from '../service/vendor.service';
export declare class VendorController {
    private readonly vendorService;
    private readonly errorMessageService;
    constructor(vendorService: VendorService, errorMessageService: ErrorMessageService);
    createVendor(requestDto: VendorRequestDto): Promise<SuccessResponseDto>;
    updateVendor(id: string, requestDto: VendorRequestDto): Promise<SuccessResponseDto>;
    getVendor(id: string): Promise<SuccessResponseDto>;
    getAllVendors(): Promise<any>;
    deleteVendor(id: string): Promise<SuccessResponseDto>;
}
