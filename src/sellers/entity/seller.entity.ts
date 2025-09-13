/* eslint-disable prettier/prettier */
import {
  Column,
  CreatedAt,
  DataType,
  //HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SellerType } from 'src/enum/seller/sellerType';

@Table({
  tableName: 'sellers',
  timestamps: false,
})
export class Seller extends Model<Seller> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mobile: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare reference_number: string;

  @Column({
    type: DataType.DATEONLY,
  })
  declare reference_number_date: Date;

  @Column({
    type: DataType.ENUM(SellerType.ONLINE, SellerType.OFFLINE),
  })
  declare type: string;

  /*@HasMany(() => Sale)
  sales: Sale[];*/

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
