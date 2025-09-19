/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductDamagesProvider } from '../provider/productDamages.provider';
import { ProductDamagesService } from '../service/productDamages.service';
import { ProductDamagesController } from '../controller/productDamages.controller';

@Module({
  imports: [],
  controllers: [ProductDamagesController],
  providers: [...ProductDamagesProvider, ProductDamagesService],
})
export class ProductDamagesModule {}
