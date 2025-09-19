import { Model } from 'sequelize-typescript';
import { Products } from 'src/products/entity/products.entity';
export declare class ProductDamages extends Model<ProductDamages> {
    id: string;
    product_id: string;
    product?: Products;
    damage_type: string;
    remarks: string;
    quantity: number;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
