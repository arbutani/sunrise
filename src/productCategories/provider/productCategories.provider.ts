/* eslint-disable prettier/prettier */
import { ProductCategories } from '../entity/productCategories.entity';

export const ProductCategoriesProvider = [
  {
    provide: 'PRODUCT_CATEGORIES_REPOSITORY',
    useValue: ProductCategories,
  },
];
