/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductsRequestDto } from 'src/products/dto/productsRequest.dto';

export class ProductSubcategoryRequestDto {
  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  category_id: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductsRequestDto)
  products?: ProductsRequestDto[];
}
