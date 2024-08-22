import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	ManyToOne,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { User } from '../../user/entities/user.entity';
import { Score } from '../../score/entities/score.entity';

@Entity()
export class Leaderboard {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	gameId: number;

	@ManyToOne(() => Game)
	game: Game;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@ManyToOne(() => Score)
	score: Score;

	@CreateDateColumn()
	snapshotDate: Date;
}