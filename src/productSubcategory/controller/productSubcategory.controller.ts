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
import { ProductSubcategoryRequestDto } from '../dto/productSubcategoryRequest.dto';
import { ProductSubcategoryService } from '../service/productSubcategory.service';

@Controller('product-sub-category')
export class ProductSubcategoryController {
  constructor(
    private readonly productSubcategoryService: ProductSubcategoryService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createProductSubcategory(
    @Body() requestDto: ProductSubcategoryRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productSubcategoryService.createProductSubcategory(
          requestDto,
        );
      return this.errorMessageService.success(
        data,
        true,
        'ProductSubcategory created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateProductSubcategory(
    @Param('id') id: string,
    @Body() requestDto: ProductSubcategoryRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productSubcategoryService.updateProductSubcategory(
          id,
          requestDto,
        );
      return this.errorMessageService.success(
        data,
        true,
        'ProductSubcategory updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getProductSubcategory(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productSubcategoryService.getProductSubcategory(id);
      return this.errorMessageService.success(
        data,
        true,
        'ProductSubcategory retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllproductSubcategory(): Promise<any> {
    try {
      return await this.productSubcategoryService.getAllproductSubcategory();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteProductSubcategory(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productSubcategoryService.deleteProductSubcategory(id);
      return this.errorMessageService.success(
        data,
        true,
        'ProductSubcategory deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
