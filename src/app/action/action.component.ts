import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/car.service';
import { AuthServiceService } from '../service/auth-service.service';
import { catchError, retry } from 'rxjs/operators';
declare let alertify:any;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(private carService: CarService ,private auth:AuthServiceService) { }
  data:any;
  ngOnInit(): void {
    this.getData();
  }

  getData():any{

    this.auth.submitForm("a","a").subscribe((response:any) =>{
      this.data = response;
      console.warn(" datamız burada ",this.data);
    });
   /* this.auth.submitForm().subscribe((response:any) =>{
       console.warn(response);
    } );*/
  }

  condition = false;
  writeConsole():void{

    console.warn(this.carService.getAll());
   // location.href = "/test";
    location.href = "/table";

    console.warn("TIKLANDI");
    $("#id").html("merhaba <b> dunya</b>");
    this.condition = true;


    /*alertify.alert("This is an alert dialog.", function(){
      alertify.success("tıras");
    });*/
    
  }
  a = 52455;
}
