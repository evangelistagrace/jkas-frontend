import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { ListOfFeedback } from "src/app/table/ListOfFeedbackTable";
import { TableService } from "src/app/table/table.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-job-feedback",
  templateUrl: "./job-feedback.component.html",
  styleUrls: ["./job-feedback.component.css"],
})
export class JobFeedbackComponent implements OnInit {

  data: any;
  serielno: any;
  parliamen: string;
  lokasi: string;
  name: string;
  status: string;
  npid: string;
  p;
  feedbacklist: any = [];
  baseUrl = environment.basePublicUrl;
  display: string;

  listOfFeeback: any[];
  selectedRows: any;
  rowarray: any = [];
  IdsArray: any = [];
  keyValue: any;
  listOfIds: string;
  errorDisplay: string;
  show: boolean;
  access_token: string;
  agensi_access_token: string;
  myValueSub: Subscription;
  lang: string;
  errormsg: string;
  npErrorMessage: any;
  agency_token: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private tservice: TableService
  ) {}

  ngOnInit() {
    this.agency_token = localStorage.getItem('egency_token');
    if (!this.agency_token) {
      this.router.navigateByUrl("/agency");
    }
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "agency/job-feedback");

    window.scroll(0, 0);
    this.show = false;
    this.access_token = localStorage.getItem("egency_token");
    // console.log(this.access_token);
    this.serielno = localStorage.getItem("serielno");
    this.parliamen = localStorage.getItem("parlimen");
    this.lokasi = localStorage.getItem("lokasi");
    this.name = localStorage.getItem("name");
    this.status = localStorage.getItem("status");
    this.npid = localStorage.getItem("npid");
    let headers = {
      accept: "application/json",
      Authorization: this.access_token,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,DELETE,PUT",
    };

    this.show = true;
    this.myValueSub = this.http
      .get(this.baseUrl + "/agensi/getFeedbackList", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log(res)

          this.spinner.hide();
          this.feedbacklist = res;
          localStorage.setItem("feedbackid", this.feedbacklist);
          if (res) {
          } else {
          }
        },
        (error) => {
          localStorage.setItem("npid", "");
          localStorage.setItem("isAgency", "false");
          this.spinner.hide();
          this.openErrorModal();
          this.npErrorMessage = error["error"]["message"];
          if (this.npErrorMessage == "feedback_not_exists") {
             if (this.lang == "en") {
              this.errormsg = "No feedbacks to return";
            }
            else {
              this.errormsg = "Tiada maklum balas untuk dikembalikan";
            }
          }
          
        }
      );

    this.tservice.getListOfFeedbacks().subscribe((data: ListOfFeedback[]) => {
      this.listOfFeeback = data;
      this.show = false;
      this.spinner.hide();
    }),
      (error) => {
        this.spinner.hide();
      };
  }
  routeToUpdateFeedback(event) {
    // console.log("hello " + JSON.stringify(event.data.feedback_id));
    this.router.navigate(["/agency/update-feedback/" + event.data.feedback_id]);
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  settings = {
    selectMode: "multi",

    actions: {
      columnTitle: "Tindakan",
      position: "right",
      edit: false,
      add: false,
      delete: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateFeedbackForm",
          type: "html",
          title: '<i class="fa fa-edit custom-font"></i>',
        },
        // {
        //   name: "onUserDelete",
        //   type: "html",
        //   title: '<i class="fa fa-trash custom-font" ></i>',
        // },
      ],
    },
    columns: {
      feedback_id: {
        title: "Id Maklum Balas",
      },
      nama_pegawai_merinyu: {
        title: "Nama Pemeriksa",
      },
      organisasi: {
        title: "Organisasi",
      },
      kerja_selesail: {
        title: "Status Kerja",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          if (row.kerja_selesail == true) {
            return "<div class='customformat'><i class='fa fa-check text-success ' aria-hidden='true'></i></div>";
          } else {
            return "<div class='customformat'><i class='fa fa-times text-danger' aria-hidden='true'></i></div>";
          }
        },
      },
    },
  };

  onUserRowSelect(event) {
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].feedback_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
    // console.log(this.listOfIds);
    // console.log(this.listOfIds.length);
    // console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
  }
  onCustomEvent(event) {
    this.spinner.show();
    switch (event.action) {
      case "routeToUpdateFeedbackForm": {
        // console.log(event.data);
        this.keyValue = event.data;
        this.router.navigateByUrl(
          "/agency/update-feedback/" + this.keyValue.feedback_id
        );
        break;
      }
      case "onUserDelete": {
        // console.log(event.data);
        this.keyValue = event.data;
        // console.log(this.keyValue.feedback_id);
        this.deleteFedback(this.keyValue.feedback_id);
        break;
      }
    }
  }
  deleteSelected() {
    this.agensi_access_token = localStorage.getItem("egency_token");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: this.agensi_access_token,
      }),
      body: {
        feedback_id_list: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    // console.log(options);
    this.http
      .delete(environment.basePublicUrl + "/agensi/deleteFeedbackList", options)
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        // this.reloadComponent();
      });
  }
  deleteFedback(id) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
      }),
      body: {
        feedback_id_list: id,
      },
    };
    // console.log(options);
    this.http
      .delete(environment.basePublicUrl + "/agensi/deleteFeedbackList", options)
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.reloadComponent();
      });
  }
  reloadComponent() {
    window.scroll(0, 0);
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    this.errorDisplay = "none";
    this.router.navigateByUrl("/agency");
    localStorage.clear();
  }
  logout() {
    localStorage.setItem("isAgency", "false");
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: this.access_token,
    };
    let body = {};
    // console.log(header);
    this.http
      .post(environment.basePublicUrl + "/agensi/logout", body, {
        headers: header,
      })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/agency");
          localStorage.removeItem("egency_token");
          localStorage.removeItem("npid");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  ngOnDestroy() {
    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
    }
  }

  backtotop() {
    window.scroll(0, 0);
   
  }
}
