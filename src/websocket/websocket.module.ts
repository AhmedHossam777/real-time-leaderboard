import { Module } from '@nestjs/common';
import { LeaderboardGateway } from './leaderboard.gateway';

@Module({
	providers: [LeaderboardGateway],
	exports: [LeaderboardGateway],
})
export class WebSocketModule {}