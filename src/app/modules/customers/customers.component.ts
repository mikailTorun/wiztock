import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  constructor(
    private router: Router,
    public customerService: CustomerService
  ) {

  }

  ngOnInit(): void {
    this.customerService.getAllCustomer();
  }

  customerTableInit(): any {

  }

  openCreateCustomer(): any {
    console.log(this.customerService.customers);
  }

}
