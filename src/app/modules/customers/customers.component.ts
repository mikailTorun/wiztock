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
    this.customerService.getCustomerList();
    this.customerTableInit();
  }

  customerTableInit(): any {
    $(function () {
      $("#customerTable").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#customerTable_wrapper .col-md-6:eq(0)');

    });
  }

  openCreateCustomer(): any {
    this.router.navigate(['/customers/create']);
  }

}
