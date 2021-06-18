import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit{
  products!: Product[];

  constructor(
    public productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.productService.getDashboardProduct().subscribe( (res:any) => {
      console.log(res);
      this.products = res.filter( (p:any) => p.is_inventory_tracking === 1);
      console.log(this.products);
    });
  }

  ngAfterViewInit(): void {
    console.log(this.productService.products);
  }

}
