import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AjaxRequestService {
  data:any = "";
  constructor(private http: HttpClient) { }
  
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
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


  getCustomerList():Observable<any>{
    let formData: any = new FormData();
    formData.append("func", "getCustomerList");
    return  this.http.post<any>("http://localhost:4200/api/Admin/Controller/index.php", formData).pipe(
      tap( data => {
        
        if (data.err == 500) {
          console.warn("HATA KODUNUZ",data.err);  
        }
      }),
      catchError(this.handleError)
    );
  }

}
