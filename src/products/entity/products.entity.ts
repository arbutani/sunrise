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
import { ProductDamages } from 'src/productDamages/entity/productDamages.entity';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';
import { Purchases } from 'src/purchases/entity/purchases.entity';
import { Sales } from 'src/sales/entity/sales.entity';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Products extends Model<Products> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => ProductSubcategory)
  @Column({ type: DataType.UUID, allowNull: false })
  declare subcategory_id: string;

  @BelongsTo(() => ProductSubcategory)
  declare subcategory: ProductSubcategory;

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

  @HasMany(() => Purchases)
  declare purchases: Purchases[];

  @HasMany(() => Sales)
  declare sales: Sales[];

  @HasMany(() => ProductDamages)
  declare damages: ProductDamages[];
}
