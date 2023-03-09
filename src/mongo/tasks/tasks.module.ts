import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/tasks.schema';
import { Column, ColumnSchema } from './schema/column.schema';
import { ColumnsOrder, ColumnsOrderSchema } from '../columns/schema/columnOrder.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Task.name, schema: TaskSchema },
    { name: Column.name, schema: ColumnSchema },
    { name: ColumnsOrder.name, schema: ColumnsOrderSchema },
  ])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
