/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { ProductsDto } from '../dto/products.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Products } from '../entity/products.entity';
import { ProductsRequestDto } from '../dto/productsRequest.dto';
import { Purchases } from 'src/purchases/entity/purchases.entity';
import { Sales } from 'src/sales/entity/sales.entity';
import { ProductDamages } from 'src/productDamages/entity/productDamages.entity';
import { QueryTypes } from 'sequelize'; // Import QueryTypes

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
      const item = await this.productsRepository.findByPk(id, {
        include: [Purchases, Sales, ProductDamages],
      });
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
      const items = await this.productsRepository.findAll({
        include: [Purchases, Sales, ProductDamages],
      });
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
    const t = await this.sequelize.transaction();
    try {
      const item = await this.productsRepository.findByPk(id, {
        transaction: t,
      });
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Products not found',
          404,
        );
      }

      // Correctly type the raw query result to avoid TS18046 error
      const [relatedCount] = await this.sequelize.query<{
        purchases_count: number;
        sales_count: number;
        damages_count: number;
      }>(
        `SELECT
            (SELECT COUNT(*) FROM "purchases" WHERE "product_id" = '${id}') AS purchases_count,
            (SELECT COUNT(*) FROM "sales" WHERE "product_id" = '${id}') AS sales_count,
            (SELECT COUNT(*) FROM "product_damages" WHERE "product_id" = '${id}') AS damages_count`,
        {
          type: QueryTypes.SELECT, // Specify the query type
          transaction: t,
        },
      );

      if (
        relatedCount.purchases_count > 0 ||
        relatedCount.sales_count > 0 ||
        relatedCount.damages_count > 0
      ) {
        throw this.errorMessageService.GeneralErrorCore(
          'Cannot delete product with existing purchases, sales, or damages',
          400,
        );
      }

      const deleted = await this.productsRepository.destroy({
        where: { id: id },
        transaction: t,
      });
      if (deleted) {
        await t.commit();
        return { message: 'Products deleted successfully' };
      } else {
        await t.rollback();
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Products',
          200,
        );
      }
    } catch (error) {
      await t.rollback();
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
