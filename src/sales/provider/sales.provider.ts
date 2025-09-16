/* eslint-disable prettier/prettier */
import { Sales } from '../entity/sales.entity';

export const SalesProvider = [
  {
    provide: 'SALES_REPOSITORY',
    useValue: Sales,
  },
];
