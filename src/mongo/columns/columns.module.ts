import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Column, ColumnSchema } from '../tasks/schema/column.schema';
import { ColumnsOrder, ColumnsOrderSchema } from './schema/columnOrder.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Column.name, schema: ColumnSchema },
    { name: ColumnsOrder.name, schema: ColumnsOrderSchema },
  ])],
  controllers: [ColumnsController],
  providers: [ColumnsService]
})
export class ColumnsModule {}
