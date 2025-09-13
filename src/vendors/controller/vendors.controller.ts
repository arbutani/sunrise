/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { VendorRequestDto } from '../dto/vendorRequest.dto';
import { VendorService } from '../service/vendor.service';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly vendorService: VendorService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createVendor(
    @Body() requestDto: VendorRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.vendorService.createVendor(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Vendor created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateVendor(
    @Param('id') id: string,
    @Body() requestDto: VendorRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.vendorService.updateVendor(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Vendor updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getVendor(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.vendorService.getVendor(id);
      return this.errorMessageService.success(
        data,
        true,
        'Vendor retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllVendors(): Promise<any> {
    try {
      return await this.vendorService.getAllVendors();
      //return await this.itemService.getAllItems(requestDto);
      //return this.errorMessageService.success(data, true, "Item retrieved successfully", {});
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteVendor(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.vendorService.deleteVendor(id);
      return this.errorMessageService.success(
        data,
        true,
        'Vendor deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
