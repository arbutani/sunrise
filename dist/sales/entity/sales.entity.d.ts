import { Model } from 'sequelize-typescript';
import { Currencyconversionrates } from 'src/currencyConversionRates/entity/currencyConversionRates.entity';
import { Products } from 'src/products/entity/products.entity';
import { Seller } from 'src/sellers/entity/seller.entity';
export declare class Sales extends Model<Sales> {
    id: string;
    product_id: string;
    products: Products;
    seller_id: string;
    Seller: Seller;
    currency_id: string;
    currency: Currencyconversionrates;
    quantity: number;
    unit_price_original: number;
    unit_price_inr: number;
    shipping_cost_original: number;
    shipping_cost_inr: number;
    currency_code: string;
    sale_date: string;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
