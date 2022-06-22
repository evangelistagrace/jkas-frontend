import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { TableService } from "src/app/table/table.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-claim-review",
  templateUrl: "./claim-review.component.html",
  styleUrls: ["./claim-review.component.css"],
})
export class ClaimReviewComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  value: any = [];
  p: any;
  IdsArray: any[];
  selectedRows: any;
  listOfIds: string;
  keyValue: any;
  lang: any;
  selected: boolean;
  display2: string;
  display3: string;
  errmsg: string;
  meetingupdate: string;
  detailedmeeting: any;
  errordisplay: string;
  display1: string;
  isAdminType: string;
  username: string;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.lang = localStorage.getItem("lang");
    this.spinner.show();
    localStorage.setItem("path", "/dbkl/claim-review");
    let key = localStorage.getItem("AccessToken");
    let headers = {
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getAgencyJobPaymentClaim", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          // this.errorMsg = error['error']['message'];
          // console.log("error");
        }
      );
  }
  backtotop() {
    window.scroll(0, 0);
  }
  settings = {
    selectMode: "multi",
    actions: {
      position: "right",
      delete: false,
      edit: false,
      add: false,
      new: false,
    },
    columns: {
      tarikh_tuntutan: {
        title: "Tarikh Tuntutan",
      },
      kontraktor: {
        title: "Kontraktor",
      },
      
      no_inbois: {
        title: "No. Inbois",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "/" +
            this.lang +
            "/dbkl/financialclaim?value=" +
            row.no_inbois +
            ">" +
            row.no_inbois +
            "</a>"
          );
        },
      },

      status_semakan_tuntutan_inbois: {
        title: "Status Semakan Tuntutan Inbois",
      },
    },
  };

  onUserRowSelect(event) {
    this.selected = true;
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
  }
  deleteSelected() {
    this.spinner.show();
    let authorization = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: authorization,
      }),
      body: {
        agensi_id_list: this.listOfIds.substring(1, this.listOfIds.length - 1),
      },
    };
    // console.log(options);
    this.http
      .delete(
        environment.basePublicUrl + "/dbkl/deleteAgencyJobPaymentClaim",
        options
      )
      .subscribe(
        (s) => {
          // console.log("my response" + JSON.stringify(s));
          this.openModal();
          this.spinner.hide();
          this.detailedmeeting = s["message"];

          if (this.detailedmeeting == "payment_claim_deleted") {
            if (this.lang == "en") {
              this.meetingupdate = "Financial Claim deleted successfully!";
            } else {
              this.meetingupdate = "Tuntutan Kewangan berjaya dipadamkan!";
            }
          }
          //console.log("slamn" + this.meetingupdate);
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          this.errorModal();

          if (this.errorMsg == "payment_claim_not_deleted") {
            if (this.lang == "en") {
              this.errmsg =
                "Financial Claim could not be deleted! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Tuntutan Kewangan tidak dapat dipadamkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }
      );
  }
  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display3 = "block";
 
    }
    else if (this.IdsArray.length == 0) {
      this.display3 = "block";
    }
    else {
      this.openModalDelete();

    }
  }

  openModalDelete() {
    if (this.listOfIds == undefined) {
      this.openmodal3();
      return;
    }
    this.display2 = "block";
  }
  closeModalDelete() {
    this.display2 = "none";
  }
  openmodal3() {
    this.display3 = "block";
  }
  closemodal3() {
    this.display3 = "none";
  }
  openModal() {
    this.display1 = "block";
  }
  onCloseHandled() {
    window.location.reload();
  }
  errorModal() {
    this.errordisplay = "block";
  }
  erroronCloseHandled() {
    this.errordisplay = "none";
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
