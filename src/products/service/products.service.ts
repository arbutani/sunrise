/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { ProductsDto } from '../dto/products.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../entity/products.entity';
import { ProductsRequestDto } from '../dto/productsRequest.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private readonly productsRepository: typeof Products,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createProducts(requestDto: ProductsRequestDto) {
    try {
      const findItem = await this.productsRepository.findOne({
        where: {
          name: requestDto.name,
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products with this name already exists',
          200,
        );
      }

      const lastProducts = await this.productsRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastProducts && lastProducts.reference_number) {
        const match = lastProducts.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      const dateString = moment().format('DDMMYY');

      const newReferenceNumber = `PR${nextSeriesNumber}-${dateString}`;

      const fields = {
        subcategory_id: requestDto.subcategory_id,
        name: requestDto.name,
        description: requestDto.description,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.productsRepository.create(fields);
      if (item) {
        return new ProductsDto(item);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Products',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateProducts(id: string, requestDto: ProductsRequestDto) {
    try {
      const oldItem = await this.productsRepository.findByPk(id);

      if (!oldItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products not found',
          404,
        );
      }

      const findItem = await this.productsRepository.findOne({
        where: {
          name: requestDto.name,
          id: { [Op.ne]: id },
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products with this name already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        description: requestDto.description,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.productsRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (item && item.length > 1) {
        return new ProductsDto(item[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Products',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getProducts(id: string) {
    try {
      const item = await this.productsRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products not found',
          404,
        );
      }
      return new ProductsDto(item);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllProducts() {
    try {
      const items = await this.productsRepository.findAll();
      if (!items || items.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Products found',
          404,
        );
      }
      return items.map((item) => new ProductsDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteProducts(id: string) {
    try {
      const item = await this.productsRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.productsRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Products deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Products',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
