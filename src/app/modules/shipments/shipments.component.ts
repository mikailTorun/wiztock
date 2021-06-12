import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WarehouseService} from "../../services/warehouse.service";
import {CustomerService} from "../../services/customer.service";
import {Shipment} from "../../models/shipment";
import {ProductService} from "../../services/product.service";
import {UnitService} from "../../services/unit.service";
import {Product} from "../../models/product";
import {ShipmentItem} from "../../models/shipment-item";
import {ShipmentService} from "../../services/shipment.service";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
  shipment!: Shipment;

  issueDate!: Date;
  shipmentDate!: Date;
  selectedProductId!: number;
  selectedProductObj!: Product;

  amount: number = 0;
  unit: string = "-";
  shipmentType: number;

  TALLY_IN: boolean = false;
  TALLY_OUT: boolean = false;
  INTER_WAREHOUSE: boolean = false;
  warningMessage: string = "";

  isEmptyField: boolean = false;

  constructor(
    public shipmentService: ShipmentService,
    public customerService: CustomerService,
    public warehouseService: WarehouseService,
    public productService: ProductService,
    public unitService: UnitService,
  ) {
    this.shipment = new Shipment();
    this.shipmentType = 0;
  }

  ngOnInit(): void {
    this.shipmentService.getAllShipment();
    this.shipmentService.getAllShipmentType();
    this.warehouseService.getAllWarehouse();
    this.productService.getAllProduct();
    this.unitService.getAllUnit();

  }

  clearShipmentItemField() {
    this.selectedProductId = 0;
    this.selectedProductObj = new Product();
    this.amount = 0;
    this.unit = "-";
  }

  saveButtonHandler() {


    if (!this.shipment.shipment_id) {
      this.saveShipment();
    } else {
      this.updateShipment();
    }
    this.clearShipmentItemField();
    this.closeShipmentForm();

  }

  changeIssueDateHandler(event: any) {
    this.shipment.issue_date = new Date(event.target.value);
  }

  changeShipmentDateHandler(event: any) {
    this.shipment.shipment_date = new Date(event.target.value);
  }

  addItemHandler(product: Product, amount: number) {
    const foundItem = this.shipment.shipment_items.find(item => item.product.product_id == product.product_id);
    if (this.selectedProductId) {
      if (!foundItem) {
        const newItem: ShipmentItem = new ShipmentItem(product, amount);
        this.shipment.shipment_items.push(newItem);
        this.clearShipmentItemField();
      } else {
        this.warningMessage = `The product ${foundItem.product.product_name}
        has already been added. Its amount is ${foundItem.amount} ${this.unitService.getUnitString(foundItem.product.uom_id)}`
      }
    }

  }

  changeProductHandler(product_id: number) {
    const productObj = this.productService.products.find(p => p.product_id === product_id);
    this.selectedProductObj = productObj ? productObj : new Product();
    this.unit = this.unitService.getUnitString(this.selectedProductObj.uom_id);
  }

  deleteItemHandler(product_id: number) {
    this.shipment.shipment_items = this.shipment.shipment_items.filter(function (item, index, arr) {
      return item.product.product_id !== product_id;
    });
  }

  openShipmentForm() {
    $('#shipmentForm').modal('show');
  }

  closeShipmentForm() {
    $('#shipmentForm').modal('hide');
    this.shipment = new Shipment();
  }

  openShipmentFormHandler(shipment_type_id: number) {
    switch (shipment_type_id) {
      case 1:
        this.TALLY_IN = true;
        this.TALLY_OUT = false;
        this.INTER_WAREHOUSE = false;
        this.customerService.getAllSupplier();
        break;
      case 2:
        this.TALLY_IN = false;
        this.TALLY_OUT = true;
        this.INTER_WAREHOUSE = false;
        this.customerService.getAllCustomer();
        break;
      default:
        this.TALLY_IN = false;
        this.TALLY_OUT = false;
        this.INTER_WAREHOUSE = true;
        break;
    }

    console.log(this.shipment);

    if (this.shipment.shipment_id === 0) {
      console.log("test");
      this.shipment = new Shipment();
      this.shipment.shipment_type_id = shipment_type_id;
    }

    this.openShipmentForm();
  }

  saveShipment() {
    console.log(this.shipment);
    this.shipmentService.addShipment(this.shipment).subscribe((res) => {
      if (res && res["success"] === true) {
        Toasts.successToast("The new shipment is added");
        this.closeShipmentForm();
        this.shipmentService.getAllShipment();
      }
    });
  }

  updateShipment() {
    this.shipmentService.updateShipment(this.shipment).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The shipment was updated");
        this.shipmentService.getAllShipment();
        this.closeShipmentForm();
        this.shipment = new Shipment();
        this.clearShipmentItemField();
      }
    });
  }

  deleteShipment(shipment: Shipment) {
    this.shipmentService.deleteShipment(shipment.shipment_id)
      .subscribe((res: any) => {
        if (res["success"]) {
          Toasts.dangerToast("The shipment was deleted");
          this.shipmentService.getAllShipment();
          this.shipmentService.getAllShipment();
        }
      });
  }

  checkEmptyFields() {
    this.isEmptyField = this.shipment.isThereAnyEmptyField();
    console.log("test");
  }

  editShipmentButtonHandler(shipment_id: number) {
    $('#shipmentForm').modal('show');
    this.getShipment(shipment_id);
  }

  getShipment(shipment_id: number) {
    this.shipmentService.getShipmentById(shipment_id).subscribe((res: any) => {
      this.shipment = res["shipment"][0];
      this.openShipmentFormHandler(res["shipment"][0]["shipment_type_id"]);
      this.shipment.shipment_items = new Array<ShipmentItem>();
      res["shipment_detail"].forEach((item: any) => {
        let shipmentItem: ShipmentItem = new ShipmentItem(item, item.amount);
        this.shipment.shipment_items.push(shipmentItem);
      })
    });
  }

  deleteShipmentButtonHandler(shipment: Shipment) {
    this.deleteShipment(shipment);
  }
}
