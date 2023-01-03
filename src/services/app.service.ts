import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as WebSocket from 'ws';
import { BINANCE_SOCKET_URL, EVENT_TICKER_UPDATED } from '../constant';
import {
  TickerProvider,
  TickerUpdatedEvent,
} from '../events/ticker-updated.event';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private eventEmitter: EventEmitter2) {}

  async onModuleInit() {
    console.log('inited');
    this.listenBinanceTicker();
  }

  listenBinanceTicker() {
    const ws = new WebSocket(BINANCE_SOCKET_URL);
    const tickerUpdatedEvent = new TickerUpdatedEvent(TickerProvider.BINANCE);

    ws.on('message', (data) => {
      tickerUpdatedEvent.setData(data.toString());
      this.eventEmitter.emit(EVENT_TICKER_UPDATED, tickerUpdatedEvent);
    });
  }
}
