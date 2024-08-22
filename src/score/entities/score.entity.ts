import {
	Entity,
	Column,
	ManyToOne,
	CreateDateColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Score {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	score: number;

	@ManyToOne(() => User, (user) => user.scores)
	user: User;

	@ManyToOne(() => Game, (game) => game.scores)
	game: Game;

	@CreateDateColumn()
	createdAt: Date;
}