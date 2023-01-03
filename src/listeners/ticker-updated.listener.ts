import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EVENT_ORDER_BOOK_UPDATED, EVENT_TICKER_UPDATED } from 'src/constant';
import { AskEntity } from 'src/entities/ask.entity';
import { BidEntity } from 'src/entities/bid.entity';
import { TickerEntity } from 'src/entities/ticker.entity';
import { TickerUpdatedEvent } from 'src/events/ticker-updated.event';
import { TickerService } from 'src/services/ticker.service';

@Injectable()
export class TickerUpdatedListener {
  private logger: Logger = new Logger(TickerUpdatedListener.name);
  private stickTicker;
  private orderBook: { listBid: BidEntity[]; listAsk: AskEntity[] };

  constructor(
    private eventEmitter: EventEmitter2,
    private readonly tickerService: TickerService,
  ) {}

  @OnEvent(EVENT_TICKER_UPDATED, { async: true })
  async handleOrderCreatedEvent(event: TickerUpdatedEvent) {
    const { bestBidPrice, bestBidQuantity, bestAskPrice, bestAskQuantity } =
      event;
    const tickerData = new TickerEntity(
      bestBidPrice,
      bestBidQuantity,
      bestAskPrice,
      bestAskQuantity,
    );

    if (!this.stickTicker) {
      this.stickTicker = tickerData;
    }

    if (JSON.stringify(this.stickTicker) !== JSON.stringify(tickerData)) {
      this.logger.log('Re-Generate order book');
      this.orderBook = await this.tickerService.generate(tickerData);
      this.stickTicker = tickerData;
      this.eventEmitter.emit(EVENT_ORDER_BOOK_UPDATED, this.orderBook);
    }
  }
}
