/* eslint-disable prettier/prettier */
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { ProductSubcategory } from 'src/productSubcategory/entity/productSubcategory.entity';

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

  /*@HasMany(() => Purchase)
  declare purchases: Purchase[];

  @HasMany(() => Sale)
  declare sales: Sale[];

  @HasMany(() => ProductDamage)
  declare damages: ProductDamage[];*/
}
