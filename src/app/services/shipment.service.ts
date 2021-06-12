import { Injectable } from '@angular/core';
import {ShipmentType} from "../models/shipment-type";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Shipment} from "../models/shipment";
import {Unit} from "../models/unit";
import {Product} from "../models/product";
import {Tax} from "../models/tax";

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  shipmentTypes!: Array<ShipmentType>;
  shipments!: Array<Shipment>;

  constructor(
    private http: HttpClient
  ) { }

  addShipment(shipment: Shipment) {
    let formData = new FormData();
    formData.append('shipment', JSON.stringify(shipment));
    formData.append('func', "addShipment");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updateShipment(shipment: Shipment) {
    let formData = new FormData();
    formData.append('shipment', JSON.stringify(shipment));
    formData.append('func', "updateShipment");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  deleteShipment(shipment_id: number) {
    let formData: any = new FormData();
    formData.append("shipment_id", shipment_id);
    formData.append("func", "deleteShipment");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getAllShipment() {
    let formData: any = new FormData();
    formData.append("func", "getAllShipment");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.shipments = res["data"];
      });
  }

  getShipmentById(shipment_id: number) {
    let formData: any = new FormData();
    formData.append("shipment_id", shipment_id);
    formData.append("func", "getShipmentById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"];
      }));
  }

  getAllShipmentType() {
    let formData: any = new FormData();
    formData.append("func", "getAllShipmentType");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.shipmentTypes = res["data"];
      });
  }

  getShipmentTypeName(type_id: number) {
    const result = this.shipmentTypes ?this.shipmentTypes.find(t => t.shipment_type_id === type_id) : null;
    return result ? result.title : "Not define unit";
  }
}
