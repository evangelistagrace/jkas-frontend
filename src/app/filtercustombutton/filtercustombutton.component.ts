import { Component, OnInit } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
@Component({
  selector: 'app-filtercustombutton',
  templateUrl: './filtercustombutton.component.html',
  styleUrls: ['./filtercustombutton.component.css']
})
export class FiltercustombuttonComponent extends DefaultFilter implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
