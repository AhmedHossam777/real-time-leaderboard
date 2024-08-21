import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import Redis from 'ioredis';
import * as process from 'node:process';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
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
}