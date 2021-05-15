import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AjaxRequestService}   from "../service/ajax-request.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor( private ajax:AjaxRequestService ) { }
  customerList:any;
  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList(){
    this.ajax.getCustomerList().subscribe((response:any) =>{
      this.customerList = response.data;
      console.warn(" datamız burada ", this.customerList);
    });
  }
  



}
