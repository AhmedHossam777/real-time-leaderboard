import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
	private readonly client: Redis;
	constructor() {
		this.client = new Redis();
	}

	async setRefreshToken(userId: number, refreshToken: string) {
		await this.client.set(`${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
	}

	async getRefreshToken(userId: number) {
		return this.client.get(`${userId}`);
	}

	async deleteRefreshToken(userId: number) {
		await this.client.del(`${userId}`);
	}
}