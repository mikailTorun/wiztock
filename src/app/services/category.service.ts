import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";
import {map} from 'rxjs/operators';
declare var $:any
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories!: Category[];
  constructor(
    private http:HttpClient
  ) { }

  addCategory(category:Category) {
    let formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('func', "addCategory");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateCategories(category: Category) {
    let formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('func', "updateCategory");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));

  }

  getAllCategories() {
    let formData: any = new FormData();
    formData.append("func", "getAllCategories");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.categories = res["data"];
      });
  }

  getCategoryById(category_id: number) {
    let formData: any = new FormData();
    formData.append("product_category_id", category_id);
    formData.append("func", "getCategoryById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }

  deleteCategory(category_id: number) {
    let formData: any = new FormData();
    formData.append("product_category_id", category_id);
    formData.append("func", "deleteCategory");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }
}
