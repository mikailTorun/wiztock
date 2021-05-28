import {Product} from "./product";

export class ShipmentItem {
  product: Product;
  amount: number;
  constructor() {
    this.product = new Product();
    this.amount = 0.0;
  }
}
