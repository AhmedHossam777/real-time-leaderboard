import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { Score } from '../../score/entities/score.entity';
import { Leaderboard } from '../../leaderboard/entities/leaderboard.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({default: false})
	admin : boolean

	@OneToMany(() => Score, (score) => score.user)
	scores: Score[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Leaderboard, (leaderboard) => leaderboard.user)
	leaderboard: Leaderboard;
}