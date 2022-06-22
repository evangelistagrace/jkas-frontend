import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-update-feedback",
  templateUrl: "./update-feedback.component.html",
  styleUrls: ["./update-feedback.component.css"],
})
export class UpdateFeedbackComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
  });
  public uploader2: FileUploader = new FileUploader({
    isHTML5: true,
  });
  public uploader3: FileUploader = new FileUploader({
    isHTML5: true,
  });
  validation_messages = {
    dropdown: [{ type: "required", messages: "This field is required!" }],
    feedback: [{ type: "required", messages: "This field is required!" }],
    image: [{ type: "required", messages: "This field is required!" }],
    officer: [{ type: "required", messages: "This field is required!" }],
  };
  url: any = environment.basePublicUrl;
  SERVER_URL: any = this.url + "/public/uploadFile";
  registrationGroup: any;
  feedbackid: any;
  selectedValue: any;
  selected: any;
  change: any;
  nama_pegawai_merinyu: any;
  maklum_balas: any;
  responsearray: any = [];
  filename: string;
  beforeimage: string;
  afterimage: string;
  beforeimage1: any;
  afterimage1: string;
  beforedate: string;
  afterdate: string;
  isimage: boolean;
  isimage1: boolean;
  organization: any;
  organizationarray: any = ["organization1", "organization2"];
  display: string;
  reportimage: string;
  isimage2: boolean;
  reportimage1: string;
  reviewval: boolean;
  status: boolean;
  firstlength: number;
  secondlength: number;
  reportlength: number;
  errorDisplay: string;
  accessToken1: string;
  npid: string;
  Organizations: any = [];
  lang: string;
  msg: string;
  npErrorMessage: any;
  errormsg: string;
  agency_token: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    // console.log(this.selectedValue);
  }

  ngOnInit() {
    this.agency_token = localStorage.getItem('egency_token');
    if (!this.agency_token) {
      this.router.navigateByUrl("/agency");
    }
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "agency/update-feedback");
    window.scroll(0, 0);
    localStorage.setItem("isAgency", "false");
    this.http
      .get(environment.basePublicUrl + "/agensi/getOrganisationList")
      .subscribe((data) => {
        // console.log(data);
        this.Organizations = data;
      });
    this.npid = localStorage.getItem("npid");
    this.accessToken1 = localStorage.getItem("egency_token");

    this.spinner.show();

    $("#SeeMore2").click(function () {
      var $this = $(this);
      $this.toggleClass("SeeMore2");
      if ($this.hasClass("SeeMore2")) {
        $this.text("Sembunyikan ulasan ") +
          $this.append(
            '<i class="fa fa-arrow-up" style="color:#1111A3;cursor: pointer;"aria-hidden="true" (click)="showreview()" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 "></i>'
          );
      } else {
        $this.text("Mengkaji Semula ") +
          $this.append(
            '<i class="fa fa-arrow-down" style="color:#1111A3;cursor: pointer;"aria-hidden="true" (click)="showreview()" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 "></i>'
          );
      }
    });

    this.isimage = true;
    this.isimage1 = true;
    this.isimage2 = true;
    this.registrationGroup = new FormGroup({
      dropdown: new FormControl("", [Validators.required]),
      officer: new FormControl("", [Validators.required]),
      feedback: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
    });
    this.feedbackid = this.route.snapshot.paramMap.get("id");
    let headers = {
      Authorization: this.accessToken1,
    };
    // console.log(this.feedbackid);
    this.http
      .get(
        environment.basePublicUrl + "/agensi/getFeedback/" + this.feedbackid,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          // console.log(data);

          this.spinner.hide();
          this.responsearray = data;
          this.nama_pegawai_merinyu =
            this.responsearray[0].nama_pegawai_merinyu;
          this.maklum_balas = this.responsearray[0].maklum_balas;
          // this.beforeimage = this.responsearray[0].gambar_sebelum;
          // this.afterimage = this.responsearray[0].gambar_selepas;
          this.beforeimage1 =
            environment.basePublicUrl + this.responsearray[0].gambar_sebelum;
          this.afterimage1 =
            environment.basePublicUrl + this.responsearray[0].gambar_selepas;
          this.reportimage1 =
            environment.basePublicUrl + this.responsearray[0].gambar_laporan;
          // this.beforeimage = this.responsearray[0].sebelum_tarikh;
          // this.afterimage = this.responsearray[0].selepas_tarikh;
          this.beforedate = this.responsearray[0].sebelum_tarikh_masa;
          this.afterdate = this.responsearray[0].selepas_tarikh_masa;
          this.selectedValue = this.responsearray[0].organisasi;
          // console.log("my organization" + this.selectedValue);
          this.status = this.responsearray[0].kerja_selesail;
          this.firstlength = this.beforedate.length;
          this.secondlength = this.afterdate.length;
        },
        (error) => {
          this.spinner.hide();
          this.openErrorModal();
        }
      );
  }
  uploadSubmit() {
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      // window.alert(fileItem.name);
      this.beforeimage = fileItem.name;
      // console.log(this.uploader);
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader.clearQueue();
    // uploader 2
    for (var i = 0; i < this.uploader1.queue.length; i++) {
      let fileItem = this.uploader1.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader1.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader1.queue[j]._file;
      // window.alert(fileItem.name);
      this.afterimage = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader1.clearQueue();
    for (var i = 0; i < this.uploader2.queue.length; i++) {
      let fileItem = this.uploader2.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      // window.alert(fileItem.name);
      this.reportimage = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader2.clearQueue();
    this.update();
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }
  changeWebsite(e) {
    // console.log(e.target.value);
    this.selectedValue = e.target.value;
    // console.log(this.selectedValue);
  }
  update() {
    this.spinner.show();
    // console.log(this.responsearray);
    const body = {
      organization: this.selectedValue,
      merinyu_officer_name: this.nama_pegawai_merinyu,
      feedback: this.maklum_balas,
      picture_before: this.beforeimage,
      picture_after: this.afterimage,
      report_image: this.reportimage,
      work_done_status: true,
    };
    let headers = {
      Authorization: this.accessToken1,
    };
    // console.log("i am passing this body" + body);
    this.http
      .put<any>(
        environment.basePublicUrl + "/agensi/updateFeedback/" + this.feedbackid,
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        // console.log(data);
        this.spinner.hide();
        if (data) {
          this.openModal();
          if (data.message == "feedback_updated") {
            if (this.lang == "en") {
              this.msg = "Feedback updated successfully!";
            }
            else {
              this.msg = "Maklum balas berjaya dikemas kini!";
            }
          }
        } else {
          (error) => {
          this.spinner.hide();
          this.openErrorModal();
          this.npErrorMessage = error["error"]["message"];
          if (this.npErrorMessage == "feedback_not_added") {
            if (this.lang == "en") {
              this.errormsg = "Feedback could not be updated! Please refer console logs for further details.";
            }
            else {
              this.errormsg = "Maklum balas tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }}
      });
  }
  onFileChanged(e) {
    let reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.beforeimage1 = reader.result;
        // console.log(this.beforeimage1)
      };
    }
  }
  hideimage() {
    this.isimage = false;
  }
  hideimage1() {
    this.isimage1 = false;
  }
  hideimage2() {
    this.isimage2 = false;
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  showreview() {
    this.reviewval = true;
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    this.display = "none";

    this.router.navigateByUrl("/agency");
  }

  logout() {
    localStorage.setItem("isAgency", "false");
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: this.accessToken1,
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

  backtotop() {
    window.scroll(0, 0);
   
  }
}
