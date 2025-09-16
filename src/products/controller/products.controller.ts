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
import { ProductsRequestDto } from '../dto/productsRequest.dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createProducts(
    @Body() requestDto: ProductsRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productsService.createProducts(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Products created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateProducts(
    @Param('id') id: string,
    @Body() requestDto: ProductsRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.productsService.updateProducts(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Products updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getProducts(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.productsService.getProducts(id);
      return this.errorMessageService.success(
        data,
        true,
        'Products retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllProducts(): Promise<any> {
    try {
      return await this.productsService.getAllProducts();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteProducts(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.productsService.deleteProducts(id);
      return this.errorMessageService.success(
        data,
        true,
        'Products deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
