import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dbklmainpage",
  templateUrl: "./dbklmainpage.component.html",
  styleUrls: ["./dbklmainpage.component.css"],
})
export class DbklmainpageComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  languageList: any;
  username: string;
  AccessToken: string;
  isAdmin: any;
  userrole: string;
  email=environment.mailid;
  stringArray: any=[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.AccessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("user_type");
    this.userrole = localStorage.getItem("roleforuser");

    this.userrole.split(',');
    this.stringArray.push(  this.userrole.split(','))
    console.log(this.stringArray);
    localStorage.setItem("path", "/dbkl/dbklmainpage");
    if (!this.AccessToken) {
      this.router.navigateByUrl("/dbkl/adminregister");
    }

  }
  
  backtotop() {
    window.scroll(0, 0);
  }
  getUser(userType) {
    this.isAdmin = userType;
    localStorage.setItem("isAdmin", this.isAdmin);
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
         
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("user_type");
          this.router.navigateByUrl("/dbkl/adminregister");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
}
