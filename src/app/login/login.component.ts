import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.isLogin = false;
  }
  data: any;
  isLogin: boolean = false;
  username: string = "";
  password: string = "";
  login() {

    this.auth.login(this.username, this.password).subscribe((response: any) => {
      this.data = response;
      console.warn(" datamız burada ", this.data.success);
      if (this.data.success == true) {
        location.href = "/action";
      } else {
        alertify.error('Kullanıcı adı ve şifrenizi kontrol ediniz');
      }
    });
  }
}
