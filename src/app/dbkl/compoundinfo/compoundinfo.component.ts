import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-compoundinfo",
  templateUrl: "./compoundinfo.component.html",
  styleUrls: ["./compoundinfo.component.css"],
})
export class CompoundinfoComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: Object;
  loginError: boolean;
  errorMsg: any;
  parliamen: any;
  id: any;
  date: any;
  p: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    this.getCompoundInfo();
  }

  ngOnInit() {
    window.scroll(0, 0);
    localStorage.setItem(
      "path",
      "/dbkl/compoundinfo?value=" +
        this.date +
        "&value2=" +
        this.id +
        "&value3=" +
        this.parliamen
    );
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
      masa: {
        title: "Time",
      },
      lokasi_kompaun: {
        title: "Compound Location",
      },
      no_notis_bas: {
        title: "No Notice: Low",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "/dbkl/compoundform?value=" +
            this.date +
            "&value2=" +
            this.id +
            "&value3=" +
            this.parliamen +
            "&value4=" +
            row.no_notis_bas +
            " >" +
            row.no_notis_bas +
            "</a>"
          );
        },
      },
    },
  };

  getCompoundInfo() {
    this.spinner.show();
    let body = {
      tarikh: this.date,
      id_mtb: this.id,
      parlimen: this.parliamen,
    };

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/getMTBCompoundInformation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
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
