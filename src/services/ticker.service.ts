import { Injectable } from '@nestjs/common';
import { AskEntity } from 'src/entities/ask.entity';
import { BidEntity } from 'src/entities/bid.entity';
import { TickerEntity } from 'src/entities/ticker.entity';

@Injectable()
export class TickerService {
  private limit = 12;
  private limitBidRule: number;
  private limitAskRule: number;

  public async generate(tickerData: TickerEntity) {
    const { random } = Math;

    const listBid: BidEntity[] = [
      new BidEntity(tickerData.bidPrice, tickerData.bidQuantity),
    ];
    const listAsk: AskEntity[] = [
      new AskEntity(tickerData.askPrice, tickerData.askQuantity),
    ];

    let limitBid =
      this.limitBidRule &&
      this.limitBidRule > tickerData.bidPrice * tickerData.bidQuantity
        ? this.limitBidRule - tickerData.bidPrice * tickerData.bidQuantity
        : tickerData.bidPrice * tickerData.bidQuantity;
    let limitAsk =
      this.limitAskRule && this.limitAskRule > tickerData.askQuantity
        ? this.limitAskRule - tickerData.askQuantity
        : tickerData.askQuantity;
    let currentBidPrice = tickerData.bidPrice;
    let currentAskPrice = tickerData.askPrice;

    for (let i = 1; i < this.limit; i++) {
      const bidPrice = this.round(currentBidPrice - random() / 10000, 6);
      const bidQuantity = this.round(
        random() * ((limitBid * (i / (this.limit - 1))) / bidPrice - 0.0001) +
          0.0001,
        4,
      );
      const askPrice = this.round(currentAskPrice + random() / 10000, 6);
      const askQuantity = this.round(
        random() * (limitAsk * (i / (this.limit - 1)) - 0.0001) + 0.0001,
        4,
      );

      listBid.push(new BidEntity(bidPrice, bidQuantity));
      listAsk.push(new AskEntity(askPrice, askQuantity));

      currentBidPrice = bidPrice;
      currentAskPrice = askPrice;
      limitBid = limitBid - bidPrice * bidQuantity;
      limitAsk = limitAsk - askQuantity;
    }

    return {
      listBid,
      listAsk,
    };
  }

  private round(value, decimal) {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  private floor(value, decimal) {
    return Math.floor(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }

  public setBidRule(data: number) {
    this.limitBidRule = data;
  }

  public setAskRule(data: number) {
    this.limitAskRule = data;
  }
}
