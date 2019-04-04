import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Cache-Control': 'no-cache',
    // 'Pragma': 'no-cache',
    // 'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
  });

  constructor(private http: HttpClient) { }

  get(url: string, params?: {}): Observable<{}> {
    const options = { headers: this.headers, params: this.httpParams(params), withCredentials: false };
    return this.http.get(this.url(url), options);
  }

  post(url: string, data: {}) {
    const options: any = { headers: this.headers, withCredentials: false };
    const body = JSON.stringify(data);
    return this.http.post(this.url(url), body, options);
  }

  put(url: string, data: {}) {
    const options: any = { headers: this.headers, withCredentials: false };
    const body = JSON.stringify(data);
    return this.http.put(this.url(url), body, options);
  }

  delete(url: string, params?: {}) {
    const options = { headers: this.headers, params: this.httpParams(params), withCredentials: false };
    return this.http.delete(this.url(url), options);
  }

  httpParams(paramsObj: {}): {} {
    let params = new HttpParams();
    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.append(key, paramsObj[key]);
      }
    }
    return params;
  }

  url(url: string) {
    return `${environment.apiUrl}/${url}`;
  }

}
