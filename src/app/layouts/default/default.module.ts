import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {AllModule} from "../../modules/all.module";



@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AllModule,
  ],
})
export class DefaultModule { }
