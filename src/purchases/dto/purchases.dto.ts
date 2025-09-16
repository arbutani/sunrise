/* eslint-disable prettier/prettier */

import moment from 'moment';
//import * as moment from 'moment';

export class PurchasesDto {
  id: string;
  product_id: string;
  vendor_id: string;
  currency_id: string;
  quantity: number;
  unit_price_original: number;
  unit_price_inr: number;
  currency_code: string;
  purchase_date: string;
  reference_number: string;
  reference_number_date: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.product_id = data.product_id;
    this.vendor_id = data.vendor_id;
    this.currency_id = data.currency_id;
    this.quantity = data.quantity;
    this.unit_price_original = data.unit_price_original;
    this.unit_price_inr = data.unit_price_inr;
    this.currency_code = data.currency_code;
    this.purchase_date = data.purchase_date;
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
