import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UploadService } from "../services/upload.service";
import { UploadnoncomplianceformService } from "../services/uploadnoncomplianceform.service";

@Component({
  selector: "app-uploadnoncompliance",
  templateUrl: "./uploadnoncompliance.component.html",
  styleUrls: ["./uploadnoncompliance.component.css"],
})
export class UploadnoncomplianceComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
  url: any = environment.basePublicUrl;
  SERVER_URL: any = environment.basePublicUrl + "/public/uploadFile";
  token: string;
  applicationSerialNo: any;
  basePublicUrl = environment.basePublicUrl;
  fileName: string;
  keyValue: any;
  data: any;
  dataArray: any = [];
  restData: any;
  loginError: boolean;
  errorMsg: any;
  lang: string;
  value: any;
  getDetails: any;

  constructor(
    private http: HttpClient,
    private s: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private up: UploadnoncomplianceformService
  ) { }

  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.keyValue = this.up.value;
    this.data = this.up.getDetails;
    // console.log(this.data);
    // console.log(this.keyValue);

    for (let i = 0; i < this.data.length; i++) {
      this.dataArray.push(this.data[i].makalumat_ketidakpatuhan);
    }
    // console.log(this.dataArray);
  }

  uploadSubmit(e) {
    this.spinner.show();
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
      this.fileName = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

       this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    
    this.uploader.clearQueue();
    // console.log("hii"+this.fileName+"hello");

    let ev = e;
    for (let index of this.data) {
      if (index.site_id == ev) {
        this.restData = index;
      }
    }

    this.applicationSerialNo = this.route.snapshot.paramMap.get("id");
    this.token = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.token,
    };
    let body = {
      tarikh: this.restData.tarikh,
      lawatan_tapak: this.restData.lawatan_tapak,
      tarikh_lawatan_tapak: this.restData.tarikh_lawatan_tapak,
      keputusan_lawatan_tapak: this.restData.keputusan_lawatan_tapak,
      makalumat_ketidakpatuhan: this.fileName,
      maklum_balas_ketidakpatuhan: this.restData.maklum_balas_ketidakpatuhan,
    };

    this.http
      .put(
        this.basePublicUrl + "/dbkl/updateSiteVisitApplicationList/" + ev,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          // console.log(res);
          window.location.reload();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }
}
