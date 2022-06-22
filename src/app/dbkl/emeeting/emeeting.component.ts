import { HttpClient } from "@angular/common/http";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { user } from "src/app/table/usermanage";
import { usermanagement } from "src/app/table/usermanagment";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-emeeting",
  templateUrl: "./emeeting.component.html",
  styleUrls: ["./emeeting.component.css"],
})
export class EmeetingComponent implements OnInit {
  bill_mesyuarat: any;
  jenis_mesyuarat: any;
  jenis_jawatankuasa: any;
  tarikh_mesyuarat: any;
  hingga: any;
  data: any;
  loginError: boolean;
  errorMsg: any;
  basePublicUrl = environment.basePublicUrl;
  keyValue: any;
  meeting_id: any;
  is1st: boolean;
  Committee: Object;
  submitted: boolean = false;
  searchGroup: FormGroup;
  newGroup: FormGroup;
  until: any;
  masa_mesyuarat: any;
  check: boolean;
  message: any;
  isTable:boolean;
  username: string;
  isAdminType: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/emeeting");
    this.newGroup = new FormGroup({
      bill_mesyuarat: new FormControl("", [Validators.required]),
      jenis_mesyuarat: new FormControl("", [Validators.required]),
     jenis_jawatankuasa: new FormControl("", [Validators.required]),
      tarikh_mesyuarat: new FormControl("", [Validators.required]),
      masa_mesyuarat: new FormControl("", [Validators.required]),
      hingga: new FormControl("", [Validators.required]),
    });
    this.searchGroup = new FormGroup({
      jenis_mesyuarat: new FormControl("", [Validators.required]),
      jenis_jawatankuasa: new FormControl("", [Validators.required]),
    });
    this.is1st = false;
    this.isTable = false;
    this.hingga;
    this.masa_mesyuarat;
    this.tarikh_mesyuarat;
    this.jenis_jawatankuasa;
    this.jenis_mesyuarat;
    this.bill_mesyuarat;

    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getCommitteeList", { headers: headers })
      .subscribe(
        (res) => {
          this.Committee = res;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  addbutton() {
    this.is1st = true;
  }
  backtotop() {
    window.scroll(0, 0);
  }

  get f() {
    return this.newGroup.controls;
  }
  new() {
    this.submitted = true;
    if (this.newGroup.invalid) {
      return;
    }
    this.router.navigate(["/dbkl/newemeeting"], {
      queryParams: {
        value: this.bill_mesyuarat,
        value1: this.jenis_mesyuarat,
        value2: this.jenis_jawatankuasa,
        value3: this.tarikh_mesyuarat,
        value4: this.hingga,
        value5: this.masa_mesyuarat,
      },
    });
  }

  search() {
    // console.log("Hih"+this.jenis_mesyuarat+"hi");
    // console.log("Hih"+this.jenis_jawatankuasa+"hi");
    if (
      this.jenis_mesyuarat == undefined ||
      this.jenis_jawatankuasa == undefined
    ) {
      this.check = true;
      // console.log(this.check);
      return;
    }
    this.router.navigate(["/dbkl/listemeeting"], {
      
      queryParams: {
        value: this.jenis_mesyuarat,
        value1: this.jenis_jawatankuasa,
      },


    });
    // this.isTable=true;
    // this.update();
  }
  update() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };
    let body = {
      jenis_mesyuarat: this.jenis_mesyuarat,
      jawatankuasa_mesurat: this.jenis_jawatankuasa,
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/listOfDetailedMeeting", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
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
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

  settings = {
    // selectMode: 'multi',
    actions: {
      columnTitle: "Tindakan",
      position: "right",
      edit: false,
      delete: false,
      add: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit"></i>',
        },
      ],
    },
    columns: {
      tajuk_mesyuarat: {
        title: "Tajuk Mesyuarat",
      },
      jenis_mesyuarat: {
        title: "Jenis mesyuarat",
      },
      jawatankuasa_mesurat: {
        title: " Jawatankuasa Mesyuarat",
      },
      tarikh_mesyuarat: {
        title: "Tarikh perjumpaan",
      },
      masa_mesyuarat: {
        title: "Masa perjumpaan",
      },
    },
  };

  onCustomEvent(event) {
    switch (event.action) {
      case "routeToUpdateApplicationForm":
        // console.log(event.data);
        this.keyValue = event.data;
        this.spinner.hide();
        this.router.navigateByUrl(
          "dbkl/getemeeting?id=" + this.keyValue.detailed_meeting_id
        );
        break;
    }
  }
}
