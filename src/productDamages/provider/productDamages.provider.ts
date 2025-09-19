/* eslint-disable prettier/prettier */
import { ProductDamages } from '../entity/productDamages.entity';

export const ProductDamagesProvider = [
  {
    provide: 'PRODUCT_DAMAGES_REPOSITORY',
    useValue: ProductDamages,
  },
];
