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
import { Currencyconversionrates } from 'src/currencyConversionRates/entity/currencyConversionRates.entity';
import { Products } from 'src/products/entity/products.entity';
import { Vendor } from 'src/vendors/entity/vendor.entity';

@Table({
  tableName: 'purchases',
  timestamps: false,
})
export class Purchases extends Model<Purchases> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Products)
  @Column({ type: DataType.UUID })
  declare product_id: string;

  @BelongsTo(() => Products)
  declare products: Products;

  @ForeignKey(() => Vendor)
  @Column({ type: DataType.UUID })
  declare vendor_id: string;

  @BelongsTo(() => Vendor)
  declare vendor: Vendor;

  @ForeignKey(() => Currencyconversionrates)
  @Column({ type: DataType.UUID })
  declare currency_id: string;

  @BelongsTo(() => Currencyconversionrates)
  declare currency: Currencyconversionrates;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare unit_price_original: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  declare unit_price_inr: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare currency_code: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare purchase_date: string;

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
