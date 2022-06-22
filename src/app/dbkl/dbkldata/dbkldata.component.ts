import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { TableService } from "src/app/table/table.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dbkldata",
  templateUrl: "./dbkldata.component.html",
  styleUrls: ["./dbkldata.component.css"],
})
export class DbkldataComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  data1: any;
  data2: any;
  data3: any;
  AccessToken: string;
  vdata: string;
  constructor(
    private http: HttpClient,
    private tservice: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    
    this.AccessToken = localStorage.getItem("AccessToken");
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/dbkldata");
    this.spinner.show();
    let headers = {
      accept: "application/json",
    };

    this.http
      .get(this.baseUrl + "/dbkl/getJumlahKawasanPerkhidmatan", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data = res;
        //this.vdata=this.data+"km";
        this.spinner.hide();
      });

    this.http
      .get(this.baseUrl + "/dbkl/getJumlahPermis", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data1 = res;
        this.spinner.hide();
      });

    this.http
      .get(this.baseUrl + "/dbkl/getJumlahPembersihanAwam", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data2 = res;
        this.spinner.hide();
      });

    this.http
      .get(this.baseUrl + "/dbkl/getJumlahKutipanSampah", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data3 = res;
        this.spinner.hide();
      });
  }
  backtotop() {
    window.scroll(0, 0);
  }
  logout() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");

    let header = {
      accept: "application/json",
      Authorization: "Bearer " + key,
    };

    let body = {};
    // console.log(key);
    // console.log(header);
    this.http
      .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("user_type");
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
}
