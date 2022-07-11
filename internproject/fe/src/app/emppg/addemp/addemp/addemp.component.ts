import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { EmplistService } from '../../empservices/emplist.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css'],
})
export class AddempComponent implements OnInit {
  public addGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private empservice: EmplistService,
    private router: Router,
    private actrouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  // checkmark
  durationInSeconds = 5;
  checked: boolean = false;
  iserr: boolean = false;
  isvalid: boolean = false;
  errmessage: string = '';
  addline1: string = '';
  addline2: string = '';
  addpincode: number;
  addstate: string = '';
  addcountry: string = '';
  color = 'primary';
  ngOnInit(): void {
    this.addGroup = this.fb.group({
      fname: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      mname: [
        null,
        [Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')],
      ],
      lname: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      father_name: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      mother_name: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      dob: [null, [Validators.required]],
      location: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      country: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      empid: [
        null,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],

      hr_name: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      hr_email: [null, Validators.required],

      des: [null, [Validators.required, Validators.maxLength(30)]],
      domain: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      pline1: [this.addline1, [Validators.required, Validators.maxLength(25)]],
      pline2: [this.addline2, [Validators.required, Validators.maxLength(25)]],
      ppincode: [
        this.addpincode,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pstate: [
        this.addstate,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      pcountry: [
        this.addcountry,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      aline1: [null, [Validators.required, Validators.maxLength(25)]],
      aline2: [null, [Validators.required, Validators.maxLength(25)]],
      apincode: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      astate: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      acountry: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      altphone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      class: [null, [Validators.required, Validators.maxLength(20)]],
      salary: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      status: [null, Validators.required],
    });
  }

  resetit() {
    this.checked = false;
  }
  setAdd() {
    if (this.checked === false) {
      this.addline1 = this.addGroup.value.aline1;
      this.addline2 = this.addGroup.value.aline2;
      this.addpincode = this.addGroup.value.apincode;
      this.addstate = this.addGroup.value.astate;
      this.addcountry = this.addGroup.value.acountry;
      this.checked = true;
    } else {
      this.addline1 = null;
      this.addline2 = null;
      this.addpincode = null;
      this.addstate = null;
      this.addcountry = null;
      this.checked = false;
    }
  }

  onSubmit(addform) {
    if (addform.valid) {
      console.log('addforms: ', addform.value);
      var forms = this.empservice.formconvert(addform.value);
      console.log('forms: ', forms);
      this.empservice.createemp(forms).subscribe(
        (res) => {
          console.log(res);
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
          });
          // this.router.navigate(['emps'], { relativeTo: this.actrouter });
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
}
