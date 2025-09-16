/* eslint-disable prettier/prettier */
import { Purchases } from '../entity/purchases.entity';

export const PurchasesProvider = [
  {
    provide: 'PURCHASES_REPOSITORY',
    useValue: Purchases,
  },
];
