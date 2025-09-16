/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SalesProvider } from '../provider/sales.provider';
import { SalesService } from '../service/sales.service';
import { SalesController } from '../controller/sales.controller';

@Module({
  imports: [],
  controllers: [SalesController],
  providers: [...SalesProvider, SalesService],
})
export class SalesModule {}
