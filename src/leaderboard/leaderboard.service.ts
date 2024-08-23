import { Injectable } from '@nestjs/common';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class LeaderboardService {
	constructor(private readonly redisService: RedisService) {}
	async getHighestScores() {
		return await this.redisService.getAllLeaderboardHighest();
	}
}