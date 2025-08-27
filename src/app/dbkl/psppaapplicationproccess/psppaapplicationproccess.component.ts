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
import { FileUploader } from "ng2-file-upload";
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

  // Add properties for site visit edit dialog
  showSiteVisitDialog: boolean = false;
  editSiteVisitData: any = {
    no_siri_permohonan: "",
    date: null,
    time: null,
  };

  // Add file upload properties
  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";

  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10, // 10MB
  });

  // Add upload dialog properties
  showUploadDialog: boolean = false;
  uploadSiteVisitData: any = {
    no_siri_permohonan: "",
    site_id: "",
  };

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
    // window.location.reload();
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
    { label: "Patuh", value: "Patuh" },
    { label: "Tidak Patuh", value: "Tidak Patuh" },
  ];

  // Add property for the filter
  lawatanFilter: any;

  // Add filter method for Tetapan Lawatan Tapak
  onFilterLawatan(value: any) {
    this.table.filter(
      value,
      "site_visit_info.keputusan_lawatan_tapak",
      "equals"
    );
  }

  // Add method to open site visit edit dialog
  openSiteVisitEditDialog(type: string, rowData: any) {
    this.editSiteVisitData.site_id = rowData.site_visit_info.site_id;
    this.editSiteVisitData.no_siri_permohonan = rowData.no_siri_permohonan;
    this.editSiteVisitData.type = type;

    console.log("rowdata: ", rowData);

    switch (type) {
      case "tetapan_lawatan_tapak":
        this.editSiteVisitData.title = "Tetapan Lawatan Tapak";
        // Pre-fill with existing date and time if available
        if (
          rowData.site_visit_info &&
          (rowData.site_visit_info.tarikh_datetime ||
            rowData.site_visit_info.tarikh)
        ) {
          const existingDateTime = new Date(
            rowData.site_visit_info.tarikh_datetime ||
              rowData.site_visit_info.tarikh
          );
          this.editSiteVisitData.date = existingDateTime;
          this.editSiteVisitData.time = existingDateTime;
        } else {
          this.editSiteVisitData.date = null;
          this.editSiteVisitData.time = null;
        }
        break;
      case "keputusan_lawatan_tapak":
        this.editSiteVisitData.title = "Keputusan Lawatan Tapak";
        this.editSiteVisitData.keputusan_lawatan_tapak =
          rowData.site_visit_info.keputusan_lawatan_tapak || null;
        break;
      case "maklumbalas_ketidakpatuhan":
        this.editSiteVisitData.title = "Maklumbalas Ketidakpatuhan";
        this.editSiteVisitData.status_maklumbalas_ketidakpatuhan =
          rowData.site_visit_info.status_maklumbalas_ketidakpatuhan || null;
        break;
      case "keputusan_permohonan":
        this.editSiteVisitData.title = "Keputusan Permohonan";
        this.editSiteVisitData.status_keputusan_permohonan =
          rowData.status_keputusan_permohonan || null;
        // Pre-fill with existing date and time if available
        if (rowData.tarikh_keputusan_permohonan) {
          const existingDate = new Date(rowData.tarikh_keputusan_permohonan);
          
          this.editSiteVisitData.tarikh_keputusan_permohonan = existingDate;
        } else {
          this.editSiteVisitData.tarikh_keputusan_permohonan = null;
        }
        break;
      case "catatan":
        this.editSiteVisitData.title = "Catatan";
        this.editSiteVisitData.catatan = rowData.catatan || null;
        break;
      case "emesy":
        this.editSiteVisitData.title = "E-Mesyuarat";
        this.editSiteVisitData.emesy_bil_no = rowData.emesy_bil_no|| null;
        // Pre-fill with existing date and time if available
        if (rowData.emesy_tarikh) {
          const existingDate = new Date(rowData.emesy_tarikh);
          
          this.editSiteVisitData.emesy_tarikh = existingDate;
        } else {
          this.editSiteVisitData.emesy_tarikh = null;
        }
        break;
      case "senarai_kawasan":
        this.editSiteVisitData.title = "Senarai Kawasan - RIC/SLC";
        this.editSiteVisitData.senarai_kwsn_bil_no = rowData.senarai_kwsn_bil_no || null;
        this.editSiteVisitData.senarai_kwsn_tempat = rowData.senarai_kwsn_tempat || null;
        // Pre-fill with existing date and time if available
        if (rowData.senarai_kwsn_tarikh) {
          const existingDate = new Date(rowData.senarai_kwsn_tarikh);

          this.editSiteVisitData.senarai_kwsn_tarikh = existingDate;
        } else {
          this.editSiteVisitData.senarai_kwsn_tarikh = null;
        }
        break;
      case "senarai_kawasan_minit_mesyuarat":
        this.editSiteVisitData.title = "Minit Mesyuarat RIC/SLC";
        // Pre-fill with existing date and time if available
        if (rowData.senarai_kwsn_minit_msyrt_tarikh) {
          const existingDate = new Date(rowData.senarai_kwsn_minit_msyrt_tarikh);

          this.editSiteVisitData.senarai_kwsn_minit_msyrt_tarikh = existingDate;
        } else {
          this.editSiteVisitData.senarai_kwsn_minit_msyrt_tarikh = null;
        }
        break;
    }

    this.showSiteVisitDialog = true;
  }

  // Add method to close dialog
  closeSiteVisitDialog() {
    this.showSiteVisitDialog = false;

    this.editSiteVisitData = {};

    // switch (this.editSiteVisitData.type) {
    //   case "tetapan_lawatan_tapak":
    //     this.editSiteVisitData = {
    //       site_id: "",
    //       date: null,
    //       time: null,
    //     };
    //     break;
    //   case "keputusan_lawatan_tapak":
    //     this.editSiteVisitData = {
    //       site_id: "",
    //       keputusan_lawatan_tapak: null,
    //     };
    //     break;
    // }
  }

  // Add method to save site visit date and time
  saveSiteVisit() {
    this.spinner.show();
    const key = localStorage.getItem("AccessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let apiPath =
      this.basePublicUrl +
      "/dbkl/updateSiteVisitApplicationList2/" +
      this.editSiteVisitData.site_id;

    let requestBody = {};

    switch (this.editSiteVisitData.type) {
      case "tetapan_lawatan_tapak":
        const combinedDateTime = new Date(this.editSiteVisitData.date);
        const timeOnly = new Date(this.editSiteVisitData.time);

        combinedDateTime.setHours(timeOnly.getHours());
        combinedDateTime.setMinutes(timeOnly.getMinutes());

        requestBody = {
          site_id: this.editSiteVisitData.site_id,
          tarikh_datetime: combinedDateTime.toISOString(),
        };
        break;
      case "keputusan_lawatan_tapak":
        requestBody = {
          site_id: this.editSiteVisitData.site_id,
          keputusan_lawatan_tapak:
            this.editSiteVisitData.keputusan_lawatan_tapak,
        };
        break;
      case "maklumbalas_ketidakpatuhan":
        requestBody = {
          site_id: this.editSiteVisitData.site_id,
          status_maklumbalas_ketidakpatuhan:
            this.editSiteVisitData.status_maklumbalas_ketidakpatuhan,
        };
        break;
      case "keputusan_permohonan":
        apiPath =
          this.basePublicUrl +
          "/dbkl/updateApplicationList2/" +
          this.editSiteVisitData.no_siri_permohonan;
        const tarikhKeputusan = new Date(this.editSiteVisitData.tarikh_keputusan_permohonan);
        requestBody = {
          no_siri_permohonan: this.editSiteVisitData.no_siri_permohonan,
          status_keputusan_permohonan:
            this.editSiteVisitData.status_keputusan_permohonan,
          tarikh_keputusan_permohonan: tarikhKeputusan.toISOString(),
        };
        break;
      case "catatan":
        apiPath =
          this.basePublicUrl +
          "/dbkl/updateApplicationList2/" +
          this.editSiteVisitData.no_siri_permohonan;
        requestBody = {
          no_siri_permohonan: this.editSiteVisitData.no_siri_permohonan,
          catatan: this.editSiteVisitData.catatan,
        };
        break;
      case "emesy":
        apiPath =
          this.basePublicUrl +
          "/dbkl/updateApplicationList2/" +
          this.editSiteVisitData.no_siri_permohonan;
        const tarikhEmesy = new Date(this.editSiteVisitData.emesy_tarikh);
        requestBody = {
          no_siri_permohonan: this.editSiteVisitData.no_siri_permohonan,
          emesy_bil_no:
            this.editSiteVisitData.emesy_bil_no,
          emesy_tarikh: tarikhEmesy.toISOString(),
        };
        break;
      case "senarai_kawasan":
        apiPath =
          this.basePublicUrl +
          "/dbkl/updateApplicationList2/" +
          this.editSiteVisitData.no_siri_permohonan;
        const senaraiKwsnTarikh = new Date(this.editSiteVisitData.senarai_kwsn_tarikh);
        requestBody = {
          no_siri_permohonan: this.editSiteVisitData.no_siri_permohonan,
          senarai_kwsn_bil_no:
            this.editSiteVisitData.senarai_kwsn_bil_no,
          senarai_kwsn_tarikh: senaraiKwsnTarikh.toISOString(),
          senarai_kwsn_tempat:
            this.editSiteVisitData.senarai_kwsn_tempat,
        };
        break;
      case "senarai_kawasan_minit_mesyuarat":
        apiPath =
          this.basePublicUrl +
          "/dbkl/updateApplicationList2/" +
          this.editSiteVisitData.no_siri_permohonan;
        const senaraiKwsnMinitTarikh = new Date(this.editSiteVisitData.senarai_kwsn_minit_msyrt_tarikh);
        requestBody = {
          no_siri_permohonan: this.editSiteVisitData.no_siri_permohonan,
          senarai_kwsn_minit_msyrt_tarikh: senaraiKwsnMinitTarikh.toISOString(),
        };
        break;
        
    }

    this.http
      .put(apiPath, requestBody, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.closeSiteVisitDialog();

          if (this.lang == "en") {
            this.sucessMsg = "Site visit details updated successfully!";
          } else {
            this.sucessMsg = "Maklumat lawatan tapak berjaya dikemaskini!";
          }

          this.openSuccess();
          this.getData(); // Refresh the table data
        },
        (error) => {
          this.spinner.hide();
          this.closeSiteVisitDialog();

          if (this.lang == "en") {
            this.errmsg =
              "Failed to update site visit details. Please try again.";
          } else {
            this.errmsg =
              "Gagal mengemaskini maklumat lawatan tapak. Sila cuba lagi.";
          }

          this.openError();
        }
      );
  }

  // Add file upload method
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }

  // Add method to open upload dialog
  openUploadDialog(type: string, rowData: any) {
    this.uploadSiteVisitData.no_siri_permohonan = rowData.no_siri_permohonan;
    this.uploadSiteVisitData.site_id = rowData.site_visit_info?.site_id || "";
    this.uploadSiteVisitData.type = type;

    switch (this.uploadSiteVisitData.type) {
      case "tetapan_lawatan_tapak":
        this.uploadSiteVisitData.title = "Tetapan Lawatan Tapak";
        break;
      case "keputusan_lawatan_tapak":
        this.uploadSiteVisitData.title = "Keputusan Lawatan Tapak";
        break;
      case "maklumbalas_ketidakpatuhan":
        this.uploadSiteVisitData.title = "Maklumbalas Ketidakpatuhan";
        break;
      case "keputusan_permohonan":
        this.uploadSiteVisitData.title = "Keputusan Permohonan";
        break;
      case "emesy":
        this.uploadSiteVisitData.title = "E-Mesyuarat";
        break;
      case "senarai_kawasan":
        this.uploadSiteVisitData.title = "Senarai Kawasan - RIC/SLC";
        break;
      case "senarai_kawasan_minit_mesyuarat":
        this.uploadSiteVisitData.title = "Minit Mesyuarat RIC/SLC";
        break;
    }

    this.showUploadDialog = true;
  }

  // Add method to close upload dialog
  closeUploadDialog() {
    this.showUploadDialog = false;
    this.uploader.clearQueue();
    this.uploadSiteVisitData = {};
  }

  // Add method to handle file upload
  uploadSiteVisitFile() {
    if (this.uploader.queue.length === 0) {
      if (this.lang == "en") {
        this.errmsg = "Please select a file to upload.";
      } else {
        this.errmsg = "Sila pilih fail untuk dimuat naik.";
      }
      this.openError();
      return;
    }

    // Handle file uploads
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        if (this.lang == "en") {
          this.errmsg = "Each file should be less than 10 MB";
        } else {
          this.errmsg = "Setiap fail mestilah kurang daripada 10 MB";
        }
        this.openError();
        return;
      }
    }

    this.spinner.show();
    let fileName = "";

    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      fileName = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }

    // Update site visit with file name
    const key = localStorage.getItem("AccessToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let apiPath = this.basePublicUrl + "/dbkl/updateSiteVisitApplicationList2/" + this.uploadSiteVisitData.site_id;
    let requestBody = {};

    switch (this.uploadSiteVisitData.type) {
      case "tetapan_lawatan_tapak":
        requestBody = {
          tetapan_lawatan_tapak_filename: fileName,
        };
        break;
      case "keputusan_lawatan_tapak":
        requestBody = {
          keputusan_lawatan_tapak_filename: fileName,
        };
        break;
      case "maklumbalas_ketidakpatuhan":
        requestBody = {
          maklumbalas_ketidakpatuhan_filename: fileName,
        };
        break;
      case "keputusan_permohonan":
        apiPath = this.basePublicUrl + "/dbkl/updateApplicationList2/" + this.uploadSiteVisitData.no_siri_permohonan;
        requestBody = {
          filename_keputusan_permohonan: fileName,
        };
        break;
      case "emesy":
        apiPath = this.basePublicUrl + "/dbkl/updateApplicationList2/" + this.uploadSiteVisitData.no_siri_permohonan;
        requestBody = {
          emesy_filename: fileName,
        };
        break;
      case "senarai_kawasan":
        apiPath = this.basePublicUrl + "/dbkl/updateApplicationList2/" + this.uploadSiteVisitData.no_siri_permohonan;
        requestBody = {
          senarai_kwsn_filename: fileName,
        };
        break;
      case "senarai_kawasan_minit_mesyuarat":
        apiPath = this.basePublicUrl + "/dbkl/updateApplicationList2/" + this.uploadSiteVisitData.no_siri_permohonan;
        requestBody = {
          senarai_kwsn_minit_msyrt_filename: fileName,
        };
        break;
    }

    this.http
      .put(apiPath,
        requestBody,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.closeUploadDialog();

          if (this.lang == "en") {
            this.sucessMsg = "Site visit file uploaded successfully!";
          } else {
            this.sucessMsg = "Fail lawatan tapak berjaya dimuat naik!";
          }

          this.openSuccess();
          this.getData(); // Refresh the table data
        },
        (error) => {
          this.spinner.hide();
          this.closeUploadDialog();

          if (this.lang == "en") {
            this.errmsg = "Failed to upload site visit file. Please try again.";
          } else {
            this.errmsg =
              "Gagal memuat naik fail lawatan tapak. Sila cuba lagi.";
          }

          this.openError();
        }
      );
  }

  // Add method to handle file selection
  onFileSelect(event: any, uploader: FileUploader) {
    // Handle file selection if needed
  }

  // Add method to remove file from queue
  removeFile(item: any) {
    item.remove();
  }

  getFileUrl(filename: string): string {
    let fileExtension = filename.split(".").pop()?.toLowerCase();
    let path = "";

    let PHOTO_EXTENSIONS = ["png", "jpg", "jpeg"];
    let DOC_EXTENSIONS = ["pdf", "docx", "pptx", "xls", "xlsx"];

    if (PHOTO_EXTENSIONS.includes(fileExtension)) {
      path = "images";
    } else if (DOC_EXTENSIONS.includes(fileExtension)) {
      path = "docs";
    }

    return `${environment.basePublicUrl}/jkas_resourses/free/${path}/${filename}`;
  }

  // New method to check if file should be downloaded
  shouldDownloadFile(filename: string): boolean {
    let fileExtension = filename.split(".").pop()?.toLowerCase();
    let DOWNLOAD_EXTENSIONS = ["docx", "pptx", "xls", "xlsx", "zip", "rar"];
    return DOWNLOAD_EXTENSIONS.includes(fileExtension);
  }

  // New method to handle file click
  handleFileClick(filename: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const fileExtension = filename.split(".").pop()?.toLowerCase();
    const DOWNLOAD_EXTENSIONS = ["docx", "pptx", "xls", "xlsx", "zip", "rar"];
    const PREVIEW_EXTENSIONS = ["pdf", "png", "jpg", "jpeg"];

    if (DOWNLOAD_EXTENSIONS.includes(fileExtension)) {
      // Download the file
      this.downloadFile(filename, this.getFileUrl(filename));
    } else if (PREVIEW_EXTENSIONS.includes(fileExtension)) {
      // Open in new tab for preview
      window.open(this.getFileUrl(filename), "_blank");
    } else {
      // Default behavior - try to open in new tab
      window.open(this.getFileUrl(filename), "_blank");
    }
  }

  // Keep existing downloadFile method as is
  downloadFile(filename: string, fileUrl: string): void {
    this.spinner.show();

    this.http.get(fileUrl, { responseType: "blob" }).subscribe(
      (blob: Blob) => {
        this.spinner.hide();

        // Create blob URL
        const url = window.URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.spinner.hide();

        if (this.lang == "en") {
          this.errmsg = "Failed to download file. Please try again.";
        } else {
          this.errmsg = "Gagal memuat turun fail. Sila cuba lagi.";
        }

        this.openError();
      }
    );
  }
}
