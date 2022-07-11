import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css'],
})
export class EditdialogComponent implements OnInit {
  public editGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editGroup = this.fb.group({
      fname: [
        `${this.data.values.fname}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      mname: [
        `${this.data.values.mname}`,
        [Validators.maxLength(20), Validators.pattern('^[a-zA-Z ]*$')],
      ],
      lname: [
        `${this.data.values.lname}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      father_name: [
        `${this.data.values.father_name}`,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      mother_name: [
        `${this.data.values.mother_name}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      dob: [`${this.data.values.dob}`, Validators.required],
      location: [
        `${this.data.values.location}`,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      country: [
        `${this.data.values.country}`,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      empid: [
        `${this.data.values.empid}`,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(7),
          Validators.maxLength(8),
        ],
      ],
      email: [
        `${this.data.values.email}`,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],

      hr_name: [
        `${this.data.values.hr.name}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      hr_email: [`${this.data.values.hr.email}`, Validators.required],

      des: [
        `${this.data.values.des}`,
        [Validators.required, Validators.maxLength(30)],
      ],
      domain: [
        `${this.data.values.domain}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      pline1: [
        `${this.data.values.paddress.line1}`,
        [Validators.required, Validators.maxLength(25)],
      ],
      pline2: [
        `${this.data.values.paddress.line2}`,
        [Validators.required, Validators.maxLength(25)],
      ],
      ppincode: [
        `${this.data.values.paddress.pincode}`,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      pstate: [
        `${this.data.values.paddress.state}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      pcountry: [
        `${this.data.values.paddress.country}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      aline1: [
        `${this.data.values.address.line1}`,
        [Validators.required, Validators.maxLength(25)],
      ],
      aline2: [
        `${this.data.values.address.line2}`,
        [Validators.required, Validators.maxLength(25)],
      ],
      apincode: [
        `${this.data.values.address.pincode}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      astate: [
        `${this.data.values.address.state}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      acountry: [
        `${this.data.values.address.country}`,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],

      phone: [
        `${this.data.values.phone}`,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      altphone: [
        `${this.data.values.altphone}`,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      class: [
        `${this.data.values.class}`,
        [Validators.required, Validators.maxLength(20)],
      ],
      salary: [
        `${this.data.values.salary}`,
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      status: [`${this.data.values.status}`, Validators.required],
    });
  }

  onSubmit(subform) {
    // console.log(subform.value);
    // this.dialog.close()
  }
}
