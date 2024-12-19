import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaderboardDto } from './create-leaderboard.dto';

export class UpdateLeaderboardDto extends PartialType(CreateLeaderboardDto) {}
