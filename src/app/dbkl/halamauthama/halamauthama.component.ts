import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-halamauthama",
  templateUrl: "./halamauthama.component.html",
  styleUrls: ["./halamauthama.component.css"],
})
export class HalamauthamaComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    localStorage.setItem('path', '/dbkl/mainpage');
    window.scroll(0, 0);
    this.spinner.show();
    this.spinner.hide();
  }
  backtotop() {
    window.scroll(0, 0);
  }
}
