import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import * as process from 'node:process';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
	) {}

	async signup(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto;
		const dupUser = await this.userService.find(email);
		if (dupUser.length !== 0) {
			throw new BadRequestException('user already exist please sign in');
		}

		createUserDto.password = await bcrypt.hash(password, 10);
		const user = await this.userService.create(createUserDto);

		const payload = { userId: user.id };
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: process.env.ACCESSTOKEN_LIFETIME,
			secret: process.env.JWT_SECRET,
		});

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: process.env.REFRESHTOKEN_LIFETIME,
			secret: process.env.REFRESH_TOKEN_SECRET,
		});

		await this.redisService.setRefreshToken(user.id, refreshToken);

		return {
			user,
			accessToken,
			refreshToken,
		};
	}
}