import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category";
import {map} from 'rxjs/operators';

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
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  getAllCategories() {
    let formData: any = new FormData();
    formData.append("func", "getAllCategories");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.categories =res["data"];
      });
  }

  getCategoriesById(category_id: number) {
    let formData: any = new FormData();
    formData.appen("product_category_id", category_id);
    formData.append("func", "getCategoriesById");
    return this.http.post<any>(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"];
      }));
  }

  updateCategories(category: Category) {
    let formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('func', "addCategory");
    return this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
