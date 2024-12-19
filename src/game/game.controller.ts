import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import {JWTAuthGuard} from '../auth/guards/auth.guard'
import {AdminGuard} from '../auth/guards/admin.guard'


@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@UseGuards(JWTAuthGuard)
	@UseGuards(AdminGuard)
	@Post()
	create(@Body() createGameDto: CreateGameDto) {
		return this.gameService.create(createGameDto);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.gameService.findOne(+id);
	}

	@Get('')
	findOneByName(@Query('name') name: string) {
		return this.gameService.findOneByName(name);
	}

	@UseGuards(JWTAuthGuard)
	@UseGuards(AdminGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
		return this.gameService.update(+id, updateGameDto);
	}

	@UseGuards(JWTAuthGuard)
	@UseGuards(AdminGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.gameService.remove(+id);
	}
}