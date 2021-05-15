import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { ActionComponent } from './action/action.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';
import { CustomerComponent } from './customer/customer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    MenuComponent,
    ActionComponent,
    FooterComponent,
    TestComponent,
    TableComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
