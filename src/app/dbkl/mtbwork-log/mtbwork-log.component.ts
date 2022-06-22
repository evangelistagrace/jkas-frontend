import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-mtbwork-log",
  templateUrl: "./mtbwork-log.component.html",
  styleUrls: ["./mtbwork-log.component.css"],
})
export class MtbworkLogComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  value: any = [];
  p: any;
  datevalue: any;
  value4: any[];
  lang: string;
  isAdminType: string;
  username: string;
  userrole: string;
  officer: void;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.userrole = localStorage.getItem("roleforuser");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/mtbwork-log");
    this.lang = localStorage.getItem("lang");
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getMTBOfficerInfo", { headers: headers })
      .subscribe(
        (res) => {
           //console.log(res);
          this.spinner.hide();
          this.data = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  backtotop() {
    window.scroll(0, 0);
  }

  settings = {
    actions: false,
    // selectMode: 'multi',
    // actions: {
    //   position: 'right',
    //   edit: false,
    //   add: false,
    //   new: false,
    //   custom: [{ name: 'routeToUpdateFeedback', title: `Edit ` }],
    // },
    columns: {
      date: {
        title: "Bulan / Tarikh",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" + "/" + this.lang +
            "/dbkl/mtbdailyjobinfo?value=" +
            row.date +
            "&value2=" +
            row.id_mtb +
            "&value3=" +
            row.parlimen +
            ">" +
            row.date +
            "</a>"
          );
        },
      },
    },
  };
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
      .post(this.basePublicUrl + "/dbkl/logout", body, { headers: header })
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
          this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }

}
