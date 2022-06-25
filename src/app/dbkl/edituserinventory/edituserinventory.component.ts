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
  selector: "app-edituserinventory",
  templateUrl: "./edituserinventory.component.html",
  styleUrls: ["./edituserinventory.component.css"],
})
export class EdituserinventoryComponent implements OnInit {
  registrationGroup: any;
  submitted: boolean;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  peranan: any;
  nama_pengguna: any;
  id_pengguna: any;
  loginError: boolean;
  errorMsg: any;
  kata_laluan: any;
  id: string;
  errorDisplay: string;
  display: string;
  errmsg: string;
  lang: string;
  updatemeeting: string;
  meetingupdate: string;
  detailedmeeting: any;
  updateinventory: string;
  updateinven: string;

  constructor(
    private http: HttpClient,
    private tservice: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);
    this.spinner.show();
    this.id = this.route.snapshot.queryParamMap.get("id");
    let key = localStorage.getItem("AccessToken");
    localStorage.setItem("path", "/dbkl/edituserinventory?id=" + this.id);
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };

    // console.log("this is my body" + body)

    this.http
      .get(this.basePublicUrl + "/dbkl/getInventoriPenggunaById/" + this.id, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res[0];
          this.spinner.hide();
          this.nama_pengguna = this.data.nama_pengguna;
          this.id_pengguna = this.data.id_pengguna;
          this.peranan = this.data.peranan;
          this.kata_laluan = this.data.kata_laluan;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  updateSubmit() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let body = {
      nama_pengguna: this.nama_pengguna,
      peranan: this.peranan,
    };

    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };

    // console.log("this is my body" + body)

    this.http
      .put(
        this.basePublicUrl +
          "/dbkl/updateInventoriPengguna/" +
          this.id_pengguna,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.data = res;
          this.nama_pengguna = this.data.nama_pengguna;
          this.peranan = this.data.peranan;
          this.spinner.hide();
          this.openSuccessModal();
          this.updateinventory = res["message"];
          if (this.updateinventory == "inventori_pengguna_updated") {
            if (this.lang == "en") {
              this.updateinven = "Inventori Pengguna updated Successfully!";
            } else {
              this.updateinven = "Inventori Pengguna berjaya dikemas kini!";
            }
          }
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();

          this.errorMsg = error["error"]["message"];
          this.openErrorModal();
          if (this.errorMsg == "inventori_pengguna_not_updated") {
            if (this.lang == "en") {
              this.errmsg =
                "Inventori Pengguna  could not be updated! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Inventori Pengguna tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }
      );
  }
  backtotop() {
    window.scroll(0, 0);
  }
  onCloseSuccessModal() {
    this.display = "none";
    this.router.navigateByUrl("/dbkl/usermanagement");
  }
  openSuccessModal() {
    this.display = "block";
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    this.errorDisplay = "none";
    this.router.navigateByUrl("dbkl/adminregister");
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
          localStorage.setItem("isdbkl", "false");
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }
}
