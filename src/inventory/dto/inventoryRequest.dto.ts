/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class InventoryRequestDto {
  @IsUUID('4', { message: 'Product id must be a valid UUID' })
  product_id: string;

  @IsNotEmpty({ message: 'Available qty is required' })
  @IsNumber({}, { message: 'Available qty must be a number' })
  available_qty: number;

  @IsNotEmpty({ message: 'Damaged qty is required' })
  @IsNumber({}, { message: 'Damaged qty must be a number' })
  damaged_qty: number;
}
