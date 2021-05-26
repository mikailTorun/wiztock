import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  addCategory(category:Category) {
    let formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('func', "addCategory");
    return this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
