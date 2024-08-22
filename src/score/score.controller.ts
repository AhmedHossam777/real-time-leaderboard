import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Query,
	Delete,
	UseGuards,
	Param,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@UseGuards(JWTAuthGuard)
@Controller('score')
export class ScoreController {
	constructor(private readonly scoreService: ScoreService) {}

	@Post()
	create(
		@Body() createScoreDto: CreateScoreDto,
		@CurrentUser() user: User,
		@Query('gameId') gameId: number,
	) {
		createScoreDto.user = user;
		return this.scoreService.submitScore(createScoreDto, gameId);
	}

	@Get()
	findAll() {
		return this.scoreService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.scoreService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
		return this.scoreService.update(+id, updateScoreDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.scoreService.remove(+id);
	}
}