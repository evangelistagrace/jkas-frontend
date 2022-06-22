import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { user } from "src/app/table/usermanage";
import { usermanagement } from "src/app/table/usermanagment";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-listemeeting",
  templateUrl: "./listemeeting.component.html",
  styleUrls: ["./listemeeting.component.css"],
})
export class ListemeetingComponent implements OnInit {
  data: any;
  loginError: boolean;
  errorMsg: any;
  basePublicUrl = environment.basePublicUrl;
  keyValue: any;
  bill_mesyuarat: any;
  jenis_jawatankuasa: any;
  jenis_mesyuarat: any;
  hingga: any;
  meeting_id: string;
  tarikh_mesyuarat: any;
  masa_mesyuarat: any;
is1st:boolean;
  detailed_meeting_id: string;
  submitted: boolean;
  newGroup: any;
  Committee: Object;
  check: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.newGroup = new FormGroup({
      bill_mesyuarat: new FormControl("", [Validators.required]),
      jenis_mesyuarat: new FormControl("", [Validators.required]),
      jenis_jawatankuasa: new FormControl("", [Validators.required]),
      tarikh_mesyuarat: new FormControl("", [Validators.required]),
      masa_mesyuarat: new FormControl("", [Validators.required]),
      hingga: new FormControl("", [Validators.required]),
    });
  
    this.spinner.show();
    this.jenis_mesyuarat = this.route.snapshot.queryParamMap.get("value");
    this.jenis_jawatankuasa = this.route.snapshot.queryParamMap.get("value1");
    let key = localStorage.getItem("AccessToken");
    localStorage.setItem(
      "path",
      "/dbkl/listemeeting?value=" +
        this.jenis_mesyuarat +
        "&value1=" +
        this.jenis_jawatankuasa
    );
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
        //  console.log(res);
          
          this.spinner.hide();
          this.data = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );

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
  backtotop() {
    window.scroll(0, 0);
  }

  selectChangeHandler(event: any) {
    this.jenis_jawatankuasa = event.target.value;
  // console.log(this.jenis_jawatankuasa1);
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
    //console.log("Hih"+this.jenis_mesyuarat+"hi");
    //console.log("Hih"+this.jenis_jawatankuasa+"hi");
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
    this.update();
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
        title: "Jenis Mesyuarat",
      },
      jawatankuasa_mesurat: {
        title: " Jawatankuasa Mesyuarat",
      },
      tarikh_mesyuarat: {
        title: "Tarikh",
      },
      masa_mesyuarat: {
        title: "Masa",
      },
    },
  };
  addbutton() {
    this.is1st = true;
  }
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
  update() {
  
    this.spinner.show();
  
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };
    let body = {
      jenis_mesyuarat:this.jenis_mesyuarat,
      jawatankuasa_mesurat:this.jenis_jawatankuasa,
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/listOfDetailedMeeting", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
         // this.check = false;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
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
 this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }
}
