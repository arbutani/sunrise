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
} from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import { SuccessResponseDto } from 'src/shared/dto/successResponse.dto';
import { SellerService } from '../service/seller.service';
import { SellerRequestDto } from '../dto/sellerRequest.dto';

@Controller('sellers')
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createSeller(
    @Body() requestDto: SellerRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.sellerService.createSeller(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Seller created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateSeller(
    @Param('id') id: string,
    @Body() requestDto: SellerRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.sellerService.updateSeller(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Seller updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getSeller(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.sellerService.getSeller(id);
      return this.errorMessageService.success(
        data,
        true,
        'Seller retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllSellers(): Promise<any> {
    try {
      return await this.sellerService.getAllSellers();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteSeller(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.sellerService.deleteSeller(id);
      return this.errorMessageService.success(
        data,
        true,
        'Seller deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
