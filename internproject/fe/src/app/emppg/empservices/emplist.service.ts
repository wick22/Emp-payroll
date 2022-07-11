import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { UserserviceService } from 'src/app/login/loginservies/userservice.service';
import { LoginserviceService } from 'src/app/login/services/loginservice.service';
export interface Emps {
  fname: string;
  mname: string;
  lname: string;
  dob: string;
  father_name: string;
  mother_name: string;
  email: string;
  password: string;
  empid: number;
  hr: {
    name: string;
    email: string;
  };
  des: string;
  domain: string;
  location: string;
  country: string;
  address: {
    line1: string;
    line2: string;
    pincode: number;
    state: string;
    country: string;
  };
  paddress: {
    line1: string;
    line2: string;
    pincode: number;
    state: string;
    country: string;
  };
  phone: number;
  altphone: number;
  class: string;
  salary: number;
  status: string;
}

const Url = 'http://localhost:3000/employees';
const Url2 = 'http://localhost:3000/admins';

@Injectable({
  providedIn: 'root',
})
export class EmplistService {
  admin: any;
  token: any;
  public admsub = new BehaviorSubject<any>(this.userservice.userbe);
  public tokensub = new BehaviorSubject<String>(this.userservice.token);
  // public httpheaders = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private userservice: UserserviceService,
    private loginservice: LoginserviceService
  ) {}

  formconvert(forms) {
    var obj = {
      fname: forms.fname,
      mname: forms.mname,
      lname: forms.lname,
      dob: forms.dob,
      father_name: forms.father_name,
      mother_name: forms.mother_name,
      email: forms.email,
      password: forms.password,
      empid: forms.empid,
      hr: {
        name: forms.hr_name,
        email: forms.hr_email,
      },
      des: forms.des,
      domain: forms.domain,
      location: forms.location,
      country: forms.country,
      address: {
        line1: forms.aline1,
        line2: forms.aline2,
        pincode: forms.apincode,
        state: forms.astate,
        country: forms.acountry,
      },
      paddress: {
        line1: forms.pline1,
        line2: forms.pline2,
        pincode: forms.ppincode,
        state: forms.pstate,
        country: forms.pcountry,
      },
      phone: forms.phone,
      altphone: forms.altphone,
      class: forms.class,
      salary: forms.salary,
      status: forms.status,
    };
    return obj;
  }

  getemps(domain: string, token: string): Observable<Emps[]> {
    console.log('token', token);
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Auth', `Bearer ${token}`);
    console.log('httpheaders in emp : ', httpheaders);
    return this.http.get<Emps[]>(`${Url}/emp`, {
      headers: httpheaders,
      params: { domain },
    });
  }
  logoutuser(token): Observable<any> {
    console.log('token in logout: ', token);
    // let httpheaders2 = new HttpHeaders();
    // headers = headers.set('Auth', `Bearer ${token}`);
    // this.httpheaders = this.httpheaders.append('Auth', `Bearer ${token}`);
    let httpheaders = new HttpHeaders();
    httpheaders = httpheaders.append('Auth', `Bearer ${token}`);
    console.log('httpheaders: ', httpheaders);
    return this.http.post<any>(`${Url2}/logout`, {
      headers: httpheaders,
    });
    // return this.http.post<any>(`${Url2}/logout`);
  }

  emitadmin(data) {
    this.admin = data;
    this.admsub.next(data);
    this.token;
  }
  emittoken(token) {
    this.token = token;
    this.tokensub.next(token);
  }

  createemp(data): Observable<Emps> {
    return this.http.post<Emps>(`${Url}/create`, data);
  }

  updateemp(id, data): Observable<Emps> {
    return this.http.patch<Emps>(`${Url}/edit`, { id, data });
  }

  deleteemp(data): Observable<Emps> {
    return this.http.delete<Emps>(`${Url}/delete`, { params: { data } });
  }
}
