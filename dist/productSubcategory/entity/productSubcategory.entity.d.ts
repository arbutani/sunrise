import { Model } from 'sequelize-typescript';
import { ProductCategories } from 'src/productCategories/entity/productCategories.entity';
import { Products } from 'src/products/entity/products.entity';
export declare class ProductSubcategory extends Model<ProductSubcategory> {
    id: string;
    category_id: string;
    category: ProductCategories;
    name: string;
    description: string;
    reference_number: string;
    reference_number_date: Date;
    createdAt: Date;
    updatedAt: Date;
    products: Products[];
}
