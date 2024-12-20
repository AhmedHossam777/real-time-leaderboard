import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RedisService } from '../redis/redis.service';
import { FriendRequest } from './entities/friend-request.entity';
import { Message } from './entities/message.entity';
import { BadRequestException } from 'src/common/exceptions/application.exceptions';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(FriendRequest)
		private readonly friendRequestRepo: Repository<FriendRequest>,
		@InjectRepository(Message)
		private readonly messageRepo: Repository<Message>,
		private readonly RedisService: RedisService,
	) {}

	async create(createUserDto: CreateUserDto) {
		const user = this.userRepo.create(createUserDto);
		return await this.userRepo.save(user);
	}

	findOne(id: number) {
		if (!id) throw new NotFoundException('please provide id');
		return this.userRepo.findOneBy({ id });
	}

	async find(email: string) {
		const users = await this.userRepo.find({ where: { email } });
		return users[0];
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.userRepo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		Object.assign(user, updateUserDto);
		return await this.userRepo.save(user);
	}

	async remove(id: number) {
		const user = await this.userRepo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		await this.userRepo.remove(user);
		return 'user removed';
	}

	async getRanking(gameName: string, username: string) {
		const leaderboardKey = `leaderboard:game: ${gameName}`;
		console.log('leaderboardKey:', leaderboardKey);
		console.log('username:', username);

		const rank = await this.RedisService.getRanking(
			leaderboardKey,
			`user:${username}`,
		);

		console.log(rank);

		console.log('Rank:', rank);
		return rank;
	}

	async getTopPlayers(gameName: string) {
		const leaderboardKey = `leaderboard:game: ${gameName}`;
		const leaderboard = await this.RedisService.getLeaderboard(leaderboardKey);
		console.log(leaderboard);
		return leaderboard.map((player, index) => {
			return {
				rank: index + 1,
				username: player[0].split(':')[1],
				score: player[1],
			};
		});
	}

	async sendFriendRequest(senderId: number, receiverId: number) {
		// Check if request already exists
		const existingRequest = await this.friendRequestRepo.findOne({
			where: [
				{ sender: { id: senderId }, receiver: { id: receiverId } },
				{ sender: { id: receiverId }, receiver: { id: senderId } },
			],
			relations: ['sender', 'receiver'],
		});

		if (existingRequest) {
			throw new BadRequestException('Friend request already exists');
		}

		const request = this.friendRequestRepo.create({
			sender: { id: senderId },
			receiver: { id: receiverId },
		});

		return await this.friendRequestRepo.save(request);
	}

	async handleFriendRequest(
		requestId: number,
		status: 'accepted' | 'rejected',
	) {
		const request = await this.friendRequestRepo.findOne({
			where: { id: requestId },
			relations: ['sender', 'receiver'],
		});

		if (!request) {
			throw new NotFoundException('Friend request not found');
		}

		request.status = status;
		await this.friendRequestRepo.save(request);

		if (status === 'accepted') {
			const sender = await this.userRepo.findOne({
				where: { id: request.sender.id },
				relations: ['friends'],
			});
			const receiver = await this.userRepo.findOne({
				where: { id: request.receiver.id },
				relations: ['friends'],
			});

			sender.friends.push(receiver);
			receiver.friends.push(sender);

			await this.userRepo.save(sender);
			await this.userRepo.save(receiver);
		}

		return request;
	}

	async getFriends(userId: number) {
		const user = await this.userRepo.findOne({
			where: { id: userId },
			relations: ['friends'],
		});

		return user.friends;
	}

	async getPendingFriendRequests(userId: number) {
		return await this.friendRequestRepo.find({
			where: {
				receiver: { id: userId },
				status: 'pending',
			},
			relations: ['sender'],
		});
	}

	async sendMessage(senderId: number, receiverId: number, content: string) {
		const message = this.messageRepo.create({
			sender: { id: senderId },
			receiver: { id: receiverId },
			content,
		});

		return await this.messageRepo.save(message);
	}

	async getMessages(userId: number, friendId: number) {
		return await this.messageRepo.find({
			where: [
				{ sender: { id: userId }, receiver: { id: friendId } },
				{ sender: { id: friendId }, receiver: { id: userId } },
			],
			relations: ['sender', 'receiver'],
			order: { sentAt: 'DESC' },
		});
	}

	async markMessagesAsRead(userId: number, friendId: number) {
		await this.messageRepo.update(
			{
				receiver: { id: userId },
				sender: { id: friendId },
				read: false,
			},
			{ read: true },
		);
	}

	async getUnreadMessageCount(userId: number) {
		return await this.messageRepo.count({
			where: {
				receiver: { id: userId },
				read: false,
			},
		});
	}
}
