/* eslint-disable prettier/prettier */
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ProductCategories } from 'src/productCategories/entity/productCategories.entity';
import { Products } from 'src/products/entity/products.entity';

@Table({
  tableName: 'product_subcategories',
  timestamps: false,
})
export class ProductSubcategory extends Model<ProductSubcategory> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => ProductCategories)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare category_id: string;

  @BelongsTo(() => ProductCategories)
  declare category: ProductCategories;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare reference_number: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare reference_number_date: Date;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    allowNull: false,
  })
  declare updatedAt: Date;

  @HasMany(() => Products)
  products: Products[];
}
