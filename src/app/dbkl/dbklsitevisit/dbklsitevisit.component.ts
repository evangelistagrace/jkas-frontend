import { DatePipe } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { DbklfirstdropdownComponent } from "src/app/dbklfirstdropdown/dbklfirstdropdown.component";
import { DbklpdfComponent } from "src/app/dbklpdf/dbklpdf.component";
import { DbklseconddropdownComponent } from "src/app/dbklseconddropdown/dbklseconddropdown.component";
import { DbklthirddropdownComponent } from "src/app/dbklthirddropdown/dbklthirddropdown.component";
import { DbkluploadbuttonComponent } from "src/app/dbkluploadbutton/dbkluploadbutton.component";
import { UploadnoncomplianceformService } from "src/app/services/uploadnoncomplianceform.service";
import { Maklumat } from "src/app/table/maklumat";
import { TableService } from "src/app/table/table.service";
import { UploadnoncomplianceComponent } from "src/app/uploadnoncompliance/uploadnoncompliance.component";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dbklsitevisit",
  templateUrl: "./dbklsitevisit.component.html",
  styleUrls: ["./dbklsitevisit.component.css"],
})
export class DbklsitevisitComponent implements OnInit {
  userType: string;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  currentInput: any;
  errorMsg: any;
  msg: any;
  url: any = environment.basePublicUrl;
  SERVER_URL: any = this.url + "/public/uploadFile";
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
  selected: boolean;
  display: string;
  display2: string;
  lang: string;
  sucessMsg: string;
  errmsg: string;
  displaysuccess: string;
  errorDisplay: string;
  nosiri: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private tservice: TableService,
    private up: UploadnoncomplianceformService,
    private datePipe: DatePipe 
  ) {
    let token = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    this.applicationSerialNo = this.route.snapshot.queryParamMap.get("id");
    // console.log(this.applicationSerialNo);

    this.http
      .get(
        environment.basePublicUrl +
        "/public/siteVisitInformation/" +
        this.applicationSerialNo,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.maklumat = res;
          this.spinner.hide();
          this.nosiri=this.maklumat[0].no_siri_permohonan;
          localStorage.setItem("nosiri",this.maklumat[0].no_siri_permohonan);
          // console.log(this.maklumat);
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          // console.log("yes");

          // this.errorMsg = error["error"]["message"];
        }
      );
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.lang = localStorage.getItem("lang");
    this.applicationSerialNo = this.route.snapshot.queryParamMap.get("id");
    localStorage.setItem("appno", this.applicationSerialNo);
    localStorage.setItem(
      "path",
      "/dbkl/dbklsitevisit?id=" + this.applicationSerialNo
    );
    this.spinner.show();
    this.getMaklumatDetails();
    this.accessToken = localStorage.getItem("dbkl_access_token");
  }

  settings = {
    selectMode: "multi",
    noDataMessage: "Tiada Data Dijumpai",
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
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd-MM-yyyy');
          return formatted; 
        }
      },
      lawatan_tapak: {
        title: "Lawatan Tapak",
        type: "custom",
        renderComponent: DbklfirstdropdownComponent,
        valuePrepareFunction: (cell, row) => {
          this.up.value = row.site_id;
          this.up.getDetails = this.maklumat;
        },
      },
      tarikh_lawatan_tapak: {
        title: "Tarikh Lawatan Tapak",
        type: "custom",
        renderComponent: DbklseconddropdownComponent,
        valuePrepareFunction: (cell, row) => {
          this.up.value = row.site_id;
          this.up.getDetails = this.maklumat;
        },
      },
      keputusan_lawatan_tapak: {
        title: "Keputusan Lawatan Tapak",
        type: "custom",
        renderComponent: DbklthirddropdownComponent,
        valuePrepareFunction: (cell, row) => {
          this.up.value = row.site_id;
          this.up.getDetails = this.maklumat;
        },
      },
      makalumat_ketidakpatuhan: {
        title: "Borang Ketidakpatuhan",
        type: "custom",
        renderComponent: DbkluploadbuttonComponent,
        valuePrepareFunction: (cell, row) => {
          this.up.value = row.site_id;
          this.up.getDetails = this.maklumat;
        },
      },
      maklum_balas_ketidakpatuhan: {
        title: "Maklum Balas Ketidakpatuhan",
        type: "custom",
        renderComponent: DbklpdfComponent,
        valuePrepareFunction: (cell, row) => {
          this.up.value = row.site_id;
          this.up.getDetails = this.maklumat;
        },
      },
    },
  };
  backtotop() {
    window.scroll(0, 0);
  }
  onUserRowSelect(event) {
    this.selected = true;
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;

    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].site_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
    console.log(this.listOfIds);

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
    this.closeModalDelete();
    this.spinner.show();
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
    this.http
      .delete(
        environment.basePublicUrl + "/public/deleteSiteVisitInformation",
        options
      )
      .subscribe((s) => {
        this.spinner.hide();
        if (s['message'] == "site_visit_deleted") {
          if (this.lang == 'en') {
            this.sucessMsg = "Site Visit Information List deleted Successfully!";
          }
          else {
            this.sucessMsg = "Senarai Maklumat Lawatan Laman web berjaya dihapuskan!"
          }
        }

        this.openSuccessDelete();

      },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "site_visit_not_deleted") {
            if (this.lang == 'en') {
              this.errmsg = "Site Visit Information List  could not be deleted! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "Senarai Maklumat Lawatan Tapak tidak dapat dihapuskan! Sila rujuk log konsol untuk keterangan lebih lanjut."
            }
          }

          this.openErrorDelete();
        }
      );
  }
  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display = "block";
 
    }
    else if (this.IdsArray.length == 0) {
      this.display = "block";
    }
    else {
      this.opendeletemodal();

    }
  }
  

  closeModal() {
    this.display = "none";
  }
  opendeletemodal() {
    this.display2 = "block";
  }
  closeModalDelete() {
    this.display2 = "none";
  }
  getMaklumatDetails() { }


  openSuccessDelete() {
    this.displaysuccess = "block"
  }

  closeSuccessDelete() {
    this.displaysuccess = "none"
    window.location.reload();
  }

  openErrorDelete() {
    this.errorDisplay = "block";
  }

  closeErrorDelete() {
    this.errorDisplay = "none";
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
