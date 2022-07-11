import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  Basic_Salary: number;
  Dearness_Allowance: number;

  conveyance_Allowance: number;
  
  FBP_Allowance: number;
  Provident_Fund: number;
  Income_Tax: number;
  Medical_Insurance: number;
  Total_salary: number;
  Gross_salary: number;
  Net_salary: number;
  Bonus: number;
  days: number;
  Number_days: number;
  Paid_days: number;
  hour: number;
  hours: number;
  weeks: number;
  right: number;
  years: number;
  call: number;

constructor() { }

salary() {
  this.Gross_salary =
    this.Basic_Salary +
  
    
    this.FBP_Allowance +
    this.Bonus;
}
net() {
  this.Net_salary =
    this.Gross_salary - (this.Provident_Fund + this.Income_Tax);
}
total() {
  this.Total_salary =
    this.Basic_Salary +
  
    
    this.FBP_Allowance +
    this.Bonus -
    (this.Provident_Fund + this.Income_Tax + this.Medical_Insurance);
}
day() {
  this.days = this.Gross_salary / this.Paid_days;
}
hou() {
  this.hours = this.Gross_salary / this.Paid_days / this.hour;
}
week() {
  this.weeks = (this.right * this.Gross_salary) / this.Paid_days;
}
year() {
  this.years = this.Gross_salary * this.call;
}

ngOnInit(): void {
  }

}
