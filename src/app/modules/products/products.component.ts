import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";

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
    public productService: ProductService,
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories();
  }

  newProductButtonHandler() {
    $('#productForm').modal('show');
    this.product.product_category_id = this.categoryService.categories[0].product_category_id;
  }

  closeButtonHandler() {
    $('#productForm').modal('hide');
  }

  saveButtonHandler()  {
    console.log(this.product);
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
