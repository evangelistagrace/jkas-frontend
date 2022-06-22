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
  selector: 'app-checklistoption',
  templateUrl: './checklistoption.component.html',
  styleUrls: ['./checklistoption.component.css']
})
export class ChecklistoptionComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  lang: string;
  accessToken: string;
  
  constructor(  private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService) { }
    username:string;
  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);
    localStorage.setItem("path", "/public/checklistoption");
    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
    // console.log("username at checklist", this.username);
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }
  }
  routeToNewApplication(){
    this.router.navigateByUrl("/public/checklist");
  }
  routeToNewApplication1(){
    this.router.navigateByUrl("/public/listdocument"); 
  }
  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };

    let body = {};

    // console.log(header);
    this.http
      .post(this.baseUrl + "/public/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/publicLogin");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  backtotop() {
    window.scroll(0, 0);
  }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
