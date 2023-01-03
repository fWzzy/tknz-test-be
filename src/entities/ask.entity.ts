export class AskEntity {
  price: number;
  quantity: number;

  constructor(askPrice, askQuantity) {
    this.price = askPrice;
    this.quantity = askQuantity;
  }
}
