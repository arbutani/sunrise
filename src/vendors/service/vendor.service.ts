/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';
import { VendorDto } from '../dto/vendor.dto';
import { Op } from 'sequelize';
//import { Sequelize } from 'sequelize-typescript';
import { Vendor } from '../entity/vendor.entity';
import { VendorRequestDto } from '../dto/vendorRequest.dto';

@Injectable()
export class VendorService {
  constructor(
    @Inject('VENDOR_REPOSITORY')
    private readonly vendorRepository: typeof Vendor,
    private readonly errorMessageService: ErrorMessageService,

    /*@Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,*/
  ) {}

  async createVendor(requestDto: VendorRequestDto) {
    try {
      const findVendor = await this.vendorRepository.findOne({
        where: {
          name: requestDto.name,
          contact_info: requestDto.contact_info,
        },
      });
      if (findVendor) {
        throw this.errorMessageService.GeneralErrorCore(
          'Vendor already exists',
          200,
        );
      }

      const lastVendors = await this.vendorRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (lastVendors && lastVendors.reference_number) {
        const match = lastVendors.reference_number.match(/\d+/);
        if (match) {
          const lastSeriesNumber = parseInt(match[0], 10);
          if (!isNaN(lastSeriesNumber)) {
            nextSeriesNumber = lastSeriesNumber + 1;
          }
        }
      }
      const dateString = moment().format('DDMMYY');

      const newReferenceNumber = `V${nextSeriesNumber}-${dateString}`;

      const fields = {
        name: requestDto.name,
        contact_info: requestDto.contact_info,
        address: requestDto.address,
        country: requestDto.country,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const vendor = await this.vendorRepository.create(fields);
      if (vendor) {
        return new VendorDto(vendor);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Vendors',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateVendor(id: string, requestDto: VendorRequestDto) {
    try {
      const oldVendor = await this.vendorRepository.findByPk(id);

      if (!oldVendor) {
        throw this.errorMessageService.GeneralErrorCore(
          'Vendor not found',
          404,
        );
      }

      const findVendor = await this.vendorRepository.findOne({
        where: {
          name: requestDto.name,
          contact_info: requestDto.contact_info,
          id: { [Op.ne]: id },
        },
      });
      if (findVendor) {
        throw this.errorMessageService.GeneralErrorCore(
          'Vendor already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        contact_info: requestDto.contact_info,
        address: requestDto.address,
        country: requestDto.country,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const vendor = await this.vendorRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (vendor && vendor.length > 1) {
        return new VendorDto(vendor[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update vendor',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getVendor(id: string) {
    try {
      const vendor = await this.vendorRepository.findByPk(id);
      if (!vendor) {
        throw this.errorMessageService.GeneralErrorCore(
          'Vendor not found',
          404,
        );
      }
      return new VendorDto(vendor);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllVendors() {
    try {
      const vendors = await this.vendorRepository.findAll();
      if (!vendors || vendors.length === 0) {
        throw this.errorMessageService.GeneralErrorCore(
          'NO Vendors found',
          404,
        );
      }
      return vendors.map((item) => new VendorDto(item));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteVendor(id: string) {
    try {
      const vendor = await this.vendorRepository.findByPk(id);
      if (!vendor) {
        throw this.errorMessageService.GeneralErrorCore(
          'Vendor not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.vendorRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Vendor deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Vendor',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }
}
