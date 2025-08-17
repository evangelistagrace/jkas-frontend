import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TableService } from "src/app/table/table.service";
import * as $ from "jquery";
import { environment } from "src/environments/environment";
import { MeetingmodalComponent } from "src/app/meetingmodal/meetingmodal.component";
import { MeetingService } from "src/app/services/meeting.service";
import { DropdownComponent } from "src/app/dropdown/dropdown.component";
import { UndeletedropdownComponent } from "src/app/undeletedropdown/undeletedropdown.component";
import { DbklppsppaComponent } from "src/app/pdfs/dbklppsppa/dbklppsppa.component";
import { FiltercustombuttonComponent } from "src/app/filtercustombutton/filtercustombutton.component";
// import { FilterdoublecustombuttonComponent } from "src/app/filterdoublecustombutton/filterdoublecustombutton.component";
import { TextboxComponent } from "src/app/textbox/textbox.component";
import { DbkluploadbuttonComponent } from "src/app/dbkluploadbutton/dbkluploadbutton.component";
import { Observable } from "rxjs";
import { Ng2SmartTableComponent } from "ng2-smart-table";
import { DbklchecklistComponent } from "../dbklchecklist/dbklchecklist.component";
import { DatePipe } from "@angular/common";
import { DbklppsppacatatanComponent } from "src/app/dbklppsppacatatan/dbklppsppacatatan.component";
import { Table } from "primeng/table";

@Component({
  selector: "app-psppaapplicationproccess",
  templateUrl: "./psppaapplicationproccess.component.html",
  styleUrls: ["./psppaapplicationproccess.component.css"],
})
export class PsppaapplicationproccessComponent implements OnInit {
  @ViewChild("dt") table: Table;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  keyValue: any;
  count: number = 0;
  meetingData: any;
  lang: string;
  IdsArray: any[];
  selectedRows: any;
  listOfIds: string;
  displaysuccess: string;
  errorDisplay1: string;
  selected: boolean;
  display: string;
  display2: string;
  errmsg: string;
  sucessMsg: string;
  username: string;
  isAdminType: string;
  AccessToken: string;
  baseUrl = environment.basePublicUrl;

  // Add status filter options
  statusOptions = [
    { label: "Lengkap", value: true },
    { label: "Tidak Lengkap", value: false },
  ];

  // Properties for filters
  siriFilter: string;
  dateFilter: Date;
  statusFilter: any;

