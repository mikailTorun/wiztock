import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = 'http://localhost:80';
  data:any = "";
  constructor(private http: HttpClient) { }

  getAll(): Observable<String> {
    return this.http.get(`${this.baseUrl}/index.php`).pipe(
      map((res:any) => {
        this.data = res['data'];
        return this.data;
      }));
  }

  
}
