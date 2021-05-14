import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    this.isLogin = false;
  }
  isLogin:boolean = false;

  login(){
    location.href = "/action";
  }
} 
