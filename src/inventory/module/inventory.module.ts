/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InventoryProvider } from '../provider/inventory.provider';
import { InventoryService } from '../service/inventory.service';
import { InventoryController } from '../controller/inventory.controller';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [...InventoryProvider, InventoryService],
})
export class InventoryModule {}
