import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-rating",
  templateUrl: "./rating.component.html",
  styleUrls: ["./rating.component.css"],
})
export class RatingComponent implements OnInit {
  arr: any[] = [];
  index: number = 4;
  star: any;
  feedback: any;
  errorMsg: any;
  errorMessage: any;
  accessToken: string;
  basePublicUrl = environment.basePublicUrl;
  message: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.arr = [1, 2, 3, 4, 5];
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem("AccessToken");
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

  }

  onClickItem(index) {
    this.index = index;
    this.star = index + 1;
  }

  sendratings() {
    // if(this.star==undefined){
    //   this.message="Star rating is required";
    //   return;
    // }

    if (this.star == undefined) {
      this.star = 5;
    }
    let key = localStorage.getItem("AccessToken");
    let body = {
      star: this.star,
      feedback: this.feedback,
    };
    this.spinner.show();
   // console.log(body);
    let a = document.getElementById("centralModalDanger");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .post(environment.basePublicUrl + "/public/submitRating", body, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          // console.log(data)
          this.spinner.hide();
          // console.log("logout clicked");
          this.logout();
        },
        (error) => {
          this.spinner.hide();
          this.errorMessage = error.message;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };

    let body = {};

    // console.log(header);
    this.http
      .post(this.basePublicUrl + "/public/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);

          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          localStorage.clear();
          this.router.navigateByUrl("/publicLogin");
          this.spinner.hide();

        },
        (error) => {
          // console.log("error is", error['error']);
        }
      );
  }
}
