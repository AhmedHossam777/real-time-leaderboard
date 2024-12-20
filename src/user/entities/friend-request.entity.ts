import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FriendRequest {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	sender: User;

	@ManyToOne(() => User)
	receiver: User;

	@Column({ default: 'pending' })
	status: 'pending' | 'accepted' | 'rejected';

	@CreateDateColumn()
	createdAt: Date;
}
