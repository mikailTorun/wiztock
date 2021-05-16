import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User>
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {

    let formData: any = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("func", "loginFunction");
    return  this.http.post<any>(`${environment.apiUrl}`, formData).pipe(
      tap( data => {
        if(data["success"]) {
            let user: User;
            user = data["admin"][0];
            user.authData = window.btoa(username + ':' + password);
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);


        } else {
          console.warn("Login işlemi başarısız");
        }
      }),
    );

    /*

    return this.http.post<any>(`${environment.apiUrl}`, {username:username, password:password, func:'loginFunction'})
      .pipe(map((user: User) => {
        user.authData = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));

     */
  }

  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
