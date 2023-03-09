import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Column } from 'src/columns/entities/column.entity';
import { ColumnsOrder } from 'src/columns/entities/columnsOrder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Column,ColumnsOrder])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
