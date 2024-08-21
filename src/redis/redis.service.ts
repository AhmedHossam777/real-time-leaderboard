import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
	private readonly client: Redis;
	constructor() {
		this.client = new Redis();
	}

	async setRefreshToken(userId: string, refreshToken: string) {
		await this.client.set(
			`refreshToken: ${userId}`,
			refreshToken,
			'EX',
			7 * 24 * 60 * 60,
		);
	}

	async getRefreshToken(userId: string) {
		return this.client.get(`refreshToken: ${userId}`);
	}

	async deleteRefreshToken(userId: string) {
		await this.client.del(`refreshToken: ${userId}`);
	}
}