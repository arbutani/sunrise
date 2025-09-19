/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductDamagesRequestDto {
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  product_id: string;

  @IsNotEmpty({ message: 'Damage type is required' })
  @IsString({ message: 'Damage type must be a string' })
  damage_type: string;

  @IsNotEmpty({ message: 'Remarks is required' })
  @IsString({ message: 'Remarks must be a string' })
  remarks: string;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  /*@IsNotEmpty({ message: 'Reference number is required' })
  @IsString({ message: 'Reference number must be a string' })
  reference_number?: string;

  @IsNotEmpty({ message: 'Reference number date is required' })
  @IsString({ message: 'Reference number date must be a string' })
  reference_number_date?: string;*/
}
