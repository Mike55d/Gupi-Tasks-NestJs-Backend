import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "mySecretKey",
      signOptions: { expiresIn: '6h' },
    }),
  ],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
