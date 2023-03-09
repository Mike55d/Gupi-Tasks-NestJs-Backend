import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { ColumnsOrder } from './entities/columnsOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Column,ColumnsOrder])],
  controllers: [ColumnsController],
  providers: [ColumnsService]
})
export class ColumnsModule {}
