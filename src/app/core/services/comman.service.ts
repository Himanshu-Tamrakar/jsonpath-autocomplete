import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor(private http: HttpClient) { }

  public getAutoCompleteObject(): Observable<HttpResponse<any>> {
    return this.http.get<any>("/assets/object-autocomplete/data.json?" + new Date().getTime());
  }
}
