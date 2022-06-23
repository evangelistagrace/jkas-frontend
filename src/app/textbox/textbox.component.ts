import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { MeetingService } from "../services/meeting.service";
import { TableService } from "../table/table.service";

@Component({
  selector: "app-textbox",
  templateUrl: "./textbox.component.html",
  styleUrls: ["./textbox.component.css"],
})
export class TextboxComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  keyValue: any;
  ck: boolean;
  displaysuccess: string;
  errorDisplay1: string;
  lang: string;
  sucessMsg: string;
  errmsg: string;
  status: boolean;
  displaysuccess1: string;
  errorDisplay2: string;
  display: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService
  ) {}

  ngOnInit() {
    this.keyValue = this.met.value;
    this.lang = localStorage.getItem("lang");
    this.data = this.met.getData;
    this.displaysuccess = "block";
  }

  onSelectOption1(event, id) {
    this.spinner.show();

    if (event.target.value == "Lengkap") {
      this.ck = true;
    } else {
      this.ck = false;
    }

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      status_semakan_dokumen: this.ck,
    };

    this.http
      .put(this.basePublicUrl + "/dbkl/updateApplicationList/" + id, body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          if (res["message"] == "application_list_updated") {
            if (this.lang == "en") {
              this.sucessMsg = "Application List updated Successfully!";
            } else {
              this.sucessMsg = "Senarai permohonan telah dikemas kini!";
            }
          }
          this.spinner.hide();
          // console.log(this.sucessMsg);
          this.status = true;
          localStorage.setItem("staus", status);
          localStorage.setItem("successmessage", this.sucessMsg);
          window.location.reload();
          this.openSuccess();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "application_list_not_updated") {
            if (this.lang == "en") {
              this.errmsg =
                "Application List could not be updated! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Senarai Aplikasi tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }
      );
  }
  openSuccess() {
    this.displaysuccess1 = "block";
  }

  closeSuccess() {
    this.displaysuccess1 = "none";
    window.location.reload();
  }

  openError() {
    this.errorDisplay2 = "block";
  }

  closeError() {
    this.errorDisplay2 = "none";
  }
}
