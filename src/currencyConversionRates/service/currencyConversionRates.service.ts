/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Currencyconversionrates } from '../entity/currencyConversionRates.entity';
import { CurrencyconversionratesRequestDto } from '../dto/currencyConversionRatesRequest.dto';
import { CurrencyconversionratesDto } from '../dto/currencyConversionRates.dto';

@Injectable()
export class CurrencyconversionratesService {
  constructor(
    @Inject('CURRENCY_CONVERSION_RATES_REPOSITORY')
    private readonly currencyconversionratsRepository: typeof Currencyconversionrates,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,
  ) {}

  async createcurrencyconversionrate(
    requestDto: CurrencyconversionratesRequestDto,
  ) {
    try {
      const findCurrencyconversionrate =
        await this.currencyconversionratsRepository.findOne({
          where: {
            country_name: requestDto.country_name,
          },
        });

      if (findCurrencyconversionrate) {
        throw this.errorMessageService.GeneralErrorCore(
          'Currencyconversionrate with this country name already exists',
          200,
        );
      }

      const fields = {
        country_name: requestDto.country_name,
        currency_code: requestDto.currency_code,
        conversion_rate: requestDto.conversion_rate,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const createcurrencyconversionrate =
        await this.currencyconversionratsRepository.create(fields);

      if (createcurrencyconversionrate) {
        return new CurrencyconversionratesDto(createcurrencyconversionrate);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Createcurrencyconversionrate',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateCurrencyconversionrates(
    id: string,
    requestDto: CurrencyconversionratesRequestDto,
  ) {
    try {
      const oldCurrencyconversionrates =
        await this.currencyconversionratsRepository.findByPk(id);

      if (!oldCurrencyconversionrates) {
        throw this.errorMessageService.GeneralErrorCore(
          'Currency conversion rates not found',
          404,
        );
      }

      const findCurrencyconversionrates =
        await this.currencyconversionratsRepository.findOne({
          where: {
            country_name: requestDto.country_name,
            id: { [Op.ne]: id },
          },
        });

      if (findCurrencyconversionrates) {
        throw this.errorMessageService.GeneralErrorCore(
          'Currencyconversionrates with this country name already exists',
          200,
        );
      }

      const fields = {
        country_name: requestDto.country_name,
        currency_code: requestDto.currency_code,
        conversion_rate: requestDto.conversion_rate,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const Currencyconversionrates =
        await this.currencyconversionratsRepository.update(fields, {
          where: { id },
          returning: true,
        });

      if (Currencyconversionrates && Currencyconversionrates.length > 1) {
        return new CurrencyconversionratesDto(Currencyconversionrates[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Currencyconversionrates',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getCurrencyconversionrates(id: string) {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratsRepository.findByPk(id);
      if (!Currencyconversionrates) {
        throw this.errorMessageService.GeneralErrorCore(
          'Currencyconversionrates not found',
          404,
        );
      }
      return new CurrencyconversionratesDto(Currencyconversionrates);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllCurrencyconversionrates() {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratsRepository.findAll();
      if (!Currencyconversionrates || Currencyconversionrates.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Currencyconversionrates found',
          404,
        );
      }
      return Currencyconversionrates.map(
        (Currencyconversionrates) =>
          new CurrencyconversionratesDto(Currencyconversionrates),
      );
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteCurrencyconversionratese(id: string) {
    try {
      const Currencyconversionrates =
        await this.currencyconversionratsRepository.findByPk(id);
      if (!Currencyconversionrates) {
        throw this.errorMessageService.GeneralErrorCore(
          'Currencyconversionrates not found',
          404,
        );
      }

      const deleted = await this.currencyconversionratsRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Currencyconversionrates deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Currencyconversionrates',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
