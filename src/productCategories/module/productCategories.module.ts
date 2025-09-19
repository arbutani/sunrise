/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductCategoriesProvider } from '../provider/productCategories.provider';
import { ProductCategoriesService } from '../service/productCategories.service';
import { ProductCategoriesController } from '../controller/productCategories.controller';
import { ProductSubcategoryModule } from 'src/productSubcategory/module/productSubcategory.module';
import { ProductsModule } from 'src/products/module/products.module';

@Module({
  imports: [ProductSubcategoryModule, ProductsModule],
  controllers: [ProductCategoriesController],
  providers: [...ProductCategoriesProvider, ProductCategoriesService],
})
export class ProductCategoriesModule {}
