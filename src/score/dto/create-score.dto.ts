import { IsNumber, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Game } from '../../game/entities/game.entity';
import { User } from '../../user/entities/user.entity';

export class CreateScoreDto {
	@IsNumber()
	@IsNotEmpty()
	score: number;

	@ValidateNested()
	@Type(() => User)
	user: User;

	@ValidateNested()
	@Type(() => Game)
	game: Game;
}