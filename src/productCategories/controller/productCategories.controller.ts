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

import { ProductCategoriesRequestDto } from '../dto/productCategoriesRequest.dto';

import { ProductCategoriesService } from '../service/productCategories.service';

@Controller('productCategories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,

    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createProductCategories(
    @Body() requestDto: ProductCategoriesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productCategoriesService.createProductCategories(requestDto);

      return this.errorMessageService.success(
        data,

        true,

        'ProductCategories created successfully',

        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateProductCategories(
    @Param('id') id: string,

    @Body() requestDto: ProductCategoriesRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productCategoriesService.updateProductCategories(
        id,

        requestDto,
      );

      return this.errorMessageService.success(
        data,

        true,

        'ProductCategories updated successfully',

        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getProductCategories(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productCategoriesService.getProductCategories(id);

      return this.errorMessageService.success(
        data,

        true,

        'ProductCategories retrieved successfully',

        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get()
  async getAllProductCategories(): Promise<any> {
    try {
      return await this.productCategoriesService.getAllProductCategories();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Delete(':id')
  async deleteProductCategories(
    @Param('id') id: string,
  ): Promise<SuccessResponseDto> {
    try {
      const data =
        await this.productCategoriesService.deleteProductCategories(id);

      return this.errorMessageService.success(
        data,

        true,

        'ProductCategories deleted successfully',

        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
