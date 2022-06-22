import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { TableService } from "src/app/table/table.service";
import { ApplicationList } from "src/app/table/applicationList";
import { UploaddocumentComponent } from "src/app/uploaddocument/uploaddocument.component";
import { MeetingService } from "src/app/services/meeting.service";
import { ShowpdfComponent } from "src/app/showpdf/showpdf.component";
@Component({
  selector: 'app-serviceshedule',
  templateUrl: './serviceshedule.component.html',
  styleUrls: ['./serviceshedule.component.css']
})
export class ServicesheduleComponent implements OnInit {
  lang: string;
  accessToken: any;

  constructor(private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem("AccessToken");
    if (!this.accessToken) {
         this.router.navigateByUrl("/publicLogin");
       }
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "public/sevices");
    window.scroll(0, 0);
  }


  routeToNewApplication(){
    this.router.navigateByUrl("/public/collectionshedule");
  }
  routeToNewApplication1(){
    this.router.navigateByUrl("/public/cleaningshedule");
  }
  backtotop() {
    window.scroll(0, 0);
  }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
