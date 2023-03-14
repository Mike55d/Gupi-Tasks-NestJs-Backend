import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from "bcrypt";
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(userObject: RegisterUserDto) {
        const { password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = { ...userObject, password: plainToHash };
        const user = this.usersRepository.create(userObject)
        return await this.usersRepository.save(user);
    }

    async login(userObject: RegisterUserDto) {
        const { email, password } = userObject;
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) throw new HttpException('User not found', 404);
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) throw new HttpException('password incorrect', 403);
        const payload = { email }
        const token = this.jwtService.sign(payload);
        const data = { user, token }
        return data;

    }
}
