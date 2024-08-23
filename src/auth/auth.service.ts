import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
	) {}

	async generateTokens(userId: number) {
		const payload = { userId };
		const accessToken = this.jwtService.sign(payload, {
			expiresIn: process.env.ACCESSTOKEN_LIFETIME,
			secret: process.env.JWT_SECRET,
		});

		const refreshToken = this.jwtService.sign(payload, {
			expiresIn: process.env.REFRESHTOKEN_LIFETIME,
			secret: process.env.REFRESH_TOKEN_SECRET,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

	async signup(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto;
		const dupUser = await this.userService.find(email);
		if (dupUser) {
			throw new BadRequestException('user already exist please sign in');
		}

		createUserDto.password = await bcrypt.hash(password, 10);
		const user = await this.userService.create(createUserDto);

		const { accessToken, refreshToken } = await this.generateTokens(user.id);

		await this.redisService.setRefreshToken(user.id, refreshToken);

		return {
			user,
			accessToken,
			refreshToken,
		};
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;
		const user = await this.userService.find(email);
		if (!user) {
			throw new UnauthorizedException('Wrong email or password');
		}

		const correctPassword = await bcrypt.compare(password, user.password);
		if (!correctPassword) {
			throw new UnauthorizedException('Wrong email or password');
		}

		const { accessToken, refreshToken } = await this.generateTokens(user.id);

		await this.redisService.setRefreshToken(user.id, refreshToken);

		return {
			accessToken,
			refreshToken,
		};
	}

	async refreshToken(refreshToken: string) {
		const payload = this.jwtService.verify(refreshToken, {
			secret: process.env.REFRESH_TOKEN_SECRET,
		});
		const storedToken = await this.redisService.getRefreshToken(payload.userId);

		if (storedToken !== refreshToken) {
			throw new UnauthorizedException('invalid refresh token');
		}

		const { accessToken } = await this.generateTokens(payload.userId);

		return { accessToken };
	}

	async signout(userId: number) {
		console.log(userId);
		await this.redisService.deleteRefreshToken(userId);
		return 'signout success';
	}
}