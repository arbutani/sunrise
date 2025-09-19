/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Inventory } from '../entity/inventory.entity';
import { InventoryRequestDto } from '../dto/inventoryRequest.dto';

import { InventoryDto } from '../dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private readonly inventoryRepository: typeof Inventory,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createInventory(requestDto: InventoryRequestDto) {
    try {
      const findItem = await this.inventoryRepository.findOne({
        where: {
          product_id: requestDto.product_id,
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Inventory with this email already exists',
          200,
        );
      }

      const lastInventory = await this.inventoryRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastInventory && lastInventory.reference_number) {
        const match = lastInventory.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      const dateString = moment().format('DDMMYY');

      const newReferenceNumber = `IV${nextSeriesNumber}-${dateString}`;

      const fields = {
        product_id: requestDto.product_id,
        available_qty: requestDto.available_qty,
        damaged_qty: requestDto.damaged_qty,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.inventoryRepository.create(fields);
      if (item) {
        return new InventoryDto(item);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Inventory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateInventory(id: string, requestDto: InventoryRequestDto) {
    try {
      const oldItem = await this.inventoryRepository.findByPk(id);

      if (!oldItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Inventory not found',
          404,
        );
      }

      const findItem = await this.inventoryRepository.findOne({
        where: {
          available_qty: requestDto.available_qty,
          damaged_qty: requestDto.damaged_qty,
          product_id: requestDto.product_id,
          id: { [Op.ne]: id },
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Inventory with this catagory already exists',
          200,
        );
      }

      const fields = {
        available_qty: requestDto.available_qty,
        damaged_qty: requestDto.damaged_qty,
        product_id: requestDto.product_id,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.inventoryRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (item && item.length > 1) {
        return new InventoryDto(item[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Inventory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getInventory(id: string) {
    try {
      const item = await this.inventoryRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Inventory not found',
          404,
        );
      }
      return new InventoryDto(item);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllInventory() {
    try {
      const items = await this.inventoryRepository.findAll();
      if (!items || items.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Inventory found',
          404,
        );
      }
      return items.map((item) => new InventoryDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteInventory(id: string) {
    try {
      const item = await this.inventoryRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Inventory not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.inventoryRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Inventory deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Inventory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
