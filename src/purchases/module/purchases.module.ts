/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PurchasesProvider } from '../provider/purchases.provider';
import { PurchasesService } from '../service/purchases.service';
import { PurchasesController } from '../controller/purchases.controller';

@Module({
  imports: [],
  controllers: [PurchasesController],
  providers: [...PurchasesProvider, PurchasesService],
})
export class PurchasesModule {}
