/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class VendorRequestDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Contact Info is required' })
  @IsString({ message: 'Contact Info be a string' })
  contact_info: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address be a string' })
  address: string;

  @IsNotEmpty({ message: 'Country is required' })
  @IsString({ message: 'Country be a string' })
  country: string;
}
