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
  tableName: 'inventory',
  timestamps: false,
})
export class Inventory extends Model<Inventory> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
    field: 'product_id',
  })
  declare product_id: string;

  @BelongsTo(() => Products, { foreignKey: 'product_id' })
  declare product?: Products;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare available_qty: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare damaged_qty: number;

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
