export class BidEntity {
  price: number;
  quantity: number;

  constructor(bidPrice, bidQuantity) {
    this.price = bidPrice;
    this.quantity = bidQuantity;
  }
}
