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
import { Products } from 'src/products/entity/products.entity';

@Table({
  tableName: 'product_damages',
  timestamps: false,
})
export class ProductDamages extends Model<ProductDamages> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Products)
  @Column({ type: DataType.UUID, allowNull: false, field: 'product_id' })
  declare product_id: string;

  @BelongsTo(() => Products, { foreignKey: 'product_id' })
  declare product?: Products;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare damage_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare remarks: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare quantity: number;

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
}
