import { Injectable } from '@angular/core';
import {CustomerListData} from "../models/customer-list-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Customer} from "../models/customer";
import {stringify} from "@angular/compiler/src/util";

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

  addCustomer(customer: Customer): void {

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
}
