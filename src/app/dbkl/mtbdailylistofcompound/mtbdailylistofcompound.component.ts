import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { GetemeetingComponent } from "../getemeeting/getemeeting.component";

@Component({
  selector: "app-mtbdailylistofcompound",
  templateUrl: "./mtbdailylistofcompound.component.html",
  styleUrls: ["./mtbdailylistofcompound.component.css"],
})
export class MtbdailylistofcompoundComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: Object;
  loginError: boolean;
  errorMsg: any;
  id: any;
  date: any;
  p: any;
  parlimen: any;
  no_notis_bas: string;
  lang: string;
  userrole: string;
  username: string;
  isAdminType: string;
  mtbis: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.mtbis=localStorage.getItem("mtbids");
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    this.spinner.show();
    this.lang=localStorage.getItem("lang")
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parlimen = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/mtbdailylistofcompound?value=" +
        this.date +
        "&value2=" +
        this.id +
        "&value3=" +
        this.parlimen
    );
    let body = {
      tarikh: this.date,
      id_mtb: this.mtbis,
      parlimen: this.parlimen,
    };
   // console.log(body);
    

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
        title: "Masa",
      },
      // lokasi_kompaun: {
      //   title: "Lokasi Kompaun",
      // },
      no_notis_bas: {
        title: "NO NOTIS: BAS",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" + "/" + this.lang +
            "/dbkl/mtbgetcompoundform?value4=" +
            row.no_notis_bas +
            ">" +
            row.no_notis_bas +
            "</a>"
          );
        },
      },
    },
  };
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
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
          // console.log("error is", error["error"]);
        }
      );
  }

}
