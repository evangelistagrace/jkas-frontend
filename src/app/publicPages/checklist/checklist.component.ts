import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.css"],
})
export class ChecklistComponent implements OnInit {


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
  public uploader4: FileUploader = new FileUploader({
    isHTML5: true,
  });

  accessToken: string;
  garbageCollection: boolean = false;
  supuanJalan: boolean = false;
  drainCelaning: boolean = false;
  grassCutting: boolean = false;
  strataTitle: boolean = false;
  freeHold: boolean = false;
  streetName: boolean = false;
  roadLength: boolean = false;
  lengthDrain: boolean = false;
  grassyArea: boolean = false;
  tpkkArea: boolean = false;
  largeSpace: boolean = false;
  buildingName1: string = "";
  buildingName2: string = "";
  buildingName: string;
  baseUrl = environment.basePublicUrl;
  firstfile: string = "";
  secondfile: string = "";
  thirdfile: string = "";
  fourthfile: string = "";
  display: string;
  errorDisplay: string;
  username: string;
  appno: any;
  basePublicUrl = environment.basePublicUrl;
  npErrorMessage: any;
  lang: string;
  errormsg: string;
  uuk35: boolean;
  confirm: any;
  fivethnewfile: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);
    localStorage.setItem("path", "public/checklist");
    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
    // console.log("username at checklist", this.username);
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }
  }

  submit() {
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 3000000) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      if (j == 0) {
        this.firstfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);
        this.uploadFile(data).subscribe((data) => {});
        continue;
      }
      this.firstfile = this.firstfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader.clearQueue();

    // 2nd uploader

    for (var i = 0; i < this.uploader1.queue.length; i++) {
      let fileItem = this.uploader1.queue[i]._file;
      if (fileItem.size > 3000000) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader1.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader1.queue[j]._file;
      if (j == 0) {
        this.secondfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => {});
        continue;
      }
      this.secondfile = this.secondfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader1.clearQueue();

    for (var i = 0; i < this.uploader2.queue.length; i++) {
      let fileItem = this.uploader2.queue[i]._file;
      if (fileItem.size > 3000000 ) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      if (j == 0) {
        this.thirdfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => {});
        continue;
      }
      this.thirdfile = this.thirdfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader2.clearQueue();

    for (var i = 0; i < this.uploader3.queue.length; i++) {
      let fileItem = this.uploader3.queue[i]._file;
      if (fileItem.size > 3000000) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader3.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader3.queue[j]._file;
      if (j == 0) {
        this.fourthfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => {});
        continue;
      }
      this.fourthfile = this.fourthfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader3.clearQueue();




    for (var i = 0; i < this.uploader4.queue.length; i++) {
      let fileItem = this.uploader4.queue[i]._file;
      if (fileItem.size > 3000000) {
        alert("Each File should be less than 3 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader4.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader4.queue[j]._file;
      if (j == 0) {
        this.fivethnewfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => {});
        continue;
      }
      this.fivethnewfile = this.fivethnewfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader4.clearQueue();





    let headers = {
      "Content-Type": "application/json",
      Authorization: this.accessToken,
    };
    this.spinner.show();
    this.buildingName = this.buildingName1;

    let body = {
      kutipan_sampah: this.garbageCollection,
      sapuan_jalan: this.supuanJalan,
      cucian_longkang: this.drainCelaning,
      pemotongan_rumput: this.grassCutting,
      dinyatakan_nama_bangunan: this.buildingName,
      strata_title: this.strataTitle,
      hak_milik_kekal: this.freeHold,
      nama_jalan: this.streetName,
      panjang_jalan_mengikut_nama_jalan: this.roadLength,
      panjang_longkang: this.lengthDrain,
      luas_kawasan_berumput: this.grassyArea,
      luas_kawasan_TPKK: this.tpkkArea,
      parkir_area: this.largeSpace,
      surat_permohonan_perkhidmatan_pembersihan_dokumen: this.firstfile,
      surat_salinan_CF_dokumen: this.secondfile,
      salinan_status_pembanginan_dokumen: this.thirdfile,
      bagi_status_pembangunan_dokumen: this.fourthfile,
      confirm:this.confirm,
      dinyatakan_jenis_sistem:this.fivethnewfile
    };
    // console.log("body", body);
    this.http
      .post(this.baseUrl + "/public/submitApplication", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log("result after submit", res);
          this.appno = res["app_srl_no"];
          this.spinner.hide();
          this.openSuccessModal();
        },
        (error) => {
          // console.log("error is", error);
          this.spinner.hide();
          this.openErrorModal();
          this.npErrorMessage = error["error"]["message"];
          if (this.npErrorMessage == "application_not_added") {
            if (this.lang == "en") {
              this.errormsg = "Application could not be submitted successfully!  Please refer console logs for further details.";
            }
            else {
              this.errormsg = "Permohonan tidak lengkap.Sila isi butiran yang  berkaitan dan muat naik dokumen yang diperlukan.";
            }
          }
        }
      );
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/public/uploadFile", data);
  }
  public onSaveUsernameChanged(value: boolean) {
    this.uuk35 = value;
  }
  backtotop() {
    window.scroll(0, 0);
  }

  openSuccessModal() {
    this.display = "block";
  }

  openErrorModal() {
    this.errorDisplay = "block";
  }

  closeSuccessModal() {
    this.display = "none";
    this.router.navigateByUrl("/publicpage");
  }

  closeErrorModal() {
    this.display = "none";
    window.location.reload();
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
  opendocument(){
    // window.location.href = this.basePublicUrl+"/jkas_resourses/free/pdfs/CONTOH SURAT PERMOHONAN.pdf";
    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/CONTOH SURAT PERMOHONAN.pdf");
  }
  open2nddocument(){
    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/CONTOH BORANG F.pdf");
  }
  open3rddocument(){
    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/JALAN AWAM.pdf");
  }
  open4rthdocument(){

    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/PELAN JALAN AWAM.pdf");
  }
  open5thdocument(){
    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/CONTOH PELAN RUMAH SAMPAH YANG DILULUSKAN OLEH SWCorp.pdf");
  }
  open6thdocument(){
    window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/PELAN INVENTORI KAWASAN PERKHIDMATAN PEMBERSIHAN.pdf");
  }
}
