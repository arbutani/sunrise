/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductCategoriesProvider } from '../provider/productCategories.provider';
import { ProductCategoriesService } from '../service/productCategories.service';
import { ProductCategoriesController } from '../controller/productCategories.controller';

@Module({
  imports: [],
  controllers: [ProductCategoriesController],
  providers: [...ProductCategoriesProvider, ProductCategoriesService],
})
export class ProductCategoriesModule {}
