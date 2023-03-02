import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schema/tasks.schema';
import { Column, ColumnSchema } from './schema/column.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Task.name, schema: TaskSchema },
    { name: Column.name, schema: ColumnSchema },
  ])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
