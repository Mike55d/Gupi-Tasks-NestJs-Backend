import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoModule } from './mongo/app.module';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_ATLAS_DB),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MongoModule,
    TasksModule,
    ColumnsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
