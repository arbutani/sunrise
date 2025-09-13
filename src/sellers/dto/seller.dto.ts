/* eslint-disable prettier/prettier */

import moment from 'moment';
//import * as moment from 'moment';

export class SellerDto {
  id: string;
  name: string;
  email: string;
  address: string;
  mobile: string;
  type: any;
  createdAt: string;
  updatedAt: string;
  reference_number: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.name = data.name;
    this.reference_number = data.reference_number;
    this.email = data.email;
    this.address = data.address;
    this.mobile = data.mobile;
    this.type = data.type;
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
