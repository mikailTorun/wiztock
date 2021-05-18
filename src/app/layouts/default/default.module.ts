import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {CustomersComponent} from "../../modules/customers/customers.component";
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class DefaultModule { }
