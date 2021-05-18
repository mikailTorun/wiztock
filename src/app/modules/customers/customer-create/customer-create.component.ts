import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";

declare var $: any;

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {
  customer_id?: any
  customerForm!: FormGroup;
  is_corporate:boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public customerService: CustomerService
  ) {
    this.customer_id = this.activatedRoute.snapshot.paramMap.get("id");

  }

  ngOnInit(): void {
    $('[data-mask]').inputmask();
    this.customerForm = this.formBuilder.group(
      {
        customer_is_corporate:[1, Validators.required],
        customer_customer_id: [ this.customer_id || null ],
        customer_email: ['', Validators.email],
        customer_phone: [''],
        customer_address: [''],
        customer_town: [''],
        customer_city: [''],
        customer_postal_code: [''],
        corporate_title: [''],
        corporate_short_name: [''],
        corporate_tax_office: [''],
        corporate_tax_number: [''],
        individual_name_surname: [''],
        individual_ssn: [''],
      }
    );
  }

  radioChangeHandler(event: any) {
    if(event.target.id === "individualRadio") {
      this.is_corporate = false;
    } else{
      this.is_corporate = true;
    }
  }

  addCustomer() {
    this.customerService.addCustomer(this.customerForm.value);
  }

}
