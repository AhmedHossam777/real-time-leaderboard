import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Score } from '../../score/entities/score.entity';

@Entity()
export class Game {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	name: string;

	@Column({ default: 0, nullable: true })
	gameRating: number;

	@Column({ nullable: true })
	description: string;

	@OneToMany(() => Score, (score) => score.game)
	scores: Score[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}