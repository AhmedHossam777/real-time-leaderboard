import {
	WebSocketGateway,
	WebSocketServer,
	SubscribeMessage,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class MessageGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	private readonly userSocketMap = new Map<number, string>();

	handleConnection(client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
		// Remove user mapping when socket disconnects
		for (const [userId, socketId] of this.userSocketMap.entries()) {
			if (socketId === client.id) {
				this.userSocketMap.delete(userId);
				break;
			}
		}
	}

	@SubscribeMessage('register')
	handleRegister(client: Socket, userId: number) {
		this.userSocketMap.set(userId, client.id);
	}

	emitNewMessage(message: any) {
		const receiverSocketId = this.userSocketMap.get(message.receiver.id);
		if (receiverSocketId) {
			this.server.to(receiverSocketId).emit('newMessage', message);
		}
	}

	emitMessageRead(senderId: number, receiverId: number) {
		const senderSocketId = this.userSocketMap.get(senderId);
		if (senderSocketId) {
			this.server.to(senderSocketId).emit('messagesRead', { receiverId });
		}
	}
}
