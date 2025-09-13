import { Model } from 'sequelize-typescript';
export declare class Seller extends Model<Seller> {
    id: string;
    name: string;
    email: string;
    address: string;
    mobile: string;
    reference_number: string;
    reference_number_date: Date;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}
