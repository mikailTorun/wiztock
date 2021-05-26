import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../models/customer";

declare var $: any;
@Component({
  selector: 'app-customer-preview',
  templateUrl: './customer-preview.component.html',
  styleUrls: ['./customer-preview.component.scss']
})
export class CustomerPreviewComponent implements OnInit {
  customer_id?: any
  customerData?:Customer;
  is_corporate:boolean = true;
  customer_is_corporate: any = "1";
  corporate_title: any;
  corporate_tax_office: any;
  corporate_tax_number: any;
  individual_name_surname: any;
  corporate_short_name: any;
  individual_ssn: any;
  customer_email: any;
  customer_phone: any;
  customer_address: any;
  customer_town: any;
  customer_city: any;
  customer_postal_code: any;
  corporate_person_name_surname: any;
  corporate_person_phone: any;
  corporate_person_description: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customer_id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.customer_id) {
      this.customerService.getCustomer(this.customer_id).subscribe( data => {
        this.customer_is_corporate = data["data"][0].is_corporate;
        this.is_corporate = this.customer_is_corporate;
        this.corporate_title = data["data"][0].title;
        this.corporate_short_name = data["data"][0].short_name;
        this.corporate_tax_office = data["data"][0].tax_office;
        this.corporate_tax_number = data["data"][0].tax_number;
        this.customer_email = data["data"][0].email;
        this.customer_phone = data["data"][0].phone;
        this.customer_address =data["data"][0].address;
        this.customer_town =data["data"][0].town;
        this.customer_city = data["data"][0].city;
        this.customer_postal_code = data["data"][0].postal_code;
        this.individual_name_surname = data["data"][0].name_surname;
        this.individual_ssn = data["data"][0].ssn;

      });
    }
  }

  createContactCancelSubmitHandler() {

  }

  createContactSubmitHandler() {
    $('#createCompanyContact').modal('show');
  }

  createContactHandler() {
    $('#createCompanyContact').modal('show');
  }
}
