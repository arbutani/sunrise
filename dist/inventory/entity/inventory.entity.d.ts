import { Model } from 'sequelize-typescript';
import { Products } from 'src/products/entity/products.entity';
export declare class Inventory extends Model<Inventory> {
    id: string;
    product_id: string;
    product?: Products;
    available_qty: number;
    damaged_qty: number;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
