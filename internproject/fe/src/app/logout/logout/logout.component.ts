import { Component, OnInit } from '@angular/core';

// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  logout = true;
  constructor() {}

  ngOnInit(): void {}
}
