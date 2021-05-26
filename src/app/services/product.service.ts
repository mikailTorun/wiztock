import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/products";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient
  ) { }


  addProduct(product:Product) {
    let formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('func', "addData");
    return this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  deleteProduct(id: any) {

  }
}
