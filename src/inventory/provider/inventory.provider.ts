/* eslint-disable prettier/prettier */
import { Inventory } from '../entity/inventory.entity';

export const InventoryProvider = [
  {
    provide: 'INVENTORY_REPOSITORY',
    useValue: Inventory,
  },
];