  // Add year range for date picker
  yearRange: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService,
    // private table: Ng2SmartTableComponent,
    private datePipe: DatePipe
  ) {
    // Create a year range from 10 years ago to 10 years in the future
    const currentYear = new Date().getFullYear();
    this.yearRange = `${currentYear - 10}:${currentYear + 10}`;
  }

  ngOnInit() {
    this.AccessToken = localStorage.getItem("AccessToken");
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.lang = localStorage.getItem("lang");
    let key = localStorage.getItem("AccessToken");
    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .get(environment.basePublicUrl + "/dbkl/getAllDetailedMeeting", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.meetingData = res;
          this.getData();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );

    localStorage.setItem("path", "/dbkl/applicationprocess");
    $(document).ready(function () {
      $("#yearOfApplication").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
          $(this).toggle($(this).text().indexOf(value) > -1);
        });
      });
    });
  }

  // Add this method to prepare the data for date filtering
  setupDateFiltering() {
    if (this.table && this.data) {
      // Customize the filter function for the tarikh_permohonan column
      this.table.filterService.register(
        "dateIs",
        (value: string, filter: string): boolean => {
          if (filter === undefined || filter === null || filter.trim() === "") {
            return true;
          }

          if (value === undefined || value === null) {
            return false;
          }

          // Convert both to date objects for comparison
          const filterDate = new Date(filter);
          const valueDate = new Date(value);

          // Compare only the date parts (year, month, day)
          return (
            filterDate.getFullYear() === valueDate.getFullYear() &&
            filterDate.getMonth() === valueDate.getMonth() &&
            filterDate.getDate() === valueDate.getDate()
          );
        }
      );

      // Add custom filter for lawatan tapak
      this.table.filterService.register(
        "lawatanExists",
        (value: any, filter: boolean): boolean => {
          if (filter === undefined || filter === null) {
            return true;
          }

          // If filter is true, check if value exists and is not null/empty
          // If filter is false, check if value doesn't exist or is null/empty
          if (filter) {
            return value !== undefined && value !== null && value !== "";
          } else {
            return value === undefined || value === null || value === "";
          }
        }
      );
    }
  }

  getData() {
    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getPublicApplicationList2", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          console.log(this.data);

          // Call this after data is loaded
          this.setupDateFiltering();
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  settings = {
    selectMode: "multi",
    noDataMessage: "Tiada Data Dijumpai",
    actions: {
      columnTitle: "TINDAKAN",
      position: "right",
      edit: false,
      delete: false,
      add: false,
      search: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit custom-font"></i>',
        },
      ],
    },
    search: {
      searchButtonContent:
        '<img src="assets/images/icons/outline/settings-2-outline.svg" width="20" height="20" >',
    },
    columns: {
      no_siri_permohonan: {
        title: "1.NO SIRI PERMOHONAN",
      },
      tarikh_permohonan: {
        title: "2.TARIKH PERMOHONAN",
        valuePrepareFunction: (date) => {
          return this.datePipe.transform(date, "dd MMM yyyy");
        },
      },
      status_semakan_dokumen: {
        title: "3.STATUS SEMAKAN DOKUMEN",
        valuePrepareFunction: (cell, row) => {
          return cell ? "Lengkap" : "Tidak Lengkap";
        },
      },
      mesyuarat_permohanan_serahan_kawasan: {
        title: "4.MESYUARAT PERMOHONAN SERAHAN KAWASAN",
        type: "custom",
        renderComponent: MeetingmodalComponent,
        valuePrepareFunction: (cell, row) => {
          this.met.value = row.no_siri_permohonan;
          this.met.getMeetingData = this.meetingData;
        },
      },
      maklumat_lawatan_tapak_id: {
        title: "5.TETAPAN LAWATAN TAPAK",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "dbkl/dbklsitevisit?id=" +
            row.no_siri_permohonan +
            ">Kemaskini Maklumat</a>"
          );
        },
      },
      surat_penyerahan_kawasan: {
        title: "6.SURAT PENYERAHAN KAWASAN ",
        type: "custom",
        renderComponent: DbklppsppaComponent,
        valuePrepareFunction: (cell, row) => {
          this.met.value = row.no_siri_permohonan;
          this.met.getData = this.data;
        },
      },
      // text: {
      //   title: "7.CATATAN",
      //   type: "custom",
      //   renderComponent: DbklppsppacatatanComponent,
      //   valuePrepareFunction: (cell, row) => {
      //     this.met.value = row.no_siri_permohonan;
      //     this.met.getData = row.text;
      //   }
      // },
    },
  };

  // Add this method to handle the direct button click
  routeToUpdateApplicationForm(rowData) {
    this.keyValue = rowData;
    localStorage.setItem("date", this.keyValue.tarikh_permohonan);
    this.spinner.hide();
    this.router.navigateByUrl(
      "dbkl/dbklchecklist?id=" + this.keyValue.no_siri_permohonan
    );
  }

  // Keep the original method for backward compatibility
  onCustomEvent(event) {
    switch (event.action) {
      case "routeToUpdateApplicationForm":
        this.keyValue = event.data;
        localStorage.setItem("date", this.keyValue.tarikh_permohonan);
        this.spinner.hide();
        this.router.navigateByUrl(
          "dbkl/dbklchecklist?id=" + this.keyValue.dokumen_senarai
        );
        break;
    }
  }

  backtotop() {
    window.scroll(0, 0);
  }

  onSelectionChange(event) {
    this.IdsArray = [];
    this.selectedRows = event;

    if (this.selectedRows && this.selectedRows.length > 0) {
      for (let i = 0; i < this.selectedRows.length; i++) {
        this.IdsArray.push(this.selectedRows[i].application_id);
      }
      this.listOfIds = JSON.stringify(this.IdsArray);
    }
  }

  deleteSelected() {
    this.closeModalDelete();
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: key,
      }),
      body: {
        application_id_list: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    // console.log(options);

    this.http
      .delete(
        environment.basePublicUrl + "/dbkl/deletePublicApplicationList",
        options
      )
      .subscribe(
        (s) => {
          this.spinner.hide();

          if (s["message"] == "application_list_deleted") {
            if (this.lang == "en") {
              this.sucessMsg = "Application List deleted Successfully!";
            } else {
              this.sucessMsg = "Senarai Aplikasi berjaya dipadam!";
            }
          }

          this.openSuccess();
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
          //console.log(this.errorMsg);

          if (this.errorMsg == "application_list_not_undeleted") {
            if (this.lang == "en") {
              this.errmsg =
                "Application List  could not be undeleted! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Senarai Aplikasi tidak dapat dihapus! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }

          this.openError();
        }
      );
  }

  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display = "block";
    } else if (this.IdsArray.length == 0) {
      this.display = "block";
    } else {
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

  openSuccess() {
    this.displaysuccess = "block";
  }

  closeSuccess() {
    this.displaysuccess = "none";
    window.location.reload();
  }

  openError() {
    this.errorDisplay1 = "block";
  }

  closeError() {
    this.errorDisplay1 = "none";
  }
  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.AccessToken,
    };
    let body = {};
    this.http
      .post(this.basePublicUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
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

  // Filter methods that will be called from the template
  onFilterSiri(value: string) {
    this.table.filter(value, "no_siri_permohonan", "contains");
  }

  onFilterDate(value: Date) {
    if (value) {
      // Reset time part to compare dates only
      const dateVal = new Date(value);
      dateVal.setHours(0, 0, 0, 0);

      this.table.filter(dateVal.toISOString(), "tarikh_permohonan", "dateIs");
    } else {
      this.table.filter(null, "tarikh_permohonan", "dateIs");
    }
  }

  onFilterStatus(value: any) {
    this.table.filter(value, "status_semakan_dokumen", "equals");
  }

  // Add options for Tetapan Lawatan Tapak filter
  lawatanOptions = [
    { label: "Patuh", value: 'Patuh' },
    { label: "Tidak Patuh", value: 'Tidak Patuh' },
  ];

  // Add property for the filter
  lawatanFilter: any;

  // Add filter method for Tetapan Lawatan Tapak
  onFilterLawatan(value: any) {
    this.table.filter(value, "site_visit_info.keputusan_lawatan_tapak", "equals");
  }
}
