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
import { ProductDamagesService } from '../service/productDamages.service';
import { ProductDamagesRequestDto } from '../dto/productDamagesRequest.dto';

@Controller('productdamages')
export class ProductDamagesController {
  constructor(
    private readonly productDamagesService: ProductDamagesService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createProductDamages(
    @Body() requestDto: ProductDamagesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productDamagesService.createProductDamages(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'ProductDamages created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateProductDamages(
    @Param('id') id: string,
    @Body() requestDto: ProductDamagesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productDamagesService.updateProductDamages(
        id,
        requestDto,
      );
      return this.errorMessageService.success(
        data,
        true,
        'ProductDamages updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getProductDamages(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productDamagesService.getProductDamages(id);
      return this.errorMessageService.success(
        data,
        true,
        'ProductDamages retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllproductDamages(): Promise<any> {
    try {
      return await this.productDamagesService.getAllProductDamages();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteProductDamages(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productDamagesService.deleteProductDamages(id);
      return this.errorMessageService.success(
        data,
        true,
        'ProductDamages deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
