import { BinanceTicker } from 'src/types/ticker';

export enum TickerProvider {
  BINANCE = 'BINANCE',
  BITFINEX = 'BITFINEX',
  BITTREX = 'BITTREX',
}

export class TickerUpdatedEvent {
  private provider: string;

  public symbol: string;
  public bestBidPrice: number;
  public bestBidQuantity: number;
  public bestAskPrice: number;
  public bestAskQuantity: number;

  constructor(provider: string) {
    this.provider = provider;
  }

  public setData(data: string) {
    switch (this.provider) {
      case TickerProvider.BINANCE:
        this.setBinanceTicker(JSON.parse(data));
        break;
      default:
        break;
    }
  }

  private setBinanceTicker(data: BinanceTicker) {
    this.symbol = data.s;
    this.bestBidPrice = parseFloat(data.b);
    this.bestBidQuantity = parseFloat(data.B);
    this.bestAskPrice = parseFloat(data.a);
    this.bestAskQuantity = parseFloat(data.A);
  }
}
