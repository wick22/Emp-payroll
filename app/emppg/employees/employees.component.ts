import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserserviceService } from 'src/app/login/loginservies/userservice.service';
import { EmpdialogComponent } from '../empdialog/empdialog.component';
import { EmplistService } from '../empservices/emplist.service';
import { EditdialogComponent } from '../editdialog/editdialog/editdialog.component';
import { DeletedialComponent } from '../deletedialog/deletedial/deletedial.component';
import { LoginserviceService } from 'src/app/login/services/loginservice.service';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  isselected = false;

  constructor(
    private empservice: EmplistService,
    public dialog: MatDialog,
    private userservice: UserserviceService,
    private loginservice: LoginserviceService
  ) {}
  fromother = false;
  showerr = false;
  hidetop = false;
  errreturn: string;
  allemps: any;
  search: string;
  topcard = true;
  totalemp: number;
  activeemp: number;
  notactiveemp: number;
  hide = false;
  domain_selected = '';
  empsarr: any;
  admin: any;
  default = 'CDB';
  ngOnInit(): void {
    // this.empservice.admsub.subscribe((d) => {
    //   this.id = d.empid;
    // });
    // this.id = this.empservice.admin['empid'];
    // console.log('id', this.id);
    // console.log(this.userservice.userbe);
    // this.admin = this.userservice.userbe;
    // this.userservice.subs.subscribe((d) => {
    //   this.admin = d;
    //   console.log('D: ', d);
    // });
    this.empservice.admsub.subscribe((d) => {
      this.admin = d;
    });

    // token
    // this.empservice.tokensub.subscribe((t) => {
    //   // console.log('token in ts : ', t);
    //   this.empservice.token = t;
    // });

    this.userservice.ctrsub.subscribe((ctr) => {
      // console.log('c :', ctr.ctr);
      this.totalemp = ctr.ctr;
      this.activeemp = ctr.activectr;
      this.notactiveemp = this.totalemp - this.activeemp;
    });
    this.totalemp = this.userservice.count;
    this.activeemp = this.userservice.activectr;
    this.notactiveemp = this.totalemp - this.activeemp;

    this.empservice
      .getemps('', localStorage.getItem('token'))
      .subscribe((d) => {
        this.allemps = d;
      });

    this.getall();
  }

  search_it() {
    this.hidetop = true;
  }

  selectdomain() {
    if (this.domain_selected === '') {
      this.hide = true;
    } else {
      this.hide = false;
      this.topcard = false;
      this.empservice
        .getemps(this.domain_selected, localStorage.getItem('token'))
        .subscribe(
          (data) => {
            this.empsarr = data;
          },
          (err) => {
            this.errreturn = err.error;
          }
        );
      this.isselected = true;
    }
  }

  // this.getall();
  getemplist() {
    // console.log('isselected : ', this.isselected);
    if (this.domain_selected === '' && this.fromother == false) {
      this.hide = true;
    } else {
      this.hide = false;
      if (this.fromother == false) {
        this.topcard = false;
      }
      // this.topcard = false;
      this.empservice
        .getemps(this.domain_selected, localStorage.getItem('token'))
        .subscribe(
          (data) => {
            this.empsarr = data;
          },
          (err) => {
            this.errreturn = err.error;
          }
        );
      if (this.fromother == false) {
        this.isselected = true;
      }
    }
  }

  getall() {
    this.empservice
      .getemps(this.default, localStorage.getItem('token'))
      .subscribe((d) => {
        this.empsarr = d;
      });
  }

  editbtn(i: any) {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '65vw',
      height: '92vh',
      maxWidth: '90vw',
      maxHeight: '100vh',
      disableClose: true,
      data: { values: this.empsarr[i] },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log('inreturn : ', res);
        let forms = this.empservice.formconvert(res);
        this.empservice.updateemp(this.empsarr[i]._id, forms).subscribe(
          (d) => {
            // console.log('success in return:', d);
            this.fromother = true;
            this.getemplist();
            this.getall();
          },
          (err) => {
            this.errreturn = err.error;
            // console.log('err in return:', err);
          }
        );
      }
      console.log('result', res);
    });
    this.fromother = false;
  }
  openDialog(i: any) {
    const dialogRef = this.dialog.open(EmpdialogComponent, {
      width: '50vw',
      height: '80vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: { values: this.empsarr[i], admin: this.admin },
    });
  }
  deletebtn(id: any) {
    const dialogRef = this.dialog.open(DeletedialComponent, {
      width: '25vw',
      height: '25vh',
      maxWidth: '50vw',
      maxHeight: '50vh',
      // data: { values: this.empsarr[i] },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.empservice.deleteemp(id).subscribe(
          (d) => {
            this.getemplist();
          },
          (err) => {
            this.getemplist();
          }
        );
      }
      console.log('result', res);
    });
  }
}
