/* eslint-disable prettier/prettier */

import { Seller } from '../entity/seller.entity';

export const SellerProvider = [
  {
    provide: 'SELLER_REPOSITORY',
    useValue: Seller,
  },
];
