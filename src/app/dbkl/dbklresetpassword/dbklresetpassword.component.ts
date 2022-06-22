import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dbklresetpassword",
  templateUrl: "./dbklresetpassword.component.html",
  styleUrls: ["./dbklresetpassword.component.css"],
})
export class DbklresetpasswordComponent implements OnInit {
  resetGroup;
  password: any;
  passError: boolean = true;
  token: string;
  baseUrl = environment.basePublicUrl;
  display: string;
  errorDisplay: string;
  display1: string;

  validation_messages = {
    password: [
      { type: "required", message: "Password is required!" },
      { type: "minlength", message: "Minimum 8 characters required" },
    ],
  };
  submitted: boolean;
  resp: any;
  lang: string;
  errorMsg: string;
  sucessMsg: string;
  error: any;
  errormsg: any;
  token1: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.scroll(0, 5);
    this.lang = localStorage.getItem("lang");
    this.token1 = this.route.snapshot.queryParamMap.get("token");
    localStorage.setItem("path", "dbkl/resetpassword??token=" + this.token1);
    this.resetGroup = new FormGroup({
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
        ),
      ]),
    });

    this.token = this.route.snapshot.queryParamMap.get("token");
    // console.log("token is", this.token);
  }

  get f() {
    return this.resetGroup.controls;
  }
  reset() {
    this.submitted = true;
    if (this.resetGroup.invalid) {
      return;
    }
    this.spinner.show();
    // console.log("new password is", this.password);
    let body = {
      token: this.token,
      password: this.password,
    };

    // console.log("body data", body);

    this.http.put(this.baseUrl + "/dbkl/resetPassword", body).subscribe(
      (res) => {
        // console.log("response after updating password", res);
        this.spinner.hide();


        this.resp = res["status"] == "success";
        if (res['message'] == "password_updated") {

          if (this.lang == "en") {

            this.sucessMsg = "Password updated successfully!";
          }
          else {
            this.sucessMsg = "Kata laluan berjaya dikemas kini!";
          }
        }
        this.openSuccessModal();


      },
      (error) => {
        this.spinner.hide();
        this.openErrorModal();
        this.errormsg = error["error"]["message"];
        if (this.errormsg == "password_not_updated") {

          if (this.lang == "en") {

            this.errorMsg = "Password  could not be updated! Please refer console logs for further details.";
          }
          else {
            this.errorMsg = "Kata laluan tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
          }
        }

      }
    );
  }

  openSuccessModal() {
    this.display = "block";
  }

  openErrorModal() {
    this.errorDisplay = "block";
  }

  closeSuccessModal() {
    this.display = "none";
    this.router.navigateByUrl("/dbkl/adminregister");
  }

  closeErrorModal() {
    this.display = "none";

    window.location.reload();
  }
}
