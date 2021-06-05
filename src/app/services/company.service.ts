import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Company} from "../models/company";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) {
  }

  updateCompany(company: Company) {
    let formData: FormData = new FormData();
    formData.append("company", JSON.stringify(company));
    formData.append("func", "updateCompany");
    return this.http.post(`${environment.apiUrl}`, formData).pipe(
      map( response => {
        return response;
      })
    );
  }

  getCompany() {
    let formData: any = new FormData();
    formData.append("func", "getCompany");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }

}
