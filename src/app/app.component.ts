import { Component } from '@angular/core';
import * as $ from 'jquery';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  pic1:string= "assets/img/avatar.png";
  title = 'Edefter';
  isLogin:boolean = false;


  login(){
    this.isLogin = true;
  }
  
}
