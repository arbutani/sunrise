/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductSubcategoryProvider } from '../provider/productSubcategory.provider';
import { ProductSubcategoryService } from '../service/productSubcategory.service';
import { ProductSubcategoryController } from '../controller/productSubcategory.controller';

@Module({
  imports: [],
  controllers: [ProductSubcategoryController],
  providers: [...ProductSubcategoryProvider, ProductSubcategoryService],
})
export class ProductSubcategoryModule {}
