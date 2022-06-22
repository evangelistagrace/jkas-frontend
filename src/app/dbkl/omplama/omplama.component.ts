import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-omplama",
  templateUrl: "./omplama.component.html",
  styleUrls: ["./omplama.component.css"],
})
export class OmplamaComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  Parliament: any;
  selectedFacility: any;
  selectedDay: any;
  p;
  selectedParlimen: any;
  checkboxGroup: any;
  submitted: boolean;
  parliament_subarea: any;
  selectedsubarea: any;
  subArea: any;
  isAdminType: string;
  username: string;
  AccessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/omplama");
    this.checkboxGroup = new FormGroup({
      parliament: new FormControl("", [Validators.required]),
      subarea: new FormControl("", [Validators.required])
    });

  }

  selectChangeHandler(event: any) {
    this.selectedParlimen = event.target.value;
    this.spinner.show()
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(
        this.basePublicUrl +
        "/dbkl/getOmpSubArea/" +
        this.selectedParlimen,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.subArea = res;
          this.subArea.forEach( (item, index) => {
          if(item === 'TERKINI') this.subArea.splice(index,1);
          });
          localStorage.setItem('locationArray', this.subArea)
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  activityly(event: any) {
    this.parliament_subarea = event.target.value;
    //  console.log(this.parliament_subarea);
    localStorage.setItem("subArea", this.parliament_subarea);

  } get f() {
    return this.checkboxGroup.controls;
  }
  logout() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    // console.log(key);
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + key,
    };
    let body = {};

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

  searchButton() {
    this.submitted = true;
    if (this.checkboxGroup.invalid) {
      return;
    }
    // console.log(this.selectedParlimen);
    this.Parliament = this.selectedParlimen;
    localStorage.setItem("parlimen", this.Parliament);
    this.router.navigateByUrl("/dbkl/showomplama");
  }

  backtotop() {
    window.scroll(0, 0);
  }
}
