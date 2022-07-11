import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-deletedial',
  templateUrl: './deletedial.component.html',
  styleUrls: ['./deletedial.component.css'],
})
export class DeletedialComponent implements OnInit {
  cancelit = false;
  deleteit = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log('data in delete : ', data);
  }

  ngOnInit(): void {
    // console.log('data sent: ', this.data);
  }
}
