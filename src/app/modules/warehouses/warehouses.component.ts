import { Component, OnInit } from '@angular/core';
import {Warehouse} from "../../models/warehouse";
import {WarehouseService} from "../../services/warehouse.service";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  warehouse: Warehouse = new Warehouse();
  isEmptyField: boolean = false;
  constructor(
    public warehouseService: WarehouseService
  ) {
  }

  ngOnInit(): void {
    this.getWarehouseList();
  }

  clearField() {
    this.warehouse = new Warehouse();
    this.isEmptyField = false;
  }

  newWarehouseButtonHandler() {
    $('#warehouseForm').modal('show');
    this.clearField();
  }

  editWarehouseButtonHandler(uom_id: number) {
    $('#warehouseForm').modal('show');
    this.getWarehouse(uom_id);
  }

  deleteWarehouseButtonHandler(warehouse: Warehouse) {
    this.deleteWarehouse(warehouse);
  }

  closeWarehouseButtonHandler() {
    $('#warehouseForm').modal('hide');
  }

  async saveButtonHandler() {
    this.checkEmptyFields();
    if(!this.isEmptyField) {
      if (this.warehouse.warehouse_id) {
        this.updateWarehouse();
      } else {
        this.saveWarehouse();
      }
    }

  }

  getWarehouse(uom_id: number) {

    this.warehouseService.getWarehouseById(uom_id).subscribe((res: Warehouse) => {
      this.warehouse = res;
    });

  }

  getWarehouseList() {
    this.warehouseService.getAllWarehouse();
  }

  saveWarehouse() {
    console.log(this.warehouse);
    this.warehouseService.addWarehouse(this.warehouse).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new warehouse of measurement is added");
        this.getWarehouseList();
        this.clearField();
        this.closeWarehouseButtonHandler();
      }
    });
  }

  updateWarehouse() {
    return this.warehouseService.updateWarehouse(this.warehouse).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The category " + this.warehouse.name + " was updated");
        this.getWarehouseList();
        this.clearField();
        this. closeWarehouseButtonHandler();
      }
    });
  }

  deleteWarehouse(warehouse: Warehouse) {
    return this.warehouseService.deleteWarehouse(warehouse.warehouse_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The category " + warehouse.name + " was deleted" );
        this.getWarehouseList();
        this.clearField();
      }
    });
  }

  checkEmptyFields() {
    if(!this.warehouse.name || !this.warehouse.address || !this.warehouse.town || !this.warehouse.city || !this.warehouse.postal_code ) {
      this.isEmptyField = true;
    } else {
      this.isEmptyField =false;
    }
  }
}
