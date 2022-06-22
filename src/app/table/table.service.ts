import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Injectable()
export class TableService {
  accessToken: string;
  serialNo: string;
  accessToken1: string;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}
  url = environment.basePublicUrl;

  getCharacters() {
    this.spinner.show();
    this.accessToken = localStorage.getItem("AccessToken");
    let header = {
      authorization: this.accessToken,
    };
    return this.http.get(`${this.url}/public/viewApplicationList`, {
      headers: header,
    });
  }

  getProfile() {
    this.spinner.show();
    this.accessToken = localStorage.getItem("AccessToken");
    let header = {
      authorization: this.accessToken,
    };
    return this.http.get(`${this.url}/public/getProfileInformation`, {
      headers: header,
    });
  }
  getAgencyProfile() {
    this.spinner.show();
    this.accessToken = localStorage.getItem("egency_token");
    let header = {
      authorization: this.accessToken,
    };
    return this.http.get(`${this.url}/agensi/getProfileInformation`, {
      headers: header,
    });
  }
  getdbklProfile() {
    this.spinner.show();
    this.accessToken = localStorage.getItem("AccessToken");
    let header = {
      authorization: this.accessToken,
    };
    return this.http.get(`${this.url}/dbkl/getProfileInformation`, {
      headers: header,
    });
  }
  getListOfFeedbacks() {
    if (localStorage.getItem("isAgency") == "false") {
      this.spinner.hide();
    } else {
      this.spinner.show();
    }
    this.accessToken1 = localStorage.getItem("egency_token");
    let header = {
      authorization: this.accessToken1,
      accept: "application/json",
    };
    this.serialNo = localStorage.getItem("serielno");

    return this.http.get(`${this.url}/agensi/getFeedbackList`, {
      headers: header,
    });
  }
}
