import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customer";
import {Toasts} from "../../helpers/toasts";
import {CustomerService} from "../../services/customer.service";

declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customer!: Customer

  constructor(
    public customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.customerService.getAllCustomer();
    this.customer = new Customer();
    this.customer.is_customer = 1;
  }

  newCustomerButtonHandler() {
    $('#customerForm').modal('show');
    this.customer = new Customer();
    this.customer.is_customer = 1;
  }

  closeCustomerFormButtonHandler() {
    $('#customerForm').modal('hide');
  }

  saveCustomerButtonHandler() {
    if (this.customer.customer_id) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
  }

  editCustomerButtonHandler(customer: Customer) {
    this.customer = customer;
    $('#customerForm').modal('show');
  }

  deleteCustomerButtonHandler(customer: Customer) {
    this.deleteCategory(customer);
  }

  deleteCategory(customer: Customer) {
    return this.customerService.deleteCustomer(customer.customer_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The customer " + customer.is_corporate? customer.title : customer.name_surname  + " was deleted" );

      }
    });
  }

  saveCategory() {
    this.customerService.addCustomer(this.customer).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new customer is added.");
        $('#customerForm').modal('hide');
        this.customerService.getAllCustomer();
      }
    });
  }

  updateCategory() {
    this.customerService.updateCustomer(this.customer).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The customer is update.");
        $('#customerForm').modal('hide');
        this.customerService.getAllCustomer();
      }
    });
  }


  previewCustomerButtonHandler(customer: Customer) {
    this.customer = customer;
    $('#previewCustomerForm').modal('show');
  }
}
