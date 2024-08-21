import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
	BadRequestException,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'node:process';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
		private userService: UserService,
	) {}

	async generateTokens(userId: number) {
		const payload = { userId };

		const accessToken = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: '15m',
		});

		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.REFRESH_TOKEN_SECRET,
			expiresIn: '7d',
		});

		await this.redisClient.set(
			`refreshToken ${userId}`,
			refreshToken,
			'EX',
			7 * 24 * 60 * 60,
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	async refreshToken(userId: number, refreshToken: string) {
		const storedToken = await this.redisClient.get(`refreshToken ${userId}`);
		if (!storedToken || storedToken !== refreshToken) {
			throw new UnauthorizedException('invalid refresh token');
		}

		try {
			await this.jwtService.verify(refreshToken, {
				secret: process.env.REFRESH_TOKEN_SECRET,
			});
		} catch (e) {
			throw new UnauthorizedException('invalid refresh token');
		}

		return this.generateTokens(userId);
	}

	async signup(email: string, password: string) {
		const users = await this.userService.find(email);
		if (users.length !== 0) {
			throw new BadRequestException('user already exist please sign in');
		}

		const salt = randomBytes(8).toString('hex');

		let hash: Buffer;
		try {
			hash = (await scrypt(password, salt, 32)) as Buffer;
		} catch (e) {
			throw new Error('Error while hashing the password');
		}

		const result = salt + '.' + hash.toString('hex');

		const createUserDto = new CreateUserDto();
		createUserDto.email = email;
		createUserDto.password = result;

		const user = await this.userService.create(createUserDto);

		const { accessToken, refreshToken } = await this.generateTokens(user.id);

		return { user, accessToken, refreshToken };
	}
}