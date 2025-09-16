/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { ProductSubcategoryDto } from '../dto/productSubcategory.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ProductSubcategory } from '../entity/productSubcategory.entity';
import { ProductSubcategoryRequestDto } from '../dto/productSubcategoryRequest.dto';

@Injectable()
export class ProductSubcategoryService {
  constructor(
    @Inject('PRODUCT_SUBCATEGORY_REPOSITORY')
    private readonly productSubcategoryRepository: typeof ProductSubcategory,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createProductSubcategory(requestDto: ProductSubcategoryRequestDto) {
    try {
      const findProductSubcategory =
        await this.productSubcategoryRepository.findOne({
          where: {
            name: requestDto.name,
          },
        });
      if (findProductSubcategory) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductSubcategory with this name already exists',
          200,
        );
      }

      // Find the last employee to determine the next series number
      const lastProductSubcategory =
        await this.productSubcategoryRepository.findOne({
          order: [['createdAt', 'DESC']],
        });

      let nextSeriesNumber = 1;
      if (lastProductSubcategory && lastProductSubcategory.reference_number) {
        // Use a regular expression to extract any number from the last reference_number.
        // This makes the logic more robust and handles different formats.
        const match = lastProductSubcategory.reference_number.match(/\d+/);
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
      const newReferenceNumber = `PSC${nextSeriesNumber}-${dateString}`;

      const fields = {
        category_id: requestDto.category_id,
        name: requestDto.name,
        description: requestDto.description,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const productSubcategory =
        await this.productSubcategoryRepository.create(fields);
      if (productSubcategory) {
        return new ProductSubcategoryDto(productSubcategory);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create ProductSubcategory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateProductSubcategory(
    id: string,
    requestDto: ProductSubcategoryRequestDto,
  ) {
    try {
      const oldProductSubcategory =
        await this.productSubcategoryRepository.findByPk(id);

      if (!oldProductSubcategory) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductSubcategory not found',
          404,
        );
      }

      const findProductSubcategory =
        await this.productSubcategoryRepository.findOne({
          where: {
            name: requestDto.name,
            description: requestDto.description,
            id: { [Op.ne]: id },
          },
        });
      if (findProductSubcategory) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductSubcategory with this name and discription already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        description: requestDto.description,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const productSubcategory = await this.productSubcategoryRepository.update(
        fields,
        {
          where: { id },
          returning: true,
        },
      );
      if (productSubcategory && productSubcategory.length > 1) {
        return new ProductSubcategoryDto(productSubcategory[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update productSubcategory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getProductSubcategory(id: string) {
    try {
      const productSubcategory =
        await this.productSubcategoryRepository.findByPk(id);
      if (!productSubcategory) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductSubcategory not found',
          404,
        );
      }
      return new ProductSubcategoryDto(productSubcategory);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllproductSubcategory() {
    try {
      const productSubcategory =
        await this.productSubcategoryRepository.findAll();
      if (!productSubcategory || productSubcategory.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO ProductSubcategory found',
          404,
        );
      }
      return productSubcategory.map(
        (productSubcategory) => new ProductSubcategoryDto(productSubcategory),
      );
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteProductSubcategory(id: string) {
    try {
      const productSubcategory =
        await this.productSubcategoryRepository.findByPk(id);
      if (!productSubcategory) {
        throw this.errorMessageService.GeneralErrorCore(
          'ProductSubcategory not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.productSubcategoryRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'ProductSubcategory deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete ProductSubcategory',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
