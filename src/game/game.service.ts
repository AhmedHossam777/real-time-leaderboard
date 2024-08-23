import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
	constructor(@InjectRepository(Game) private gameRepo: Repository<Game>) {}

	async create(createGameDto: CreateGameDto) {
		const game = this.gameRepo.create(createGameDto);

		return await this.gameRepo.save(game);
	}

	async findOne(id: number) {
		return await this.gameRepo.findOneBy({ id });
	}

	async findOneByName(name: string) {
		return await this.gameRepo.findOneBy({ name });
	}

	async update(id: number, updateGameDto: UpdateGameDto) {
		const game = await this.gameRepo.findOneBy({ id });
		if (!game) return new NotFoundException('game not found');
		Object.assign(game, updateGameDto);

		return await this.gameRepo.save(game);
	}

	async remove(id: number) {
		const game = await this.gameRepo.findOneBy({ id });
		if (!game) return new NotFoundException('game not found');
		await this.gameRepo.remove(game);
		return 'game removed';
	}
}