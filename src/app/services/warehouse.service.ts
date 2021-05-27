import { Injectable } from '@angular/core';
import {Warehouse} from "../models/warehouse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  warehouses!: Warehouse[];
  constructor(
    private http:HttpClient
  ) { }

  addWarehouse(warehouse: Warehouse) {
    let formData = new FormData();
    formData.append('warehouse_of_measurement', JSON.stringify(warehouse));
    formData.append('func', "addWarehouse");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateWarehouse(warehouse: Warehouse) {
    let formData = new FormData();
    formData.append('warehouse_of_measurement', JSON.stringify(warehouse));
    formData.append('func', "updateWarehouse");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  deleteWarehouse(warehouse_id: number) {
    let formData: any = new FormData();
    formData.append("warehouse_id", warehouse_id);
    formData.append("func", "deleteWarehouse");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getAllWarehouse() {
    let formData: any = new FormData();
    formData.append("func", "getAllWarehouse");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.warehouses = res["data"];
        console.log(this.warehouses);
      });
  }

  getWarehouseById(warehouse_id: number) {
    let formData: any = new FormData();
    formData.append("uom_id", warehouse_id);
    formData.append("func", "getWarehouseById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }
}
