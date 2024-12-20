import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Injectable()
export class TournamentService {
	constructor(
		@InjectRepository(Tournament)
		private readonly tournamentRepo: Repository<Tournament>,
	) {}

	async create(createTournamentDto: CreateTournamentDto) {
		const tournament = this.tournamentRepo.create(createTournamentDto);
		return await this.tournamentRepo.save(tournament);
	}

	async join(tournamentId: number, userId: number) {
		const tournament = await this.tournamentRepo.findOne({
			where: { id: tournamentId },
			relations: ['participants'],
		});

		if (!tournament) {
			throw new NotFoundException('Tournament not found');
		}

		if (tournament.participants.length >= tournament.maxParticipants) {
			throw new Error('Tournament is full');
		}

		tournament.participants.push({ id: userId } as any);
		return await this.tournamentRepo.save(tournament);
	}
}
