/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class SalesRequestDto {
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  product_id: string;

  @IsUUID('4', { message: 'Vendor ID must be a valid UUID' })
  seller_id: string;

  @IsUUID('4', { message: 'Currency ID must be a valid UUID' })
  currency_id: string;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @IsNotEmpty({ message: 'Unit price original is required' })
  @IsNumber({}, { message: 'Unit price original must be a number' })
  unit_price_original: number;

  /*@IsNotEmpty({ message: 'Unit price inr is required' })
   @IsNumber({}, { message: 'Unit price inr must be a number' })
   unit_price_inr: number;*/

  @IsNotEmpty({ message: 'Shipping cost original is required' })
  @IsNumber({}, { message: 'Shipping cost original must be a number' })
  shipping_cost_original: number;

  /*@IsNotEmpty({ message: 'Shipping cost inr is required' })
   @IsNumber({}, { message: 'Shipping cost inr must be a number' })
   shipping_cost_inr: number;*/

  @IsNotEmpty({ message: 'Currency code is required' })
  @IsString({ message: 'Currency code must be a string' })
  currency_code: string;

  @IsNotEmpty({ message: 'Sale date is required' })
  @IsDateString({}, { message: 'Sale date must be a valid ISO date string' })
  sale_date: string;
}
