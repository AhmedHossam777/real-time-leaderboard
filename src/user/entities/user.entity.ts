import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	OneToOne,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import { Score } from '../../score/entities/score.entity';
import { Leaderboard } from '../../leaderboard/entities/leaderboard.entity';
import { FriendRequest } from './friend-request.entity';
import { Message } from './message.entity';

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

	@Column({ default: false })
	admin: boolean;

	@OneToMany(() => Score, (score) => score.user)
	scores: Score[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Leaderboard, (leaderboard) => leaderboard.user)
	leaderboard: Leaderboard;

	@OneToMany(() => FriendRequest, (request) => request.sender)
	sentFriendRequests: FriendRequest[];

	@OneToMany(() => FriendRequest, (request) => request.receiver)
	receivedFriendRequests: FriendRequest[];

	@ManyToMany(() => User)
	@JoinTable({
		name: 'user_friends',
		joinColumn: { name: 'userId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'friendId', referencedColumnName: 'id' },
	})
	friends: User[];

	@OneToMany(() => Message, (message) => message.sender)
	sentMessages: Message[];

	@OneToMany(() => Message, (message) => message.receiver)
	receivedMessages: Message[];
}
