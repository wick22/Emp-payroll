import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Values } from '../model/values';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const Url = 'http://localhost:3000/admins';
@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  token: string;
  tokensub = new Subject<string>();
  iserr = false;
  errmessage: string;
  constructor(private http: HttpClient) {}

  // getvalues(): Observable<Values[]> {
  //   return this.http.get<Values[]>(`${Url}/user`);
  // }

  //create
  createadmin(creads: any): Observable<any> {
    return this.http.post<any>(`${Url}/create`, creads);
  }

  //login
  postvalues(creads: Values): Observable<any> {
    return this.http.post<any>(`${Url}/login`, creads);
  }

  //logout
  // logoutuser(token): Observable<any> {
  //   console.log('token in logout: ', token);
  //   let httpheaders2 = new HttpHeaders();
  //   httpheaders2 = httpheaders2.set('Auth', `Bearer ${token}`);
  //   console.log('httpheaders: ', httpheaders2);
  //   return this.http.post<any>(`${Url}/logout`, {
  //     headers: httpheaders2,
  //   });
  // }
  logoutuser(user): Observable<any> {
    return this.http.post<any>(`${Url}/logout`, user);
  }

  emittoken(token: string) {
    console.log('Sending token : ', token);
    this.token = token;
    this.tokensub.next(token);
  }
}
