import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { ActionComponent } from './action/action.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    MenuComponent,
    ActionComponent,
    FooterComponent,
    TestComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
