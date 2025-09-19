/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductDamages } from '../entity/productDamages.entity';
import { ProductDamagesRequestDto } from '../dto/productDamagesRequest.dto';
import { ProductDamagesDto } from '../dto/productdamages.dto';

@Injectable()
export class ProductDamagesService {
  constructor(
    @Inject('PRODUCT_DAMAGES_REPOSITORY')
    private readonly productDamagesRepository: typeof ProductDamages,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createProductDamages(requestDto: ProductDamagesRequestDto) {
    try {
      /*const findItem = await this.productDamagesRepository.findOne({
        where: {
          //categories: requestDto.categories
          name: requestDto.name,
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Item with this email already exists',
          200,
        );
      }*/

      const lastProductDamages = await this.productDamagesRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastProductDamages && lastProductDamages.reference_number) {
        const match = lastProductDamages.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      const dateString = moment().format('DDMMYY');

      const newReferenceNumber = `PD${nextSeriesNumber}-${dateString}`;

      const fields = {
        product_id: requestDto.product_id,
        damage_type: requestDto.damage_type,
        quantity: requestDto.quantity,
        remarks: requestDto.remarks,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.productDamagesRepository.create(fields);
      if (item) {
        return new ProductDamagesDto(item);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create ProductDamages',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateProductDamages(id: string, requestDto: ProductDamagesRequestDto) {
    try {
      const oldItem = await this.productDamagesRepository.findByPk(id);

      if (!oldItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductDamages not found',
          404,
        );
      }

      const findItem = await this.productDamagesRepository.findOne({
        where: {
          quantity: requestDto.quantity,
          damage_type: requestDto.damage_type,
          remarks: requestDto.remarks,
          id: { [Op.ne]: id },
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductDamages with this catagory already exists',
          200,
        );
      }

      const fields = {
        quantity: requestDto.quantity,
        damage_type: requestDto.damage_type,
        remarks: requestDto.remarks,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.productDamagesRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (item && item.length > 1) {
        return new ProductDamagesDto(item[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update ProductDamages',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getProductDamages(id: string) {
    try {
      const item = await this.productDamagesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductDamages not found',
          404,
        );
      }
      return new ProductDamagesDto(item);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllProductDamages() {
    try {
      const items = await this.productDamagesRepository.findAll();
      if (!items || items.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO ProductDamages found',
          404,
        );
      }
      return items.map((item) => new ProductDamagesDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteProductDamages(id: string) {
    try {
      const item = await this.productDamagesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductDamages not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.productDamagesRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'productDamages deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete item',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
