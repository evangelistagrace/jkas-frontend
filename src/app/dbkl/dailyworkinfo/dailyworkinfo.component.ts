import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dailyworkinfo",
  templateUrl: "./dailyworkinfo.component.html",
  styleUrls: ["./dailyworkinfo.component.css"],
})
export class DailyworkinfoComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: Object;
  loginError: boolean;
  errorMsg: any;
  parliamen: any;
  id: any;
  date: any;
  p;
  parliament: Object;
  selectedParlimen: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    // console.log(this.date + " " + this.id + " " + this.parliamen);

    this.spinner.show();
    this.getDailyWorkInfo();
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/dailyworkinfo?value=" +
        this.date +
        "&value2=" +
        this.id +
        "&value3=" +
        this.parliamen
    );
    $(document).ready(function () {
      $("input[name$='inlineRadioOptions']").click(function () {
        var test = $(this).val();

        $("div.desc").hide();
        $("#jkas" + test).show();
      });
    });
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
      lokasi_aduan: {
        title: "location of complaint",
      },
      lokasi_siasatan: {
        title: "Investigation location",
      },
      borang_siasatan: {
        title: "Inquiry form",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "/dbkl/complaintinvestigation?value1=" +
            this.id +
            "&value2=" +
            row.masa +
            "&value3=" +
            this.date +
            "&alue5=" +
            this.parliamen +
            ">" +
            row.borang_siasatan +
            "</a>"
          );
        },
      },
    },
  };
  selectChangeHandler(event: any) {
    this.selectedParlimen = event.target.value;
    this.spinner.show();

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.basePublicUrl + "/dbkl/getLokasi/" + this.selectedParlimen, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.parliament = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  getDailyWorkInfo() {
    this.spinner.show();
    let body = {
      tarikh: this.date,
      id_mtb: this.id,
    };

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/getDailyMTBInquiryInforByMTK", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
        },
        (error) => {
          this.spinner.hide();
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
