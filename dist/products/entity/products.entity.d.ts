import { Model } from 'sequelize-typescript';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
export declare class Products extends Model<Products> {
    id: string;
    subcategory_id: string;
    subcategory: ProductSubcategory;
    name: string;
    description: string;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
