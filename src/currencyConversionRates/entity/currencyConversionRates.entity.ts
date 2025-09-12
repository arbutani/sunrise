/* eslint-disable prettier/prettier */
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'currency_conversion_rates',
  timestamps: false,
})
export class Currencyconversionrates extends Model<Currencyconversionrates> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare country_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare currency_code: string;

  @Column({
    type: DataType.NUMBER,
  })
  declare conversion_rate: number;

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
