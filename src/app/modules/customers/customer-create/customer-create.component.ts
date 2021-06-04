import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../models/customer";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  customer_id?: any
  customerData?:Customer;
  customerForm!: FormGroup;
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService
  ) {

  }

  ngOnInit(): void {
    this.getCustomer();
  }

  radioChangeHandler(event: any) {
    this.is_corporate = event.target.id !== "individualRadio";
  }


  addCustomer() {
    let customer= {
      customer_email: this.customer_email,
      customer_phone: this.customer_phone,
      customer_address: this.customer_address,
      customer_town: this.customer_town,
      customer_city: this.customer_city,
      customer_postal_code: this.customer_postal_code,
      customer_is_corporate: this.is_corporate ? 1: 0,
      customer_is_customer: 1,
      customer_is_supplier: 0,
      corporate_title: this.corporate_title,
      corporate_short_name: this.corporate_short_name,
      corporate_tax_office: this.corporate_tax_office,
      corporate_tax_number: this.corporate_tax_number,
      individual_name_surname: this.individual_name_surname,
      individual_ssn: this.individual_ssn
    }
    this.customerService.addCustomer_(customer);
  }

  getCustomer() {
    this.customer_id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.customer_id) {
      this.customerService.getCustomer(this.customer_id).subscribe( data => {
        console.log(data["data"]);
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

  updateCustomer() {
    let customer= {
      customer_id: this.customer_id,
      customer_email: this.customer_email,
      customer_phone: this.customer_phone,
      customer_address: this.customer_address,
      customer_town: this.customer_town,
      customer_city: this.customer_city,
      customer_postal_code: this.customer_postal_code,
      customer_is_corporate: this.is_corporate ? 1: 0,
      customer_is_customer: 1,
      customer_is_supplier: 0,
      corporate_title: this.corporate_title,
      corporate_short_name: this.corporate_short_name,
      corporate_tax_office: this.corporate_tax_office,
      corporate_tax_number: this.corporate_tax_number,
      individual_name_surname: this.individual_name_surname,
      individual_ssn: this.individual_ssn
    }
    this.customerService.updateCustomer_(customer);
  }

}
