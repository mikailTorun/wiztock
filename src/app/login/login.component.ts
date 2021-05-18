import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../service/auth-service.service';
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  returnUrl?: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    if(this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  data: any;
  isLogin: boolean = false;
  username: string = "";
  password: string = "";

  login() {
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {

        }
      )

    /*
        this.auth.login( this.username, this.password ).subscribe((response: any) => {
          this.data = response;
          console.warn(" datamız burada ", this.data.success);
          if (this.data.success == true) {
            location.href = "/action";
          } else {
            alertify.error('Kullanıcı adı ve şifrenizi kontrol ediniz');
          }
        });
     */
  }
}
