import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column,
	CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	sender: User;

	@ManyToOne(() => User)
	receiver: User;

	@Column()
	content: string;

	@CreateDateColumn()
	sentAt: Date;

	@Column({ default: false })
	read: boolean;
}
