/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { ProductCategoriesDto } from '../dto/productCategories.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductCategories } from '../entity/productCategories.entity';
import { ProductCategoriesRequestDto } from '../dto/productCategoriesRequest.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @Inject('PRODUCT_CATEGORIES_REPOSITORY')
    private readonly productCategoriesRepository: typeof ProductCategories,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createProductCategories(requestDto: ProductCategoriesRequestDto) {
    try {
      const findProductCategories =
        await this.productCategoriesRepository.findOne({
          where: {
            name: requestDto.name,
          },
        });
      if (findProductCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories with this Name already exists',
          200,
        );
      }

      const lastProductCategories =
        await this.productCategoriesRepository.findOne({
          order: [['createdAt', 'DESC']],
        });

      let nextSeriesNumber = 1;
      if (
        lastProductCategories &&
        lastProductCategories.reference_number &&
        lastProductCategories.reference_number
      ) {
        const match = lastProductCategories.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }

      // Generate the date string in DDMMYY format as requested
      const dateString = moment().format('DDMMYY');

      // Construct the new reference number
      const newReferenceNumber = `PC${nextSeriesNumber}-${dateString}`;

      const fields = {
        name: requestDto.name,
        description: requestDto.description,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const productCategories =
        await this.productCategoriesRepository.create(fields);
      if (productCategories) {
        return new ProductCategoriesDto(productCategories);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create ProductCategories',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateProductCategories(
    id: string,
    requestDto: ProductCategoriesRequestDto,
  ) {
    try {
      const oldProductCategories =
        await this.productCategoriesRepository.findByPk(id);

      if (!oldProductCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }

      const findProductCategories =
        await this.productCategoriesRepository.findOne({
          where: {
            name: requestDto.name,
            id: { [Op.ne]: id },
          },
        });
      if (findProductCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories with this categories already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        description: requestDto.description,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const productCategories = await this.productCategoriesRepository.update(
        fields,
        {
          where: { id },
          returning: true,
        },
      );
      if (productCategories && productCategories.length > 1) {
        return new ProductCategoriesDto(productCategories[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update ProductCategories',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getProductCategories(id: string) {
    try {
      const productCategories =
        await this.productCategoriesRepository.findByPk(id);
      if (!productCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }
      return new ProductCategoriesDto(productCategories);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllProductCategories() {
    try {
      const productCategories =
        await this.productCategoriesRepository.findAll();
      if (!productCategories || productCategories.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO ProductCategories found',
          404,
        );
      }
      return productCategories.map(
        (productCategories) => new ProductCategoriesDto(productCategories),
      );
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteProductCategories(id: string) {
    try {
      const productCategories =
        await this.productCategoriesRepository.findByPk(id);
      if (!productCategories) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductCategories not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.productCategoriesRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'ProductCategories deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete ProductCategories',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
