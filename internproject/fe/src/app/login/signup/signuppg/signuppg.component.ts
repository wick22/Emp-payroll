import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../../loginservies/userservice.service';
import { LoginserviceService } from '../../services/loginservice.service';

@Component({
  selector: 'app-signuppg',
  templateUrl: './signuppg.component.html',
  styleUrls: ['./signuppg.component.css'],
})
export class SignuppgComponent implements OnInit {
  public RegForm: FormGroup;
  public obj: any;
  hide: boolean;
  iserr: boolean;
  isvalid: boolean;

  constructor(
    private fb: FormBuilder,
    private loginservice: LoginserviceService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private userservice: UserserviceService
  ) {}

  ngOnInit(): void {
    this.hide = false;
    this.iserr = false;
    this.isvalid = false;
    this.RegForm = this.fb.group({
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

      location: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      dob: [null, [Validators.required]],
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

      hr: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      des: [null, [Validators.required, Validators.maxLength(30)]],
      domain: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      address: [null, [Validators.required, Validators.maxLength(40)]],
      pincode: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      state: [
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      country: [
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
    });
  }

  errmessage: string;
  userobtained: any;
  usertoken: any;

  regadmin(regform) {
    if (regform.valid) {
      this.loginservice.createadmin(regform.value).subscribe(
        (d) => {
          console.log(d);
          this.obj = {
            email: regform.value.email,
            password: regform.value.password,
          };
          this.hide = true;
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
