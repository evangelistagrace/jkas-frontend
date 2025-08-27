import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { TableService } from "src/app/table/table.service";
import { ApplicationList } from "src/app/table/applicationList";
import { UploaddocumentComponent } from "src/app/uploaddocument/uploaddocument.component";
import { MeetingService } from "src/app/services/meeting.service";
import { ShowpdfComponent } from "src/app/showpdf/showpdf.component";
import { Table } from "primeng/table";

@Component({
  selector: "app-publicppsppa",
  templateUrl: "./publicppsppa.component.html",
  styleUrls: ["./publicppsppa.component.css"],
})
export class PublicppsppaComponent implements OnInit {
  @ViewChild("dt") table: Table;

  accessToken: string;
  basePublicUrl = environment.basePublicUrl;
  applicationList: any;
  p;
  username: string;
  datearray: any = [];
  arr: any;
  characters: ApplicationList[];
  keyValue: any;
  loginError: boolean;
  errorMsg: any;
  IdsArray: any[];
  selectedRows: any;
  listOfIds: string;
  lang: string;
  display: string;
  display2: string;
  selected: boolean;

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

  // Add missing properties for success/error handling
  displaysuccess: string;
  errorDisplay1: string;
  sucessMsg: string;
  errmsg: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService
  ) {
    // Create a year range from 10 years ago to 10 years in the future
    const currentYear = new Date().getFullYear();
    this.yearRange = `${currentYear - 10}:${currentYear + 10}`;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.spinner.show();
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/public/checklist");

    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");

    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

    $(document).ready(function () {
      $(".dropdown").hover(function () {
        var dropdownMenu = $(this).children(".dropdown-menu");
        if (dropdownMenu.is(":visible")) {
          dropdownMenu.parent().toggleClass("open");
        }
      });
    });

    let headers = {
      accept: "application/json",
      Authorization: this.accessToken,
    };

    this.http
      .get(this.basePublicUrl + "/public/viewApplicationList", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.applicationList = res;

          for (var index of this.applicationList) {
            this.arr = index.mesyuarat_permohonan_serahan_kawasan;

            if (this.arr != null) {
              this.datearray.push(this.arr.split(","));
            }
          }

          // Call this after data is loaded
          this.setupDateFiltering();
        },
        (error) => {
          this.router.navigateByUrl("publicLogin");
          this.spinner.hide();
        }
      );

    this.tservice.getCharacters().subscribe((data: ApplicationList[]) => {
      this.characters = data;
      this.spinner.hide();
    });
  }

  // Add this method to prepare the data for date filtering
  setupDateFiltering() {
    if (this.table && this.applicationList) {
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
    }
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

  backtotop() {
    window.scroll(0, 0);
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
          this.router.navigateByUrl("/publicLogin");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

  // Update selection change method for PrimeNG
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

  // Update this method to handle direct button click
  routeToUpdateApplicationForm(rowData) {
    this.spinner.show();
    this.keyValue = rowData;
    localStorage.setItem("date1", this.keyValue.tarikh_permohonan);
    this.spinner.hide();
    this.router.navigateByUrl(
      "public/showchecklist?id=" + this.keyValue.dokumen_senarai
    );
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
  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display = "block";
    } else if (this.IdsArray.length == 0) {
      this.display = "block";
    } else {
      this.opendeletemodal();
    }
  }
  cancel() {
    window.history.back(); // <-- go back to previous location on cancel
  }

  // Add the missing deleteSelected method
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
        app_id_list: this.listOfIds.substring(1, this.listOfIds.length - 1),
      },
    };

    this.http
      .delete(
        environment.basePublicUrl + "/public/deleteApplicationList",
        options
      )
      .subscribe(
        (s) => {
          this.spinner.hide();

          if (s["status"] == "success") {
            if (this.lang == "en") {
              this.sucessMsg = "Application List deleted Successfully!";
            } else {
              this.sucessMsg = "Senarai Aplikasi berjaya dipadam!";
            }
          }

          this.openSuccess();
          this.reloadComponent();
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];

          if (this.lang == "en") {
            this.errmsg =
              "Failed to delete application list. Please try again.";
          } else {
            this.errmsg = "Gagal memadamkan senarai aplikasi. Sila cuba lagi.";
          }

          this.openError();
        }
      );
  }

  // Add missing success/error modal methods
  openSuccess() {
    this.displaysuccess = "block";
  }

  closeSuccess() {
    this.displaysuccess = "none";
    this.reloadComponent();
  }

  openError() {
    this.errorDisplay1 = "block";
  }

  closeError() {
    this.errorDisplay1 = "none";
  }

  // Add reload component method
  reloadComponent() {
    this.backtotop();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
