import { Injectable } from '@angular/core';
import {CustomerListData} from "../models/customer-list-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Array<Customer> = new Array<Customer>();
  customerList?: CustomerListData[];
  constructor(
    private http:HttpClient
  ) { }


  addCustomer(customer: Customer) {
    let formData = new FormData();
    formData.append('customer', JSON.stringify(customer));
    formData.append('func', "addCustomer");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateCustomer(customer: Customer) {
    let formData = new FormData();
    formData.append('customer', JSON.stringify(customer));
    formData.append('func', "updateCustomer");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  getAllCustomer() {
    let formData: any = new FormData();
    formData.append("func", "getAllCustomer");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.customers =res["data"] ? res["data"]: [];
      });
  }

  getAllSupplier() {
    let formData: any = new FormData();
    formData.append("func", "getAllSupplier");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.customers =res["data"] ? res["data"] : [];
      });
  }


  getCustomerById(customer_id: number) {
    let formData: any = new FormData();
    formData.append("customer_id", customer_id);
    formData.append("func", "getCustomerById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0] ;
      }));
  }

  deleteCustomer(customer_id: number) {
    let formData: any = new FormData();
    formData.append("customer_id", customer_id);
    formData.append("func", "deleteCustomer");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getCustomer(customer_id:any):Observable<any> {
    let customer:any = this.customerList?.find( c => c.customer_id == customer_id);
    let formData: any = new FormData();
    formData.append("customer_id", customer.customer_id);
    formData.append("is_corporate", customer.is_corporate);
    formData.append("func", "getCustomer");
    return  this.http.post<any>("http://localhost:4200/api/Admin/Controller/index.php", formData).pipe(
      tap( data => {
        if (data.err == 500) {
          console.warn("HATA KODUNUZ",data.err);
        }
      }));
  }

  getFistCustomer(): Customer {
    return this.customers ? this.customers[0] : new Customer();
  }
}
