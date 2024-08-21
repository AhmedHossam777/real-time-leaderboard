import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
	) {}

	async signup(createUserDto: CreateUserDto): Promise<User> {
		const { email, password } = createUserDto;
		const dupUser = await this.userService.find(email);
		if (dupUser) {
			throw new BadRequestException('user already exist please sign in');
		}

		createUserDto.password = await bcrypt.hash(password, 10);

		return await this.userService.create(createUserDto);
	}
}