import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Leaderboard {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	gameId: number;

	@Column('json')
	data: any;

	@ManyToOne(() => Game)
	game: Game;

	@CreateDateColumn()
	snapshotDate: Date;
}