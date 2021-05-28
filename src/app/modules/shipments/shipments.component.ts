import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WarehouseService} from "../../services/warehouse.service";
import {CustomerService} from "../../services/customer.service";
import {Shipment} from "../../models/shipment";
import {ProductService} from "../../services/product.service";
import {Unit} from "../../models/unit";
import {UnitService} from "../../services/unit.service";
declare var $: any;

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipment: Shipment;

  constructor(
    public customerService:CustomerService,
    public warehouseService:WarehouseService,
    public productService:ProductService,
    public unitService: UnitService,
  ) {
    this.shipment = new Shipment();
  }

  ngOnInit(): void {
    this.customerService.getCustomerList();
    this.warehouseService.getAllWarehouse();
    this.productService.getAllProduct();
    this.unitService.getAllUnit();
  }


  newShipmentButtonHandler() {
    $('#shipmentForm').modal('show');
    $('.select2').select2();
  }

  save() {
    console.log(this.shipment);
  }

  changeIssueDateHandler() {
    console.log(this.shipment.issue_date);
  }
}
