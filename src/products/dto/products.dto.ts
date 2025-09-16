/* eslint-disable prettier/prettier */

import moment from 'moment';
//import * as moment from 'moment';

export class ProductsDto {
  id: string;
  subcategory_id: string;
  name: string;
  description: string;
  reference_number: string;
  reference_number_date: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.subcategory_id = data.subcategory_id;
    this.name = data.name;
    this.description = data.description;
    this.reference_number = data.reference_number;
    this.reference_number_date = data.reference_number_date;
    const createdAt = data.createdAt
      ? data.createdAt
      : data.created_at
        ? data.created_at
        : '';
    const updatedAt = data.updatedAt
      ? data.updatedAt
      : data.updated_at
        ? data.updated_at
        : '';
    if (createdAt) {
      this.createdAt = moment(createdAt, 'YYYY-MM-DD HH:mm:ss').format(
        'DD-MM-YYYY hh:mm A',
      );
    }
    if (updatedAt) {
      this.updatedAt = moment(updatedAt, 'YYYY-MM-DD HH:mm:ss').format(
        'DD-MM-YYYY hh:mm A',
      );
    }
  }
}
