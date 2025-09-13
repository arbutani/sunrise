import { Model } from 'sequelize-typescript';
export declare class Vendor extends Model<Vendor> {
    id: string;
    name: string;
    contact_info: string;
    address: string;
    country: string;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
