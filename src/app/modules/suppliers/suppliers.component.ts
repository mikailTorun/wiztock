import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customer";
import {Toasts} from "../../helpers/toasts";
import {CustomerService} from "../../services/customer.service";
import {Category} from "../../models/category";

declare var $: any;

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  supplier!: Customer

  constructor(
    public supplierService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.supplierService.getAllSupplier();
    this.supplier = new Customer();
    this.supplier.is_supplier = 1;
  }

  newSupplierButtonHandler() {
    $('#supplierForm').modal('show');
    this.supplier = new Customer();
    this.supplier.is_supplier = 1;
  }

  closeSupplierFormButtonHandler() {
    $('#supplierForm').modal('hide');
  }

  saveSupplierButtonHandler() {
    if (this.supplier.customer_id) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
  }

  editSupplierButtonHandler(supplier: Customer) {
    this.supplier = supplier;
  }

  deleteSupplierButtonHandler(supplier: Customer) {
    this.deleteCategory(supplier);
  }

  deleteCategory(supplier: Customer) {
    return this.supplierService.deleteCustomer(supplier.customer_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The supplier " + supplier.is_corporate? supplier.title : supplier.name_surname  + " was deleted" );

      }
    });
  }

  saveCategory() {
    this.supplierService.addCustomer(this.supplier).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new customer is added.");
        $('#supplierForm').modal('hide');
      }
    });
  }

  updateCategory() {
    this.supplierService.updateCustomer(this.supplier).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The customer is update.");
        $('#supplierForm').modal('hide');
      }
    });
  }


  previewSupplierButtonHandler(supplier: Customer) {
    this.supplier = supplier;
    $('#previewSupplierForm').modal('show');
  }
}
