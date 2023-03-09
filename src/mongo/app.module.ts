import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';


@Module({
  imports: [
    TasksModule,
    ColumnsModule,
  ],
})
export class MongoModule { }
