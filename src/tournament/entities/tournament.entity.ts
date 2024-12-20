import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	JoinTable,
	CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Tournament {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	startDate: Date;

	@Column()
	endDate: Date;

	@Column()
	maxParticipants: number;

	@ManyToMany(() => User)
	@JoinTable()
	participants: User[];

	@ManyToMany(() => Game)
	@JoinTable()
	games: Game[];

	@CreateDateColumn()
	createdAt: Date;
}
