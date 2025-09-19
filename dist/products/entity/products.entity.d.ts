import { Model } from 'sequelize-typescript';
import { ProductDamages } from 'src/productDamages/entity/productDamages.entity';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
import { Purchases } from 'src/purchases/entity/purchases.entity';
import { Sales } from 'src/sales/entity/sales.entity';
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
    purchases: Purchases[];
    sales: Sales[];
    damages: ProductDamages[];
}
