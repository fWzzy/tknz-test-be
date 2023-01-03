export class TickerEntity {
  bidPrice: number;
  bidQuantity: number;
  askPrice: number;
  askQuantity: number;

  constructor(bidPrice, bidQuantity, askPrice, askQuantity) {
    this.bidPrice = bidPrice;
    this.bidQuantity = bidQuantity;
    this.askPrice = askPrice;
    this.askQuantity = askQuantity;
  }
}
