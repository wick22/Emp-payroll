import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from 'src/app/login/loginservies/userservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  check: any;
  selected: Date | null;
  tcount: number;
  cdb: number;
  cde: number;
  qea: number;
  constructor(
    private userservice: UserserviceService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userservice.subs.subscribe((d) => {
      this.check = d;
    });
    this.check = this.userservice.userbe;

    this.userservice.ctrsub.subscribe((d) => {
      this.tcount = d.ctr;
      this.cdb = d.cdb;
      this.cde = d.cde;
      this.qea = d.qea;
    });
    this.tcount = this.userservice.count;
    this.cdb = this.userservice.cdb;
    this.cde = this.userservice.cde;
    this.qea = this.userservice.qea;
  }
  ngOnDestroy(): void {}
}
