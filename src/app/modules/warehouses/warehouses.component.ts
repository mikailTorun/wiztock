import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  newWarehouseButtonClickHandler() {
    $('#warehouseForm').modal('show');
  }
}
