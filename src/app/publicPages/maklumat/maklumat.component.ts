import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { TableService } from "src/app/table/table.service";
import { Maklumat } from "src/app/table/maklumat";
import { UploadService } from "src/app/services/upload.service";
import { UploadfileComponent } from "src/app/uploadfile/uploadfile.component";
import { Subject } from "rxjs";
import { UploadbuttonComponent } from "src/app/uploadbutton/uploadbutton.component";

@Component({
  selector: "app-maklumat",
  templateUrl: "./maklumat.component.html",
  styleUrls: ["./maklumat.component.css"],
})
export class MaklumatComponent implements OnInit {
  userType: string;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  currentInput: any;
  errorMsg: any;
  msg: any;
  SERVER_URL: any = environment.basePublicUrl + "/public/uploadFile";
  accessToken: string;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });

  firstfile: any;
  fileName: any;
  username: string;
  maklumat: any;
  applicationSerialNo: string;
  token: string;
  IdsArray: any[];
  selectedRows: any;
  listOfIds: string;
  keyValue: any;
  subject_test: any;
  lang: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private tservice: TableService,
    private s: UploadService
  ) {
    let token = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
    if (!token) {
      this.router.navigateByUrl("/publicLogin");
    }
    this.applicationSerialNo = this.route.snapshot.paramMap.get("id");
    this.token = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.token,
    };
    this.http
      .get(
        environment.basePublicUrl +
        "/public/siteVisitInformation/" +
        this.applicationSerialNo,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          this.maklumat = data;
         // console.log(this.maklumat);
          this.spinner.hide();
        },
        (error) => {
          this.router.navigateByUrl("/public/publicpage");
        }
      );
  }

  ngOnInit() {
   

    this.lang = localStorage.getItem("lang");
    this.subject_test = new Subject();
    this.subject_test.subscribe({
      next: (v) => console.log(`From Subject : ${v}`),
    });
    window.scroll(0, 0);

    this.spinner.show();
    this.getMaklumatDetails();
    this.accessToken = localStorage.getItem("AccessToken");
    this.applicationSerialNo = this.route.snapshot.paramMap.get("id");
    localStorage.setItem("path", "public/maklumat/" + this.applicationSerialNo);
    // console.log(this.applicationSerialNo);
  }

  settings = {
    //selectMode: "multi",
    actions: false,
    // actions: {
    //   position: "right",
    //   edit: false,
    //   delete: false,
    //   add: false,
    //   new: false,
    //   custom: [
    //     {
    //       name: "routeToChecklistForm",
    //       type: "html",
    //       title: '<i class="fa fa-edit custom-font"></i>',
    //     },
    //   ],
    // },
    columns: {
      no_siri_permohonan: {
        title: "No Siri Permohonan",
      },
      tarikh: {
        title: "Tarikh",
      },
      lawatan_tapak: {
        title: "Lawatan Tapak",
      },
      tarikh_lawatan_tapak: {
        title: "Tarikh Lawatan Tapak",
      },
      keputusan_lawatan_tapak: {
        title: "Keputusan Lawatan Tapak",
      },
      makalumat_ketidakpatuhan: {
        title: "Maklumat Ketidakpatuhan",
        // type: "html",
        // valuePrepareFunction: (cell, row) => {
        //   if (row.makalumat_ketidakpatuhan !== null) {
        //     localStorage.setItem("applicationSerialNo", row.no_siri_permohonan);
        //     return (
        //       "<a target='_blank' href=" +
        //       "/" +
        //       this.lang +
        //       "/public/noncompliance/" +
        //       row.site_id +
        //       " >" +
        //       row.makalumat_ketidakpatuhan +
        //       "</a>"
        //     );
        //   } else {
        //     return "<p>-</p>";
        //   }
       //  },
       type: "custom",
       renderComponent: UploadbuttonComponent,
       valuePrepareFunction: (cell, row) => {
         this.subject_test.next(row.site_id);
         this.s.value = row.site_id;
         this.s.getMakumatData = this.maklumat;
       },
      },
      maklum_balas_ketidakpatuhan: {
        title: "Maklum Balas Ketidakpatuhan",
        type: "custom",
        renderComponent: UploadfileComponent,
        valuePrepareFunction: (cell, row) => {
          this.subject_test.next(row.site_id);
          this.s.value = row.site_id;
          this.s.getMakumatData = this.maklumat;
        },
      },
    },
  };
  backtotop() {
    window.scroll(0, 0);
  }
  onUserRowSelect(event) {
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;

    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].site_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
    // console.log(this.listOfIds);
    // console.log(this.listOfIds.length);
    // console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
  }
  onCustomEvent(event) {
    this.spinner.show();
    switch (event.action) {
      case "routeToChecklistForm":
        // console.log(event.data);
        this.keyValue = event.data;
        this.spinner.hide();
        this.router.navigateByUrl(
          "public/showchecklist/" + this.keyValue.dokumen_senarai
        );
        break;
    }
  }
  deleteSelected() {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: this.accessToken,
      }),
      body: {
        site_visit_id_list: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    // console.log(options);
    this.http
      .delete(
        environment.basePublicUrl + "/public/deleteSiteVisitInformation",
        options
      )
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.reloadComponent();
      });
  }
  reloadComponent() {
    this.backtotop();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {
      tarikh: this.data[0].tarikh,
      lawatan_tapak: this.data[0].lawatan_tapak,
      tarikh_lawatan_tapak: this.data[0].tarikh_lawatan_tapak,
      keputusan_lawatan_tapak: this.data[0].keputusan_lawatan_tapak,
      makalumat_ketidakpatuhan: this.data[0].makalumat_ketidakpatuhan,
      maklum_balas_ketidakpatuhan: this.fileName,
    };

    this.http
      .put(
        this.basePublicUrl +
        "/public/updateSiteVisitInformation/" +
        this.data[0].site_id,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          // console.log(res)
          this.msg = res;
          if (this.msg.status == "success") {
            window.location.reload();
          }
        },
        (error) => {
          this.loginError = true;
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

    this.http
      .post(this.basePublicUrl + "/public/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/publicLogin");
          localStorage.clear();

          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  getMaklumatDetails() { }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
