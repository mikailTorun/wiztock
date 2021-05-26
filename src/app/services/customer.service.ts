import { Injectable } from '@angular/core';
import {CustomerListData} from "../models/customer-list-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList?: CustomerListData[];
  constructor(
    private http:HttpClient
  ) { }


  getCustomerList(): void {
    let formData: any = new FormData();
    formData.append("func", "getCustomerList");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.customerList =res["data"];
      });
  }

  addCustomer(customer: any): void {
    let formData = new FormData();
    formData.append("customer_email", customer.customer_email);
    formData.append("customer_phone", customer.customer_phone);
    formData.append("customer_address", customer.customer_address);
    formData.append("customer_town", customer.customer_town);
    formData.append("customer_city", customer.customer_city);
    formData.append("customer_postal_code", customer.customer_postal_code);
    formData.append("customer_is_corporate", customer.customer_is_corporate ? '1' : '0');
    formData.append("customer_is_customer", "1");
    formData.append("customer_is_supplier","0");
    formData.append("corporate_title", customer.corporate_title);
    formData.append("corporate_short_name", customer.corporate_short_name);
    formData.append("corporate_tax_office", customer.corporate_tax_number);
    formData.append("corporate_tax_number", customer.corporate_tax_number);
    formData.append("individual_name_surname", customer.individual_name_surname);
    formData.append("individual_ssn", customer.individual_ssn);
    formData.append("func", "funcInsertCustomer");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  updateCustomer(customer: any): void {
    let formData = new FormData();
    formData.append("customer_id", customer.customer_id);
    formData.append("customer_email", customer.customer_email);
    formData.append("customer_phone", customer.customer_phone);
    formData.append("customer_address", customer.customer_address);
    formData.append("customer_town", customer.customer_town);
    formData.append("customer_city", customer.customer_city);
    formData.append("customer_postal_code", customer.customer_postal_code);
    formData.append("customer_is_corporate", customer.customer_is_corporate ? '1' : '0');
    formData.append("customer_is_customer", "1");
    formData.append("customer_is_supplier","0");
    formData.append("corporate_title", customer.corporate_title);
    formData.append("corporate_short_name", customer.corporate_short_name);
    formData.append("corporate_tax_office", customer.corporate_tax_number);
    formData.append("corporate_tax_number", customer.corporate_tax_number);
    formData.append("individual_name_surname", customer.individual_name_surname);
    formData.append("individual_ssn", customer.individual_ssn);
    formData.append("func", "updateCustomer");

    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        console.log(res);
      });


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
}
