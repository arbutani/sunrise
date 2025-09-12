import { Model } from 'sequelize-typescript';
export declare class Currencyconversionrates extends Model<Currencyconversionrates> {
    id: string;
    country_name: string;
    currency_code: string;
    conversion_rate: number;
    createdAt: Date;
    updatedAt: Date;
}
