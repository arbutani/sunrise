/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProductSubcategoryRequestDto {
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  category_id: string;

  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  /*@IsNotEmpty({ message: 'Reference number is required' })
  @IsString({ message: 'Reference number must be a string' })
  reference_number?: string;

  @IsNotEmpty({ message: 'Reference number date is required' })
  @IsString({ message: 'Reference number date must be a string' })
  reference_number_date?: string;*/
}
