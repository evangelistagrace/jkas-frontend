import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { $ } from "jquery";
import IdleTimer from "./IdleTimer/IdleTimer.js";
declare const ga: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  mapCenter = [101.6869, 3.139];
  basemapType = "osm";
  mapZoomLevel = 12;

  mapCenter1 = [101.6869, 3.139];
  basemapType1 = "osm";
  mapZoomLevel1 = 12;
  title = "Active";
  baseUrl = environment.basePublicUrl;
  page: string;
  timer: any;
  public_access_token: string;
  agensi_access_token: string;
  dbkl_access_token: string;
  isUser: string;
  path: string;

  constructor(
    public router: Router,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        ga("set", "page", event.urlAfterRedirects);
        ga("send", "pageview");
      }
    });
  }
  logout() {
    this.path = localStorage.getItem("path");
    // this.spinner.show();
    this.public_access_token = localStorage.getItem("public_access_token");
    this.agensi_access_token = localStorage.getItem("egency_token");
    this.dbkl_access_token = localStorage.getItem("dbkl_access_token");
    this.isUser = localStorage.getItem("isUser");
    if (this.isUser == "public") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.public_access_token,
      };

      let body = {};
      this.spinner.show();

      this.http
        .post(this.baseUrl + "/public/logout", body, { headers: header })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/publicLogin");
            localStorage.clear();
            this.spinner.hide();
            localStorage.setItem("ifagain", "false");
          },
          (error) => {
            this.spinner.hide();
            // this.openErrorModal();
          }
        );
    } else if (this.isUser == "dbkl") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.dbkl_access_token,
      };

      let body = {};
      this.spinner.show();

      this.http
        .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/dbkl/adminregister");
            localStorage.clear();
            this.spinner.hide();
            localStorage.setItem("ifagain", "false");
          },
          (error) => {
            this.spinner.hide();
            // this.openErrorModal();
          }
        );
    } else if (this.isUser == "agensi") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.agensi_access_token,
      };
      let body = {};
      this.spinner.show();

      this.http
        .post(environment.basePublicUrl + "/agensi/logout", body, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/agency");
            localStorage.clear();
            this.spinner.hide();
            localStorage.setItem("ifagain", "false");
          },
          (error) => {
            this.spinner.hide();
            // this.openErrorModal();
          }
        );
    }
  }
  ngOnInit() {
    // localStorage.setItem("isUser", "none");
    let url = window.location.href;
    this.page = localStorage.getItem("page");
    if ("ifagain" in localStorage) {
    } else {
      localStorage.setItem("ifagain", "true");
    }
    if (localStorage.getItem("ifagain") == "true") {
      this.isUser = localStorage.getItem("isUser");
      this.page = localStorage.getItem("page");
      this.timer = new IdleTimer({
        timeout: 600, //expired after 10 secs
        onTimeout: () => {
          // this.title = "Timeout";
          this.logout();
        },
      });
    } else {
      //console.log("ur already logged out dont try again...");
    }
    //
    // this.timer = new IdleTimer({
    //   timeout: 600, //expired after 10 secs
    //   onTimeout: () => {
    //     this.isUser = localStorage.getItem("isUser");
    //     if (
    //       this.isUser == "public" ||
    //       this.isUser == "agensi" ||
    //       this.isUser == "dbkl"
    //     ) {
    //       this.title = "Timeout";
    //       this.logout();
    //       // console.log("logout");
    //     } else {
    //       // console.log("nothing to do");
    //       this.spinner.hide();
    //     }
    //   },
    // });
  }

  openErrorModal() {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy() {
    this.timer.clear();
  }
  mapLoadedEvent(status: boolean) {
    // console.log('The map loaded: ' + status);
  }
  mapLoadedEvent1(status: boolean) {
    // console.log('The map loaded: ' + status);
  }
}
