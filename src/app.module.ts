import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.xdiex.mongodb.net/?retryWrites=true&w=majority'),
    ColumnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
