import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./copmonents/header/header.component";
import {FooterComponent} from "./copmonents/footer/footer.component";
import {SidebarComponent} from "./copmonents/sidebar/sidebar.component";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
