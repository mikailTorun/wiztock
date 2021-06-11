import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products!: Product[];

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct();
  }

}
