import {Component, OnInit} from '@angular/core';
import {Tax} from "../../models/tax";
import {TaxService} from "../../services/tax.service";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  tax: Tax = new Tax();
  isEmptyField: boolean = false;

  constructor(
    public taxService: TaxService
  ) {
  }

  ngOnInit(): void {
    this.getTaxList();
  }

  clearField() {
    this.tax = new Tax();
    this.isEmptyField = false;
  }

  newUOFButtonHandler() {
    $('#taxForm').modal('show');
    this.clearField();
  }

  editTaxButtonHandler(tax_id: number) {
    $('#taxForm').modal('show');
    this.getTax(tax_id);
  }

  deleteTaxButtonHandler(tax: Tax) {
    this.deleteTax(tax);
  }

  closeTaxButtonHandler() {
    $('#taxForm').modal('hide');
  }

  async saveButtonHandler() {
    this.checkEmptyFields();
    if (!this.isEmptyField) {
      if (this.tax.tax_id) {
        this.updateTax();
      } else {
        this.saveTax();
      }
    }

  }

  getTax(tax_id: number) {

    this.taxService.getTaxById(tax_id).subscribe((res: Tax) => {
      this.tax = res;
    });

  }

  getTaxList() {
    this.taxService.getAllTax();
  }

  saveTax() {
    console.log(this.tax);
    this.taxService.addTax(this.tax).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new tax of measurement is added");
        this.getTaxList();
        this.clearField();
        this.closeTaxButtonHandler();
      }
    });
  }

  updateTax() {
    return this.taxService.updateTax(this.tax).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The category " + this.tax.rate + " was updated");
        this.getTaxList();
        this.clearField();
        this.closeTaxButtonHandler();
      }
    });


  }

  deleteTax(tax: Tax) {
    return this.taxService.deleteTax(tax.tax_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast("The category " + tax.rate + " was deleted");
        this.getTaxList();
        this.clearField();
      }
    });
  }

  checkEmptyFields() {
    if (!this.tax.rate) {
      this.isEmptyField = true;
    } else {
      this.isEmptyField = false;
    }
  }

}
