/* eslint-disable prettier/prettier */
import { Vendor } from '../entity/vendor.entity';

export const VendorProvider = [
  {
    provide: 'VENDOR_REPOSITORY',
    useValue: Vendor,
  },
];
