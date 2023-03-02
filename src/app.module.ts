import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/gupitasks')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
