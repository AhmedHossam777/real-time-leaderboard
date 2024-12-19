import {
	WebSocketGateway,
	WebSocketServer,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class LeaderboardGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	private readonly connectedClients: Map<string, string> = new Map();

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
		this.connectedClients.set(client.id, '');
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
		this.connectedClients.delete(client.id);
	}

	emitLeaderboardUpdate(gameName: string, leaderboard: any) {
		this.server.emit(`leaderboard_update_${gameName}`, leaderboard);
	}
}
