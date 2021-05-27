import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";
import {Unit} from "../models/unit";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products!: Product[];
  constructor(
    private http: HttpClient
  ) {
  }

  addProduct(product: Product) {
    let formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('func', "addProduct");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateProduct(product: Product) {
    let formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('func', "updateProduct");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  deleteProduct(product_id: number) {
    let formData: any = new FormData();
    formData.append("product_id", product_id);
    formData.append("func", "deleteProduct");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getAllProduct() {
    let formData: any = new FormData();
    formData.append("func", "getAllProduct");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.products = res["data"];
      });
  }

  getProductById(product_id: number) {
    let formData: any = new FormData();
    formData.append("product_id", product_id);
    formData.append("func", "getProductById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }

}
