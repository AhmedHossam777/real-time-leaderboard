import { IsString, IsNumber } from 'class-validator';

export class SendMessageDto {
	@IsNumber()
	receiverId: number;

	@IsString()
	content: string;
}
