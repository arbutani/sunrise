/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { PurchasesDto } from '../dto/purchases.dto';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Purchases } from '../entity/purchases.entity';
import { PurchasesRequestDto } from '../dto/purchasesRequest.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject('PURCHASES_REPOSITORY')
    private readonly purchasesRepository: typeof Purchases,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createPurchases(requestDto: PurchasesRequestDto) {
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

      const lastPurchases = await this.purchasesRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastPurchases && lastPurchases.reference_number) {
        const match = lastPurchases.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }
      const dateString = moment().format('DDMMYY');
      const newReferenceNumber = `PUR${nextSeriesNumber}-${dateString}`;

      const fields = {
        product_id: requestDto.product_id,
        vendor_id: requestDto.vendor_id,
        currency_id: requestDto.currency_id,
        quantity: requestDto.quantity,
        unit_price_original: requestDto.unit_price_original,
        //unit_price_inr: requestDto.unit_price_inr,
        currency_code: requestDto.currency_code,
        purchase_date: requestDto.purchase_date,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.purchasesRepository.create(fields);
      if (item) {
        return new PurchasesDto(item);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Purchases',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updatePurchases(id: string, requestDto: PurchasesRequestDto) {
    try {
      const oldItem = await this.purchasesRepository.findByPk(id);

      if (!oldItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Purchases not found',
          404,
        );
      }

      const findItem = await this.purchasesRepository.findOne({
        where: {
          product_id: requestDto.product_id,
          vendor_id: requestDto.vendor_id,
          currency_id: requestDto.currency_id,
          quantity: requestDto.quantity,
          unit_price_original: requestDto.unit_price_original,
          //unit_price_inr: requestDto.unit_price_inr,
          purchase_date: requestDto.purchase_date,
          id: { [Op.ne]: id },
        },
      });
      if (findItem) {
        throw this.errorMessageService.GeneralErrorCore(
          'Purchases with this catagory already exists',
          200,
        );
      }

      const fields = {
        quantity: requestDto.quantity,
        unit_price_original: requestDto.unit_price_original,
        //unit_price_inr: requestDto.unit_price_inr,
        purchase_date: requestDto.purchase_date,
        currency_code: requestDto.currency_code,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const item = await this.purchasesRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (item && item.length > 1) {
        return new PurchasesDto(item[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Purchases',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getPurchases(id: string) {
    try {
      const item = await this.purchasesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Purchases not found',
          404,
        );
      }
      return new PurchasesDto(item);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllPurchases() {
    try {
      const items = await this.purchasesRepository.findAll();
      if (!items || items.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Purchases found',
          404,
        );
      }
      return items.map((item) => new PurchasesDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deletePurchases(id: string) {
    try {
      const item = await this.purchasesRepository.findByPk(id);
      if (!item) {
        throw this.errorMessageService.GeneralErrorCore(
          'Purchases not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.purchasesRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Purchases deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Purchases',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
