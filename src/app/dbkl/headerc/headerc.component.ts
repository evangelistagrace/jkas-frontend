import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-headerc",
  templateUrl: "./headerc.component.html",
  styleUrls: ["./headerc.component.css"],
})
export class HeadercComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  isAdminType: string;
  username: string;
  dbkl_access_token: string;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.dbkl_access_token = localStorage.getItem("dbkl_access_token");
  }
  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.dbkl_access_token,
    };

    let body = {};
    this.http
      .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.clear();
          this.spinner.hide();
        },
        (error) => {
          // this.openErrorModal();
        }
      );
  }
}
