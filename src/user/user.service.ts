import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private repo: Repository<User>,
		private redisService: RedisService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = this.repo.create(createUserDto);
		return await this.repo.save(user);
	}

	findOne(id: number) {
		if (!id) throw new NotFoundException('please provide id');
		return this.repo.findOneBy({ id });
	}

	async find(email: string) {
		const users = await this.repo.find({ where: { email } });
		return users[0];
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.repo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		Object.assign(user, updateUserDto);
		return await this.repo.save(user);
	}

	async remove(id: number) {
		const user = await this.repo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		await this.repo.remove(user);
		return 'user removed';
	}

	async getRanking(gameName: string, username: string) {
		const leaderboardKey = `leaderboard:game: ${gameName}`;
		console.log('leaderboardKey:', leaderboardKey);
		console.log('username:', username);

		const rank = await this.redisService.getRanking(
			leaderboardKey,
			`user:${username}`,
		);

		console.log(rank);

		console.log('Rank:', rank);
		return rank;
	}

	async getTopPlayers(gameName: string) {
		const leaderboardKey = `leaderboard:game: ${gameName}`;
		const leaderboard = await this.redisService.getLeaderboard(leaderboardKey);
		console.log(leaderboard);
		return leaderboard.map((player, index) => {
			return {
				rank: index + 1,
				username: player[0].split(':')[1],
				score: player[1],
			};
		});
	}
}
