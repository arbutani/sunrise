/* eslint-disable prettier/prettier */
import { ProductSubcategory } from '../entity/productSubcategory.entity';

export const ProductSubcategoryProvider = [
  {
    provide: 'PRODUCT_SUBCATEGORY_REPOSITORY',
    useValue: ProductSubcategory,
  },
];
