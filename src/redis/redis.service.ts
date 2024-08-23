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

	async addScore(
		leaderboardKey: string,
		scoreValue: number,
		scoreMember: string,
	) {
		return this.client.zadd(leaderboardKey, scoreValue, scoreMember);
	}

	async getAllKeys() {
		return this.client.keys('leaderboard:game:*');
		// leaderboard:game:valorant
	}

	async getHighestScore(leaderboardKey: string) {
		return this.client.zrevrange(leaderboardKey, 0, 0, 'WITHSCORES');
	}

	async getAllLeaderboardHighest() {
		const keys = await this.getAllKeys();
		const leaderboard = [];
		for (const key of keys) {
			const [game] = key.split(':').slice(-1);
			const [user, score] = await this.getHighestScore(key);
			leaderboard.push({ game, user, score });
		}
		return leaderboard;
	}

	async getRanking(leaderboardKey: string, member: string) {
		const rank = await this.client.zrevrank(leaderboardKey, member);
		return rank + 1;
	}

	async getLeaderboard(gameName: string) {
		const leaderboardKey = `leaderboard:game: ${gameName}`;
		return this.client.zrevrange(leaderboardKey, 0, -1, 'WITHSCORES');
	}
}