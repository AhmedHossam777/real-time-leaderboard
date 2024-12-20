import { Controller, Post, Body, Query, UseGuards, Get, ParseIntPipe } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { BadRequestException } from '../common/exceptions/application.exceptions';
import { ResponseUtil } from '../common/utils/response.util';

@UseGuards(JWTAuthGuard)
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  async create(
    @Body() createScoreDto: CreateScoreDto,
    @CurrentUser() user: User,
    @Query('gameName') gameName: string,
  ) {
    try {
      createScoreDto.user = user;
      const score = await this.scoreService.submitScore(createScoreDto, gameName);
      return ResponseUtil.success(score, 'Score submitted successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getHighestScore(@Query('gameName') gameName: string) {
    try {
      const highestScores = await this.scoreService.getHighestScores(gameName);
      return ResponseUtil.success(highestScores, 'Highest scores retrieved successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('top-players')
  async getTopPlayersReport(
    @Query('gameId') gameId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    try {
      const report = await this.scoreService.getTopPlayersReport(
        gameId,
        new Date(startDate),
        new Date(endDate),
        limit,
      );
      return ResponseUtil.success(report, 'Top players report generated successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}