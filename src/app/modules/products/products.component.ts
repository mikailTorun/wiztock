import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/products";
import {CustomerService} from "../../services/customer.service";
import {ProductService} from "../../services/product.service";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product = new Product();
  tax: any = 18;
  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {

  }

  newProductButtonHandler() {
    $('#productForm').modal('show');
  }

  closeButtonHandler() {
    $('#productForm').modal('hide');
  }

  saveButtonHandler()  {
    this.productService.addProduct(this.product);
  }

  changeSellingPriceHandler(event: any) {
    const taxAmount = this.tax / 100.0 + 1;
    let pPrice = parseFloat(event.target.value) / taxAmount;
    this.product.purchasing_price = pPrice ? pPrice : 0;
  }

  changePurchasingHandler(event: any) {
    this.product.purchasing_price = parseFloat(event.target.value);
    this.calculateSellingPrice();
  }

  setTax(event: any) {
    this.tax = event.target.value;
    this.calculateSellingPrice();
  }

  calculateSellingPrice() {
    const taxAmount = this.tax / 100.0 + 1;
    let sPrice = this.product.purchasing_price * taxAmount;
    this.product.selling_price = sPrice ? sPrice : 0;
  }

}
