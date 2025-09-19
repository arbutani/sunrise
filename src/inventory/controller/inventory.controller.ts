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
import { InventoryRequestDto } from '../dto/inventoryRequest.dto';
import { InventoryService } from '../service/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly errorMessageService: ErrorMessageService,
  ) {
    // Initialization code can go here if needed
  }

  @Post()
  async createInventory(
    @Body() requestDto: InventoryRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.inventoryService.createInventory(requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Inventory created successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Put(':id')
  async updateInventory(
    @Param('id') id: string,
    @Body() requestDto: InventoryRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      const data = await this.inventoryService.updateInventory(id, requestDto);
      return this.errorMessageService.success(
        data,
        true,
        'Inventory updated successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }

  @Get(':id')
  async getInventory(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.inventoryService.getInventory(id);
      return this.errorMessageService.success(
        data,
        true,
        'Inventory retrieved successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Get()
  async getAllInventory(): Promise<any> {
    try {
      return await this.inventoryService.getAllInventory();
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
  @Delete(':id')
  async deleteInventory(@Param('id') id: string): Promise<SuccessResponseDto> {
    try {
      const data = await this.inventoryService.deleteInventory(id);
      return this.errorMessageService.success(
        data,
        true,
        'Inventory deleted successfully',
        {},
      );
    } catch (error) {
      throw this.errorMessageService.error(error);
    }
  }
}
