import { Model } from 'sequelize-typescript';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
export declare class ProductCategories extends Model<ProductCategories> {
    id: string;
    name: string;
    description: string;
    subcategories: ProductSubcategory[];
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
}
