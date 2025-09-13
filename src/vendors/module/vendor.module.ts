/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VendorProvider } from '../provider/vendor.provider';
import { VendorService } from '../service/vendor.service';
import { VendorController } from '../controller/vendors.controller';

@Module({
  imports: [],
  controllers: [VendorController],
  providers: [...VendorProvider, VendorService],
})
export class VendorModule {}
