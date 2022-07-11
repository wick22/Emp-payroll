import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginserviceService } from '../services/loginservice.service';
export interface User {
  name: string;
  email: string;
  password: string;
  empid: Number;
  des: string;
  domain: string;
  location: string;
  tokens: [
    {
      token: {
        type: string;
      };
    }
  ];
}

const Url = 'http://localhost:3000/admins';
@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  userbe: any;
  token: any;
  count: any;
  activectr: any;
  cdb: number;
  cde: number;
  qea: number;
  public subs = new Subject<any>();
  public ctrsub = new Subject<any>();
  public toksubb = new BehaviorSubject<any>(this.loginservice.token);
  constructor(
    private http: HttpClient,
    private loginservice: LoginserviceService
  ) {}

  getuser(id: number, token: string): Observable<any> {
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Auth', `Bearer ${token}`);
    return this.http.get<any>(`${Url}/user`, {
      headers: httpheaders,
      params: { id },
    });
  }

  emitdata(data) {
    console.log('insub :', data);
    this.userbe = data;
    this.subs.next(data);
  }

  emitcount(ctr, activectr, cdb, cde, qea) {
    this.count = ctr;
    this.activectr = activectr;
    this.cdb = cdb;
    this.cde = cde;
    this.qea = qea;
    this.ctrsub.next({ ctr, activectr, cdb, cde, qea });
  }

  emittok(token) {
    console.log(this.loginservice.token);
    this.toksubb.next(token);
  }
}
