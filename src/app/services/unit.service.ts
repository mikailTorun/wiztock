import { Injectable } from '@angular/core';
import {Unit} from "../models/unit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  units!: Unit[];
  constructor(
    private http:HttpClient
  ) { }

  addUnit(unit: Unit) {
    let formData = new FormData();
    formData.append('unit_of_measurement', JSON.stringify(unit));
    formData.append('func', "addUnit");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateUnit(unit: Unit) {
    let formData = new FormData();
    formData.append('unit_of_measurement', JSON.stringify(unit));
    formData.append('func', "updateUnit");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  deleteUnit(uom_id: number) {
    let formData: any = new FormData();
    formData.append("uom_id", uom_id);
    formData.append("func", "deleteUnit");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }

  getAllUnit() {
    let formData: any = new FormData();
    formData.append("func", "getAllUnit");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.units = res["data"];
      });
  }

  getUnitById(uom_id: number) {
    let formData: any = new FormData();
    formData.append("uom_id", uom_id);
    formData.append("func", "getUnitById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }
}

