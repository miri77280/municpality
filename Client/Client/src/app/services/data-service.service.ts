import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  private baseUrl = 'https://localhost:7032/api/Data';


  getData(email: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<string>(this.baseUrl, JSON.stringify(email), { headers });
  }


}
