import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  OnGatewayConnection,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EVENT_ORDER_BOOK_UPDATED } from './constant';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger(AppGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    this.logger.log(server, 'Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client ${client.id} connected`);
  }

  @OnEvent(EVENT_ORDER_BOOK_UPDATED, { async: true })
  updateTicker(event) {
    this.server.emit('tickers', event);
  }
}
