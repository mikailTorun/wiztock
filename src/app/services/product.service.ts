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

  deleteProduct(id: any) {

  }
}
