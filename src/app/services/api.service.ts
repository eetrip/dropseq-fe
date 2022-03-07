import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = environment.baseURL;
  }

  getCheckBox(): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post(`${this.baseUrl}seq/checkBox`, header);
  }

  getDropdown(param: object): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post(`${this.baseUrl}seq/dropDown`, param, header);
  }

  getGraphData(params: object): Observable<any> {
    const header = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
    return this.http.post(`${this.baseUrl}seq/series`, params, header);
  }
}
