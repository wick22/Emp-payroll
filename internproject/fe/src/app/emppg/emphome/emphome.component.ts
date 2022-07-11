import { HttpClient } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserserviceService } from 'src/app/login/loginservies/userservice.service';
import { LoginserviceService } from 'src/app/login/services/loginservice.service';
import { LogoutComponent } from 'src/app/logout/logout/logout.component';
import { EmplistService } from '../empservices/emplist.service';

@Component({
  selector: 'app-emphome',
  templateUrl: './emphome.component.html',
  styleUrls: ['./emphome.component.css'],
})
export class EmphomeComponent implements OnInit {
  rotateit = false;
  empid: any;
  datas: any;
  token: string;
  opened: boolean = true;
  dclicked = false;
  eclicked = false;
  aclicked = false;

  constructor(
    private router: Router,
    private userservice: UserserviceService,
    private activatedroute: ActivatedRoute,
    private empservices: EmplistService,
    private loginservice: LoginserviceService,
    public dialog: MatDialog
  ) {
    // console.log('helo');
  }
  dash() {
    this.dclicked = true;
    this.aclicked = false;
    this.eclicked = false;
  }
  add() {
    this.dclicked = false;
    this.aclicked = true;
    this.eclicked = false;
  }
  eview() {
    this.dclicked = false;
    this.aclicked = false;
    this.eclicked = true;
  }
  ngOnInit(): void {
    // let sub = new Subject<any>();
    console.log('in home through loginservice var: ', this.loginservice.token);
    this.loginservice.tokensub.subscribe((t) => {
      this.token = t;
      console.log('$in home logic: ', t);
    });

    this.empid = this.activatedroute.snapshot.params['id'];
    console.log('id', this.empid);

    this.userservice.getuser(this.empid).subscribe(
      (data) => {
        console.log(data.count);
        console.log(data.Userobt);
        this.userservice.count = data.count;
        this.userservice.activectr = data.activectr;
        this.userservice.cdb = data.cdb;
        this.userservice.cde = data.cde;
        this.userservice.qea = data.qea;

        this.token = data.Userobt.tokens[data.Userobt.tokens.length - 1].token;
        this.userservice.emitdata(data.Userobt);
        this.userservice.emitcount(
          data.count,
          data.activectr,
          data.cdb,
          data.cde,
          data.qea
        );
        // this.userservice.emittoken()
        this.empservices.emitadmin(data.Userobt);
        this.empservices.emittoken(this.token);
        // console.log('in home usertoken: ', data.token);
      },
      (err) => {
        console.log({ err: err });
      }
    );
    // this.userservice.emitdata();
    console.log('In the emp');
  }

  openLogout() {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '30vw',
      height: '25vh',
      maxWidth: '70vw',
      maxHeight: '60vh',
      // data: { admin: },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('result', res);
      if (res) {
        // console.log(this.token);
        this.loginservice.logoutuser(this.userservice.userbe).subscribe((d) => {
          console.log(d);
          if (d) {
            this.router.navigate([''], {
              relativeTo: this.activatedroute,
            });
          }
        });
      }
    });
  }
  rotate() {
    this.rotateit = !this.rotateit;
  }
}
