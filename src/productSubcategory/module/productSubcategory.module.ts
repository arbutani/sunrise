/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductSubcategoryProvider } from '../provider/productSubcategory.provider';
import { ProductSubcategoryService } from '../service/productSubcategory.service';
import { ProductSubcategoryController } from '../controller/productSubcategory.controller';
import { ProductsModule } from 'src/products/module/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ProductSubcategoryController],
  providers: [...ProductSubcategoryProvider, ProductSubcategoryService],
  exports: [...ProductSubcategoryProvider],
})
export class ProductSubcategoryModule {}
