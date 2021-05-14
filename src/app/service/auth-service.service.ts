import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  
  data:any = "";
  link:string ="http://localhost:4200/api/Admin/Controller/";
  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getUsers(): Observable<any> {
    return this.http.get<any>(this.link + '/index.php')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  httpError(httpError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
 
  submitForm():Observable<any> {
    let data:any;
    let formData: any = new FormData();
    formData.append("name", "mikail");
    formData.append("avatar", "torun");
    formData.append("func", "loginFunction");
  
    
  //http://localhost:4200/api/Admin/Controller/index.php
  //https://esakla.net/api/index.php
    return  this.http.post<any>("http://localhost:4200/api/Admin/Controller/index.php", formData).pipe(
      tap( data => {
        
        if (data.err == 500) {
          console.warn("HATA KODUNUZ",data.err);  
        }
      }),
      catchError(this.handleError)
    );

    /*.subscribe(   
      (response) => {
        console.log(response);
        data = response;
        return data ;
      },(error) => {
        console.log(error);
        this.data = error;
        return data ;
      }
    )

    return this.data;
    */
  }





  store() {
    
       this.http.post("http://localhost:80/api/index.php", { data: "deliii" })
      .pipe(map((res) => {
        this.data = res;
        console.warn(this.data);
        
      }));
  }

  

}
function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}

