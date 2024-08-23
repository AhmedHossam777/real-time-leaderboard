import { Injectable } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';

@Injectable()
export class LeaderboardService {
	constructor(private readonly redisService: RedisService) {}
	async getHighestScores() {
		return await this.redisService.getAllLeaderboardHighest();
	}

	async getLeaderboard(gameName: string) {
		return await this.redisService.getLeaderboard(gameName);
	}
}