/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsProvider } from '../provider/products.provider';
import { ProductsService } from '../service/products.service';
import { ProductsController } from '../controller/products.controller';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [...ProductsProvider, ProductsService],
  exports: [...ProductsProvider],
})
export class ProductsModule {}
