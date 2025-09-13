/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SellerProvider } from '../provider/seller.provider';
import { SellerService } from '../service/seller.service';
import { SellerController } from '../controller/seller.controller';

@Module({
  imports: [],
  controllers: [SellerController],
  providers: [...SellerProvider, SellerService],
})
export class SellerModule {}
