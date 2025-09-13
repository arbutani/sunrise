/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ErrorMessageService } from 'src/shared/services/errormessage.service';
import moment from 'moment';

import { Op } from 'sequelize';
//import { Sequelize } from 'sequelize-typescript';
import { Seller } from '../entity/seller.entity';
import { SellerRequestDto } from '../dto/sellerRequest.dto';

import { SellerDto } from '../dto/seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @Inject('SELLER_REPOSITORY')
    private readonly sellerRepository: typeof Seller,
    private readonly errorMessageService: ErrorMessageService,
    /*@Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
    private readonly errorMessageService: ErrorMessageService,*/
  ) {}

  async createSeller(requestDto: SellerRequestDto) {
    try {
      const findSeller = await this.sellerRepository.findOne({
        where: {
          name: requestDto.name,
          email: requestDto.email,
          mobile: requestDto.mobile,
        },
      });
      if (findSeller) {
        throw this.errorMessageService.GeneralErrorCore(
          'Seller with this email or mobile already exists',
          200,
        );
      }

      const lastSeller = await this.sellerRepository.findOne({
        order: [['createdAt', 'DESC']],
      });

      let nextSeriesNumber = 1;
      if (
        lastSeller &&
        lastSeller.reference_number &&
        lastSeller.reference_number
      ) {
        const match = lastSeller.reference_number.match(/\d+/);
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
      const newReferenceNumber = `SR${nextSeriesNumber}-${dateString}`;
      const fields = {
        name: requestDto.name,
        email: requestDto.email,
        address: requestDto.address,
        mobile: requestDto.mobile,
        reference_number: newReferenceNumber,
        reference_number_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        type: requestDto.type,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const seller = await this.sellerRepository.create(fields);
      if (seller) {
        return new SellerDto(seller);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to create Seller',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async updateSeller(id: string, requestDto: SellerRequestDto) {
    try {
      const oldSeller = await this.sellerRepository.findByPk(id);

      if (!oldSeller) {
        throw this.errorMessageService.GeneralErrorCore(
          'Seller not found',
          404,
        );
      }

      const findSeller = await this.sellerRepository.findOne({
        where: {
          email: requestDto.email,
          mobile: requestDto.mobile,
          id: { [Op.ne]: id },
        },
      });
      if (findSeller) {
        throw this.errorMessageService.GeneralErrorCore(
          'Seller with this catagory already exists',
          200,
        );
      }

      const fields = {
        name: requestDto.name,
        email: requestDto.email,
        address: requestDto.address,
        mobile: requestDto.mobile,
        type: requestDto.type,
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      } as any;

      const seller = await this.sellerRepository.update(fields, {
        where: { id },
        returning: true,
      });
      if (seller && seller.length > 1) {
        return new SellerDto(seller[1][0]);
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to update Seller',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getSeller(id: string) {
    try {
      const seller = await this.sellerRepository.findByPk(id);
      if (!seller) {
        throw this.errorMessageService.GeneralErrorCore(
          'Seller not found',
          404,
        );
      }
      return new SellerDto(seller);
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getAllSellers() {
    try {
      const sellers = await this.sellerRepository.findAll();
      if (!sellers || sellers.length === 0) {
        throw this.errorMessageService.GeneralErrorCore('NO Seller found', 404);
      }
      return sellers.map((seller) => new SellerDto(seller));
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async deleteSeller(id: string) {
    try {
      const seller = await this.sellerRepository.findByPk(id);
      if (!seller) {
        throw this.errorMessageService.GeneralErrorCore(
          'Seller not found',
          404,
        );
      }
      /*await this.itemPriceRepository.destroy({
        where: { item_id: id },
      });*/
      const deleted = await this.sellerRepository.destroy({
        where: { id: id },
      });
      if (deleted) {
        return { message: 'Seller deleted successfully' };
      } else {
        throw this.errorMessageService.GeneralErrorCore(
          'Failed to delete Seller',
          200,
        );
      }
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  /*async queryBuilder(requestDto: any) {
    try {
      const columns = ['name', 'categories', 'price', 'id', 'created_at'];

      let where = '';

      if (requestDto.item_id && requestDto.item_id != '') {
        if (where != '') {
          where += ` AND `;
        }
        where += ` id=${requestDto.item_id} `;
      }

      if (requestDto.search && requestDto.search.value) {
        const search = requestDto.search.value;
        if (search != '') {
          for (const column of requestDto.columns) {
            if (column.searchable != null && column.searchable == 'true') {
              if (where != '') {
                where += ` AND `;
              }
              where += ` ${columns[column.data]} ILIKE '%${search}%' `;
            }
          }
        }
      }

      let query = `SELECT * FROM item`;
      let countQuery = `SELECT COUNT(*) FROM item`;

      if (where != '') {
        query += ` WHERE ${where}`;
        countQuery += ` WHERE ${where}`;
      }

      // orderby
      let orderBy = '';
      if (requestDto.order && requestDto.order.length > 0) {
        for (const order of requestDto.order) {
          if (orderBy != '') {
            orderBy += ',';
          }
          orderBy += `${order.column} ${order.dir}`;
        }
        const order = requestDto.order[0];
        orderBy = `${columns[order.column]} ${order.dir}`;
      }

      if (orderBy == '') {
        orderBy = 'created_at DESC';
      }

      query += ` ORDER BY ${orderBy}`;

      if (requestDto.length && requestDto.start) {
        if (requestDto.length != -1) {
          query += ` LIMIT ${requestDto.length} OFFSET ${requestDto.start}`;
        }
      } else {
        query += ` LIMIT 10 OFFSET 0`;
      }

      return { query: query, count_query: countQuery };
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }

  async getDTItem(requestDto: any) {
    try {
      console.log('Request DTO:', requestDto);

      const { query, count_query } = await this.queryBuilder(requestDto);

      const [count, count_metadata] = await this.sequelize.query(count_query, {
        raw: true,
      });
      const countRows = count as any;

      const [results, metadata] = await this.sequelize.query(query, {
        raw: true,
      });

      const listData = await Promise.all(
        results.map(async (item: any) => {
          let lastPrice = await this.itemPriceRepository.findOne({
            attributes: ['price'],
            where: {
              item_id: item['id'],
            },
          });
          let price = 0;
          if (lastPrice) {
            lastPrice = lastPrice.dataValues ? lastPrice.dataValues : lastPrice;
            price = lastPrice.price;
          }

          item['price'] = price;
          return item;
        }),
      );

      return {
        recordsTotal: Number(
          countRows.length > 0 && countRows[0]['count'] != ''
            ? countRows[0]['count']
            : 0,
        ),
        recordsFiltered: listData.length,
        data: listData,
      };
    } catch (error) {
      throw this.errorMessageService.CatchHandler(error);
    }
  }*/
}
