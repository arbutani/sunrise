/* eslint-disable prettier/prettier */

import moment from 'moment';
//import * as moment from 'moment';
import { ref } from 'process';

export class VendorDto {
  id: string;
  name: string;
  contact_info: string;
  address: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  reference_number: string;

  constructor(data: any) {
    data = data.dataValues ? data.dataValues : data;
    this.id = data.id;
    this.reference_number = data.reference_number;
    this.name = data.name;
    this.contact_info = data.contact_info;
    this.address = data.address;
    this.country = data.country;
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
