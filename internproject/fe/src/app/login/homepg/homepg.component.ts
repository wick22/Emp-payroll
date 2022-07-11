import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';
import { UserserviceService } from '../loginservies/userservice.service';
import { SignuppgComponent } from '../signup/signuppg/signuppg.component';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-homepg',
  templateUrl: './homepg.component.html',
  styleUrls: ['./homepg.component.css'],
})
export class HomepgComponent implements OnInit {
  isvalid = false;

  iserr: boolean = false;
  errmessage: string;
  isclicked: boolean = false;
  public LoginForm: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private loginservice: LoginserviceService,
    private activatedroute: ActivatedRoute,
    private userservice: UserserviceService
  ) {}

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, Validators.required],
    });
  }
  gotoemp() {
    this.router.navigate(['/emplogin']);
  }
  gotoadm() {
    this.router.navigate(['/admlogin']);
  }
  userobtained: any;
  usertoken: any;

  openlogin() {
    this.isclicked = !this.isclicked;
    this.iserr = false;
    this.LoginForm.reset();
  }

  loginuser(loginform) {
    if (loginform.valid) {
      this.loginservice.postvalues(loginform.value).subscribe(
        (data) => {
          this.userobtained = data.user;
          this.usertoken = data.token;

          //userserivce var
          this.userservice.userbe = data.user;
          this.userservice.token = data.token;

          //emiting token through loginservice
          // this.loginservice.emittoken(data.token);

          this.router.navigate(['/user', this.userobtained.empid], {
            relativeTo: this.activatedroute,
          });
        },
        (err) => {
          this.iserr = true;
          this.errmessage = err.error;
        }
      );
    } else {
      this.isvalid = true;
      setTimeout(() => {
        this.isvalid = false;
      }, 2000);
    }
  }

  opensignup() {
    this.isclicked = false;
    const dialogRef = this.dialog.open(SignuppgComponent, {
      width: '75vw',
      height: '92vh',
      maxWidth: '90vw',
      maxHeight: '95vh',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loginservice.postvalues(res).subscribe(
          (data) => {
            this.userobtained = data.user;
            this.usertoken = data.token;

            //userserivce var
            this.userservice.userbe = data.user;
            this.userservice.token = data.token;

            this.router.navigate(['/user', this.userobtained.empid], {
              relativeTo: this.activatedroute,
            });
          },
          (err) => {
            this.loginservice.iserr = true;
            this.loginservice.errmessage = err.error;
          }
        );
      }
    });
  }
}
