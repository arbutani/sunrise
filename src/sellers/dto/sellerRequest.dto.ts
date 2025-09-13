/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SellerType } from 'src/enum/seller/sellerType';

export class SellerRequestDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Mobile is required' })
  @IsString({ message: 'Mobile must be a string' })
  mobile: string;

  @IsNotEmpty({ message: 'Seller type is required' })
  @IsEnum(SellerType, {
    message: 'Employee type must be one of the allowed values',
  })
  type: string;
}
