import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  languageList: any;
  username: string;
  isAdmin: string;
  userrole: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
  }
  getUser(userType) {
    this.isAdmin = userType;
    localStorage.setItem("isAdmin", this.isAdmin);
  }
  logout() {
    localStorage.removeItem("dbkl_access_token");
    localStorage.setItem("isdbkl", "false");
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    // console.log(key);
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + key,
    };
    let body = {};

    this.http
      .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);

          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          localStorage.clear();
          this.router.navigateByUrl("/dbkl/adminregister");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  mtb(){
    window.open(this.baseUrl+"/jkas_resourses/free/pdfs/MTB user.pdf");
  }
  mtk(){
    window.open(this.baseUrl+"/jkas_resourses/free/pdfs/MTK user.pdf");
  }
  dbkl(){
    window.open(this.baseUrl+"/jkas_resourses/free/pdfs/DBKL user.pdf");
  }
  
}
