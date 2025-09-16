/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductsRequestDto {
  @IsUUID('4', { message: 'Subcategory_id ID must be a valid UUID' })
  subcategory_id: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Categories is required' })
  @IsString({ message: 'Categories must be a string' })
  description: string;
}
