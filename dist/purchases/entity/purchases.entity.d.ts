import { Model } from 'sequelize-typescript';
import { Currencyconversionrates } from 'src/currencyConversionRates/entity/currencyConversionRates.entity';
import { Products } from 'src/products/entity/products.entity';
import { Vendor } from 'src/vendors/entity/vendor.entity';
export declare class Purchases extends Model<Purchases> {
    id: string;
    product_id: string;
    products: Products;
    vendor_id: string;
    vendor: Vendor;
    currency_id: string;
    currency: Currencyconversionrates;
    quantity: number;
    unit_price_original: number;
    unit_price_inr: number;
    currency_code: string;
    purchase_date: string;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
