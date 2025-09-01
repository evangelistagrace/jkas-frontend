import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-listdocument",
  templateUrl: "./listdocument.component.html",
  styleUrls: ["./listdocument.component.css"],
})
export class ListdocumentComponent implements OnInit {
  suratPermohonan: any = [];
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });

  doUploadSuratPermohonan() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http
        .post<any>(this.baseUrl + "/public/uploadFile", data)
        .subscribe((response) => {
          this.suratPermohonan.push(response.filename);
        });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }
  removeSuratPermohonan(index) {
    this.suratPermohonan.splice(index, 1);
  }

  suratSalinan: any = [];
  doUploadSuratSalinan() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http
        .post<any>(this.baseUrl + "/public/uploadFile", data)
        .subscribe((response) => {
          this.suratSalinan.push(response.filename);
        });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }
  removeSuratSalinan(index) {
    this.suratSalinan.splice(index, 1);
  }

  typeDisposal: any = [];
  doUploadTypeDisposal() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http
        .post<any>(this.baseUrl + "/public/uploadFile", data)
        .subscribe((response) => {
          this.typeDisposal.push(response.filename);
        });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }
  removeTypeDisposal(index) {
    this.typeDisposal.splice(index, 1);
  }

  developmentStatus: any = [];
  doUploadDevelopmentStatus() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http
        .post<any>(this.baseUrl + "/public/uploadFile", data)
        .subscribe((response) => {
          this.developmentStatus.push(response.filename);
        });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }
  removeDevelopmentStatus(index) {
    this.developmentStatus.splice(index, 1);
  }

  otherDocuments: any = [];
  doUploadOtherDocuments() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http
        .post<any>(this.baseUrl + "/public/uploadFile", data)
        .subscribe((response) => {
          this.otherDocuments.push(response.filename);
        });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }
  removeOtherDocuments(index) {
    this.otherDocuments.splice(index, 1);
  }

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
  pembersihanTempatAwam: boolean = false;
  pembersihanPasarAwam: boolean = false;
  pembersihanJejantas: boolean = false;
  pembersihanTandasAwam: boolean = false;
  pembersihanPusatPenjaja: boolean = false;
  pembersihanHentianBas: boolean = false;
  pembersihanHentianTeksi: boolean = false;
  statusTanah: boolean = false;
  lainLain: boolean = false;
  suratPengesahan: boolean = false;
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
  display: string;
  errorDisplay: string;
  username: string;
  email: string;
  icNo: string;
  no_tel_mobile: string;
  no_tel_office: string;
  nama_syarikat: string;
  appno: any;
  basePublicUrl = environment.basePublicUrl;
  npErrorMessage: any;
  lang: string;
  errormsg: string;
  uuk35: boolean;
  confirm: any;

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
    } else {
      let headers = {
        accept: "application/json",
        Authorization: this.accessToken,
      };

      this.http
        .post(
          this.basePublicUrl + "/public/getPublicUSerInfo",
          {},
          {
            headers: headers,
          }
        )
        .subscribe(
          (res) => {
            this.spinner.hide();

            if (res) {
              const userData: any = res;
              this.username = userData.username || this.username;
              this.email = userData.email || this.email;
              this.icNo = userData.id_card_no || this.icNo;
              this.no_tel_mobile = userData.no_tel_mobile || this.no_tel_mobile;
              this.no_tel_office = userData.no_tel_office || this.no_tel_office;
              this.nama_syarikat = userData.nama_syarikat || this.nama_syarikat;
            }

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
            // this.router.navigateByUrl("publicLogin");
            this.spinner.hide();
          }
        );
    }
  }

  submit() {
    // for (var i = 0; i < this.uploader.queue.length; i++) {
    //   let fileItem = this.uploader.queue[i]._file;
    //   if (fileItem.size > 3000000) {
    //     alert("Each File should be less than 3 MB of size.");
    //     return;
    //   }
    // }
    // for (var j = 0; j < this.uploader.queue.length; j++) {
    //   let data = new FormData();
    //   let fileItem = this.uploader.queue[j]._file;
    //   if (j == 0) {
    //     this.firstfile = fileItem.name;
    //     data.append("file", fileItem);
    //     data.append("fileSeq", "seq" + j);
    //     this.uploadFile(data).subscribe((data) => {});
    //     continue;
    //   }
    //   this.firstfile = this.firstfile + "," + fileItem.name;
    //   data.append("file", fileItem);
    //   data.append("fileSeq", "seq" + j);

    //   this.uploadFile(data).subscribe((data) => {});
    // }
    // this.uploader.clearQueue();

    // // 2nd uploader

    // for (var i = 0; i < this.uploader1.queue.length; i++) {
    //   let fileItem = this.uploader1.queue[i]._file;
    //   if (fileItem.size > 3000000) {
    //     alert("Each File should be less than 3 MB of size.");
    //     return;
    //   }
    // }
    // for (var j = 0; j < this.uploader1.queue.length; j++) {
    //   let data = new FormData();
    //   let fileItem = this.uploader1.queue[j]._file;
    //   if (j == 0) {
    //     this.secondfile = fileItem.name;
    //     data.append("file", fileItem);
    //     data.append("fileSeq", "seq" + j);

    //     this.uploadFile(data).subscribe((data) => {});
    //     continue;
    //   }
    //   this.secondfile = this.secondfile + "," + fileItem.name;
    //   data.append("file", fileItem);
    //   data.append("fileSeq", "seq" + j);

    //   this.uploadFile(data).subscribe((data) => {});
    // }
    // this.uploader1.clearQueue();

    // for (var i = 0; i < this.uploader2.queue.length; i++) {
    //   let fileItem = this.uploader2.queue[i]._file;
    //   if (fileItem.size > 3000000) {
    //     alert("Each File should be less than 3 MB of size.");
    //     return;
    //   }
    // }
    // for (var j = 0; j < this.uploader2.queue.length; j++) {
    //   let data = new FormData();
    //   let fileItem = this.uploader2.queue[j]._file;
    //   if (j == 0) {
    //     this.thirdfile = fileItem.name;
    //     data.append("file", fileItem);
    //     data.append("fileSeq", "seq" + j);

    //     this.uploadFile(data).subscribe((data) => {});
    //     continue;
    //   }
    //   this.thirdfile = this.thirdfile + "," + fileItem.name;
    //   data.append("file", fileItem);
    //   data.append("fileSeq", "seq" + j);

    //   this.uploadFile(data).subscribe((data) => {});
    // }
    // this.uploader2.clearQueue();

    // for (var i = 0; i < this.uploader3.queue.length; i++) {
    //   let fileItem = this.uploader3.queue[i]._file;
    //   if (fileItem.size > 3000000) {
    //     alert("Each File should be less than 3 MB of size.");
    //     return;
    //   }
    // }
    // for (var j = 0; j < this.uploader3.queue.length; j++) {
    //   let data = new FormData();
    //   let fileItem = this.uploader3.queue[j]._file;
    //   if (j == 0) {
    //     this.fourthfile = fileItem.name;
    //     data.append("file", fileItem);
    //     data.append("fileSeq", "seq" + j);

    //     this.uploadFile(data).subscribe((data) => {});
    //     continue;
    //   }
    //   this.fourthfile = this.fourthfile + "," + fileItem.name;
    //   data.append("file", fileItem);
    //   data.append("fileSeq", "seq" + j);

    //   this.uploadFile(data).subscribe((data) => {});
    // }
    // this.uploader3.clearQueue();
    // for (var i = 0; i < this.uploader4.queue.length; i++) {
    //   let fileItem = this.uploader4.queue[i]._file;
    //   if (fileItem.size > 3000000) {
    //     alert("Each File should be less than 3 MB of size.");
    //     return;
    //   }
    // }
    // for (var j = 0; j < this.uploader4.queue.length; j++) {
    //   let data = new FormData();
    //   let fileItem = this.uploader4.queue[j]._file;
    //   if (j == 0) {
    //     this.fivethnewfile = fileItem.name;
    //     data.append("file", fileItem);
    //     data.append("fileSeq", "seq" + j);

    //     this.uploadFile(data).subscribe((data) => {});
    //     continue;
    //   }
    //   this.fivethnewfile = this.fivethnewfile + "," + fileItem.name;
    //   data.append("file", fileItem);
    //   data.append("fileSeq", "seq" + j);

    //   this.uploadFile(data).subscribe((data) => {});
    // }
    // this.uploader4.clearQueue();
    if (!this.confirm) {
      alert("Sila tanda pada checkbox pengesahan.");
      return;
    }
    if (this.suratPermohonan.length == 0) {
      alert("Sila muat naik surat permohonan pada bilangan 1.");
      return;
    }
    // if (this.suratSalinan.length == 0) {
    //   alert('Sila muat naik surat salinan pada bilangan 2.');
    //   return;
    // }
    // if (this.typeDisposal.length == 0) {
    //   alert('Sila muat naik jenis pelupusan sampah pada bilangan 4.');
    //   return;
    // }
    // if (this.developmentStatus.length == 0) {
    //   alert('Sila muat naik status pembangunan pada bilangan 5.');
    //   return;
    // }
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
      surat_permohonan_perkhidmatan_pembersihan_dokumen:
        this.suratPermohonan.length != 0 ? this.suratPermohonan[0] : "",
      surat_salinan_CF_dokumen:
        this.suratSalinan.length != 0 ? this.suratSalinan[0] : "",
      salinan_status_pembanginan_dokumen:
        this.typeDisposal.length != 0 ? this.typeDisposal[0] : "",
      bagi_status_pembangunan_dokumen:
        this.developmentStatus.length != 0 ? this.developmentStatus[0] : "",
      confirm: this.confirm,
      dinyatakan_jenis_sistem:
        this.otherDocuments.length != 0 ? this.otherDocuments[0] : "",
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
              this.errormsg =
                "Application could not be submitted successfully!  Please refer console logs for further details.";
            } else {
              this.errormsg =
                "Permohonan tidak berjaya dihantar! Sila rujuk log konsol untuk keterangan lebih lanjut.";
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
  opendocument() {
    // window.location.href = "this.basePublicUrl/jkas_resourses/free/pdfs/CONTOH SURAT PERMOHONAN.pdf";
    window.open(
      this.basePublicUrl +
        "/jkas_resourses/free/pdfs/CONTOH SURAT PERMOHONAN.pdf"
    );
  }
  open2nddocument() {
    window.open(
      this.basePublicUrl + "/jkas_resourses/free/pdfs/CONTOH BORANG F.pdf"
    );
  }
  open3rddocument() {
    window.open(
      this.basePublicUrl + "/jkas_resourses/free/pdfs/JALAN AWAM.pdf"
    );
  }
  open4rthdocument() {
    window.open(
      this.basePublicUrl + "/jkas_resourses/free/pdfs/PELAN JALAN AWAM.pdf"
    );
  }
  open5thdocument() {
    window.open(
      this.basePublicUrl +
        "/jkas_resourses/free/pdfs/CONTOH PELAN RUMAH SAMPAH YANG DILULUSKAN OLEH SWCorp.pdf"
    );
  }
  open6thdocument() {
    window.open(
      this.basePublicUrl +
        "/jkas_resourses/free/pdfs/PELAN INVENTORI KAWASAN PERKHIDMATAN PEMBERSIHAN.pdf"
    );
  }
}
