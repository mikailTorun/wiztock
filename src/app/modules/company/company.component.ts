import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company!: Company;
  constructor(
    public companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.company = new Company();
    this.getCompany();
  }

  updateCompany() {
    this.companyService.updateCompany(this.company).subscribe( (res: any) => {

    });
  }

  getCompany() {
    this.companyService.getCompany().subscribe((res:Company) => {
      this.company = res ? res : new Company();
    });
  }
}
