/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Sales } from '../entity/sales.entity';
import { SalesRequestDto } from '../dto/salesRequest.dto';
import { SalesDto } from '../dto/sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SALES_REPOSITORY')
    private readonly salesRepository: typeof Sales,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createSales(requestDto: SalesRequestDto) {
    try {
      /*const findItem = await this.purchasesRepository.findOne({
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

      const lastSales = await this.salesRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastSales && lastSales.reference_number) {
        const match = lastSales.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }
      const dateString = moment().format('DDMMYY');
      const newReferenceNumber = `SA${nextSeriesNumber}-${dateString}`;

      const fields = {
        product_id: requestDto.product_id,
        seller_id: requestDto.seller_id,
        currency_id: requestDto.currency_id,
        quantity: requestDto.quantity,
        unit_price_original: requestDto.unit_price_original,
        //unit_price_inr: requestDto.unit_price_inr,
        shipping_cost_original: requestDto.shipping_cost_original,
        //shipping_cost_inr: requestDto.shipping_cost_inr,
        currency_code: requestDto.currency_code,
        sale_date: requestDto.sale_date,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.salesRepository.create(fields);
      if (item) {
        return new SalesDto(item);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Sales',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateSales(id: string, requestDto: SalesRequestDto) {
    try {
      const oldItem = await this.salesRepository.findByPk(id);

      if (!oldItem) {
        throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
      }

      const findItem = await this.salesRepository.findOne({
        where: {
          product_id: requestDto.product_id,
          seller_id: requestDto.seller_id,
          currency_id: requestDto.currency_id,
          quantity: requestDto.quantity,
          unit_price_original: requestDto.unit_price_original,
          //unit_price_inr: requestDto.unit_price_inr,
          shipping_cost_original: requestDto.shipping_cost_original,
          //shipping_cost_inr: requestDto.shipping_cost_inr,
          sale_date: requestDto.sale_date,
          id: { [Op.ne]: id },
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'sales with this catagory already exists',
          200,
        );
      }

      const fields = {
        quantity: requestDto.quantity,
        unit_price_original: requestDto.unit_price_original,
        //unit_price_inr: requestDto.unit_price_inr,
        shipping_cost_original: requestDto.shipping_cost_original,
        //shipping_cost_inr: requestDto.shipping_cost_inr,
        sale_date: requestDto.sale_date,
        currency_code: requestDto.currency_code,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.salesRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (item && item.length > 1) {
        return new SalesDto(item[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Sales',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getsales(id: string) {
    try {
      const item = await this.salesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
      }
      return new SalesDto(item);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllsales() {
    try {
      const items = await this.salesRepository.findAll();
      if (!items || items.length === 0) {
        throw this.errorMessageService.GeneralErrorCore('NO Sales found', 404);
      }
      return items.map((item) => new SalesDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deletesales(id: string) {
    try {
      const item = await this.salesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore('Sales not found', 404);
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.salesRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Sales deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Sales',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
