import { Injectable } from '@angular/core';
import {Tax} from "../models/tax";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaxService {
  taxes!: Tax[];
  constructor(
    private http:HttpClient
  ) { }

  addTax(tax: Tax) {
    let formData = new FormData();
    formData.append('tax', JSON.stringify(tax));
    formData.append('func', "addTax");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateTax(tax: Tax) {
    let formData = new FormData();
    formData.append('tax', JSON.stringify(tax));
    formData.append('func', "updateTax");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  deleteTax(tax_id: number) {
    let formData: any = new FormData();
    formData.append("tax_id", tax_id);
    formData.append("func", "deleteTax");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getAllTax() {
    let formData: any = new FormData();
    formData.append("func", "getAllTax");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.taxes = res["data"];
      });
  }

  getTaxById(tax_id: number) {
    let formData: any = new FormData();
    formData.append("tax_id", tax_id);
    formData.append("func", "getTaxById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }
}

