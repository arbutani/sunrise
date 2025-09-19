/* eslint-disable prettier/prettier */

import moment from 'moment';
//import * as moment from 'moment';

export class InventoryDto {
  id: string;
  product_id: string;
  available_qty: number;
  damaged_qty: number;
  reference_number: string;
  reference_number_date: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.product_id = data.product_id;
    this.available_qty = data.available_qty;
    this.damaged_qty = data.damaged_qty;
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
