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
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";


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

  // Add file upload properties
  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";

  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10, // 10MB
  });

  uploadSiteVisitData: any = {
    no_siri_permohonan: "",
    site_id: "",
  };

  // Add upload dialog properties
  showUploadDialog: boolean = false;

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
      .get(this.basePublicUrl + "/public/viewApplicationList2", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.applicationList = res;
          this.spinner.hide();

          // for (var index of this.applicationList) {
          //   this.arr = index.mesyuarat_permohonan_serahan_kawasan;

          //   if (this.arr != null) {
          //     this.datearray.push(this.arr.split(","));
          //   }
          // }

          // // Call this after data is loaded
          // this.setupDateFiltering();
        },
        (error) => {
          this.router.navigateByUrl("publicLogin");
          this.spinner.hide();
        }
      );

    // this.tservice.getCharacters().subscribe((data: ApplicationList[]) => {
    //   this.characters = data;
    //   this.spinner.hide();
    // });
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

  getData() {
    // let headers = {
    //   "Content-Type": "application/json",
    //   Authorization: key,
    // };

    // this.http
    //   .get(this.basePublicUrl + "/dbkl/getPublicApplicationList2", {
    //     headers: headers,
    //   })
    //   .subscribe(
    //     (res) => {
    //       this.spinner.hide();
    //       this.data = res;

    //       // Call this after data is loaded
    //       this.setupDateFiltering();
    //     },
    //     (error) => {
    //       this.loginError = true;
    //       this.spinner.hide();
    //       this.errorMsg = error["error"]["message"];
    //     }
    //   );

    let headers = {
      accept: "application/json",
      Authorization: this.accessToken,
    };

    this.http
      .get(this.basePublicUrl + "/public/viewApplicationList2", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.applicationList = res;
        },
        (error) => {
          this.router.navigateByUrl("publicLogin");
          this.spinner.hide();
        }
      );
  }

  routeToDocumentChecklist(rowData) {
    this.spinner.show();
    this.keyValue = rowData;
    localStorage.setItem("date1", this.keyValue.tarikh_permohonan);
    this.spinner.hide();
    this.router.navigateByUrl(
      "public/showchecklist?id=" + this.keyValue.dokumen_senarai
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
        case "maklumbalas_ketidakpatuhan":
          this.uploadSiteVisitData.title = "Maklumbalas Ketidakpatuhan";
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
  
      let apiPath = this.basePublicUrl + "/public/updateSiteVisitInformation2/" + this.uploadSiteVisitData.site_id;
      let requestBody = {};
  
      switch (this.uploadSiteVisitData.type) {
        case "maklumbalas_ketidakpatuhan":
          requestBody = {
            maklumbalas_ketidakpatuhan_filename: fileName,
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
    // Process filename to match backend logic
    // Remove all characters except alphanumeric and dots (same as backend regex)
    let processedFilename = filename.replace(/[^a-zA-Z0-9.]/g, '');
    
    let fileExtension = processedFilename.split(".").pop()?.toLowerCase();
    let path = "";

    let PHOTO_EXTENSIONS = ["png", "jpg", "jpeg"];
    let DOC_EXTENSIONS = ["pdf", "docx", "pptx", "xls", "xlsx"];

    if (PHOTO_EXTENSIONS.includes(fileExtension)) {
      path = "images";
    } else if (DOC_EXTENSIONS.includes(fileExtension)) {
      path = "docs";
    }

    return `${environment.basePublicUrl}/jkas_resourses/free/${path}/${processedFilename}`;
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
