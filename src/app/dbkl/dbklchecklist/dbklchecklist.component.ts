import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { saveAs } from "file-saver";

@Component({
  selector: "app-dbklchecklist",
  templateUrl: "./dbklchecklist.component.html",
  styleUrls: ["./dbklchecklist.component.css"],
})
export class DbklchecklistComponent implements OnInit {
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
  c: any;
  public saveUsername: boolean;
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
  buildingName1: any;
  buildingName2: any;
  buildingName: string;
  baseUrl = environment.basePublicUrl;
  firstfile: string = "";
  secondfile: string = "";
  thirdfile: string = "";
  fourthfile: string = "";
  data: any = [];
  apiKey: any;
  value: any;
  kutipan: any;
  loginError: boolean;
  errorMsg: any;
  kutipan_sampah: any;
  sapuan_jalan: boolean;
  cucian_longkang: any;
  pemotongan_rumput: any;
  dinyatakan_nama_bangunan: any;
  strata_title: any;
  hak_milik_kekal: any;
  nama_jalan: any;
  panjang_longkang: any;
  panjang_jalan_mengikut_nama_jalan: any;
  luas_kawasan_berumput: any;
  luas_kawasan_TPKK: any;
  parkir_area: any;
  surat_permohonan_perkhidmatan_pembersihan_dokumen: any;
  surat_salinan_CF_dokumen: any;
  salinan_status_pembanginan_dokumen: any;
  bagi_status_pembangunan_dokumen: any;
  surat_salinan_CF_status: any;
  surat_permohonan_perkhidmatan_pembersihan_status: any;
  salinan_status_pembanginan_status: any;
  bagi_status_pembangunan_status: any;
  status_dokumen_keseluruhan: any;
  errorMessage: any;
  display: string;
  errorDisplay: string;
  datearray: any = [];
  username: string;
  basePublicUrl = environment.basePublicUrl;
  f1: any;
  file1: any;
  f2: any;
  file2: any;
  f3: any;
  file3: any;
  file4: any;
  f4: any;
  sp1: any;
  temp: any;
  pdffiles1: any = [];
  sp2: any;
  temp1: any;
  pdffiles2: any = [];
  sp3: any;
  temp2: any;
  pdffiles3: any = [];
  sp4: any;
  temp3: any;
  pdffiles4: any = [];
  surat_permohonan_perkhidmatan_pembersihan_catatan: any;
  surat_salinan_CF_catatan: any;
  salinan_status_pembanginan_catatan: any;
  bagi_status_pembangunan_catatan: any;
  firstnotice: any;
  notice1: any;
  seonfnotice: any;
  thirdnotice: any;
  fourthNotice: any;
  notice2: any;
  notice3: any;
  notice4: any;
  secondnotice: any;
  words1 = [];
  words2 = [];
  words3 = [];
  words4 = [];
  text: any;
  firstMessage = [];
  secondMessage = [];
  thirdMessage = [];
  fourthMessage = [];
  text2: any;
  text3: any;
  text4: any;
  first: any;
  second: any;
  third: any;
  four: any;
  ckeck: boolean;
  lang: string;
  sucessMsg: string;
  resp: boolean;
  errormsg: any;
  createDate: string;
  dinyatakan_jenis_sistem: any;
  sp5: any;
  temp4: any;
  pdffiles5: any = [];
  fivethnewfile: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.spinner.show();
    this.createDate = localStorage.getItem("date");
    this.c = this.route.snapshot.queryParamMap.get("id");
    localStorage.setItem("path", "/dbkl/dbklchecklist?id=" + this.c);
    this.apiKey = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
    this.lang = localStorage.getItem("lang");

    let headers = {
      "Content-Type": "application/json",
      Authorization: this.apiKey,
    };

    this.http
      .get(this.baseUrl + "/dbkl/fetchPublicApplicationDetails/" + this.c, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res;
          this.spinner.hide();

          // this.datearray = this.data[0].dinyatakan_nama_bangunan.split("@#");

          this.buildingName1 = this.data[0].dinyatakan_nama_bangunan;
          // this.buildingName2 = this.datearray[1];

          this.kutipan = this.data[0].kutipan_sampah;

          // Assign value to varianles
          this.kutipan_sampah = this.data[0].kutipan_sampah;
          this.sapuan_jalan = this.data[0].sapuan_jalan;
          this.cucian_longkang = this.data[0].cucian_longkang;
          this.pemotongan_rumput = this.data[0].pemotongan_rumput;
          this.dinyatakan_nama_bangunan = this.data[0].dinyatakan_nama_bangunan;
          this.strata_title = this.data[0].strata_title;
          this.hak_milik_kekal = this.data[0].hak_milik_kekal;
          this.nama_jalan = this.data[0].nama_jalan;
          this.panjang_jalan_mengikut_nama_jalan =
            this.data[0].panjang_jalan_mengikut_nama_jalan;
          this.panjang_longkang = this.data[0].panjang_longkang;
          this.luas_kawasan_berumput = this.data[0].luas_kawasan_berumput;
          this.luas_kawasan_TPKK = this.data[0].luas_kawasan_TPKK;
          this.parkir_area = this.data[0].parkir_area;

          this.surat_permohonan_perkhidmatan_pembersihan_status =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_status;
          this.surat_salinan_CF_status = this.data[0].surat_salinan_CF_status;
          this.salinan_status_pembanginan_status =
            this.data[0].salinan_status_pembanginan_status;
          this.bagi_status_pembangunan_status =
            this.data[0].bagi_status_pembangunan_status;
          this.status_dokumen_keseluruhan =
            this.data[0].status_dokumen_keseluruhan;

          // Notice
          this.surat_permohonan_perkhidmatan_pembersihan_catatan =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_catatan;
          this.surat_salinan_CF_catatan = this.data[0].surat_salinan_CF_catatan;
          this.salinan_status_pembanginan_catatan =
            this.data[0].salinan_status_pembanginan_catatan;
          this.bagi_status_pembangunan_catatan =
            this.data[0].bagi_status_pembangunan_catatan;
          this.dinyatakan_jenis_sistem = this.data[0].dinyatakan_jenis_sistem;

          // Notice split
          if (this.data[0].surat_permohonan_perkhidmatan_pembersihan_catatan) {
            this.notice1 =
              this.data[0].surat_permohonan_perkhidmatan_pembersihan_catatan.split(
                "@*"
              );
          }
          if (this.data[0].surat_salinan_CF_catatan) {
            this.notice2 = this.data[0].surat_salinan_CF_catatan.split("@*");
          }
          if (this.data[0].salinan_status_pembanginan_catatan) {
            this.notice3 =
              this.data[0].salinan_status_pembanginan_catatan.split("@*");
          }
          if (this.data[0].bagi_status_pembangunan_catatan) {
            this.notice4 =
              this.data[0].bagi_status_pembangunan_catatan.split("@*");
          }

          // New split files
          this.sp1 =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_dokumen.split(
              ","
            );

          for (let i = 0; i < this.sp1.length; i++) {
            this.temp = this.sp1[i].split("/");
            this.pdffiles1.push(this.temp[this.temp.length - 1]);
          }

          // second file

          this.sp2 = this.data[0].surat_salinan_CF_dokumen.split(",");

          for (let i = 0; i < this.sp2.length; i++) {
            this.temp1 = this.sp2[i].split("/");
            this.pdffiles2.push(this.temp1[this.temp1.length - 1]);
          }

          //third file

          this.sp3 = this.data[0].salinan_status_pembanginan_dokumen.split(",");

          for (let i = 0; i < this.sp3.length; i++) {
            this.temp2 = this.sp3[i].split("/");
            this.pdffiles3.push(this.temp2[this.temp2.length - 1]);
          }

          // fourth file
          this.sp4 = this.data[0].bagi_status_pembangunan_dokumen.split(",");

          for (let i = 0; i < this.sp4.length; i++) {
            this.temp3 = this.sp4[i].split("/");
            this.pdffiles4.push(this.temp3[this.temp3.length - 1]);
          }

          // fiveth file
          if (this.data[0].dinyatakan_jenis_sistem) {
            this.sp5 = this.data[0].dinyatakan_jenis_sistem.split(",");
            for (let i = 0; i < this.sp5.length; i++) {
              this.temp4 = this.sp5[i].split("/");
              this.pdffiles5.push(this.temp4[this.temp4.length - 1]);
            }
          }
        },
        (error) => {
          this.loginError = true;

          // this.errorMsg = error['error']['message'];
        }
      );
  }

  submit() {
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
      this.firstfile = fileItem.name;
      // window.alert(this.firstfile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader.clearQueue();

    // 2nd uploader

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
      this.secondfile = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
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
      this.thirdfile = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader2.clearQueue();

    for (var i = 0; i < this.uploader3.queue.length; i++) {
      let fileItem = this.uploader3.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader3.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader3.queue[j]._file;
      this.fourthfile = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => {});
    }
    this.uploader3.clearQueue();
    this.updatedata();
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/public/uploadFile", data);
  }
  updatedata() {
    this.spinner.show();

    // first file
    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == 0) {
        this.firstfile = this.pdffiles1[i];
        continue;
      }
      this.firstfile = this.firstfile + "," + this.pdffiles1[i];
    }

    // second file
    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == 0) {
        this.secondfile = this.pdffiles2[i];
        continue;
      }
      this.secondfile = this.secondfile + "," + this.pdffiles2[i];
    }

    // third file
    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == 0) {
        this.thirdfile = this.pdffiles3[i];
        continue;
      }
      this.thirdfile = this.thirdfile + "," + this.pdffiles3[i];
    }

    // fourth file
    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == 0) {
        this.fourthfile = this.pdffiles4[i];
        continue;
      }
      this.fourthfile = this.fourthfile + "," + this.pdffiles4[i];
    }

    // fivth file
    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == 0) {
        this.fivethnewfile = this.pdffiles5[i];
        continue;
      }
      this.fivethnewfile = this.fivethnewfile + "," + this.pdffiles5[i];
    }

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.buildingName = this.buildingName1;

    // first Notice
    let firstNotice = "";

    if (this.surat_permohonan_perkhidmatan_pembersihan_catatan != "") {
      if (this.notice1) {
        for (let i = 0; i < this.notice1.length; i++) {
          if (i == 0) {
            firstNotice = this.notice1[i];
            continue;
          }
          firstNotice = firstNotice + "@*" + this.notice1[i];
        }
      }
      if (this.firstMessage) {
        for (let i = 0; i < this.firstMessage.length; i++) {
          firstNotice = firstNotice + "@*" + this.firstMessage[i];
        }
      }
    } else {
      if (this.firstMessage) {
        for (let i = 0; i < this.firstMessage.length; i++) {
          if (i == 0) {
            firstNotice = this.firstMessage[i];
            continue;
          }
          firstNotice = firstNotice + "@*" + this.firstMessage[i];
        }
      }
    }

    // second Notice
    let secondNotice = "";
    if (this.surat_salinan_CF_catatan != "") {
      if (this.notice2) {
        for (let i = 0; i < this.notice2.length; i++) {
          if (i == 0) {
            secondNotice = this.notice2[i];
            continue;
          }
          secondNotice = secondNotice + "@*" + this.notice2[i];
        }
      }
      if (this.secondMessage) {
        for (let i = 0; i < this.secondMessage.length; i++) {
          secondNotice = secondNotice + "@*" + this.secondMessage[i];
        }
      }
    } else {
      if (this.secondMessage) {
        for (let i = 0; i < this.secondMessage.length; i++) {
          if (i == 0) {
            secondNotice = this.secondMessage[i];
            continue;
          }
          secondNotice = secondNotice + "@*" + this.secondMessage[i];
        }
      }
    }

    // third Notice
    let thirdNotice = "";
    if (this.salinan_status_pembanginan_catatan != "") {
      if (this.notice3) {
        for (let i = 0; i < this.notice3.length; i++) {
          if (i == 0) {
            thirdNotice = this.notice3[i];
            continue;
          }
          thirdNotice = thirdNotice + "@*" + this.notice3[i];
        }
      }
      if (this.thirdMessage) {
        for (let i = 0; i < this.thirdMessage.length; i++) {
          thirdNotice = thirdNotice + "@*" + this.thirdMessage[i];
        }
      }
    } else {
      if (this.thirdMessage) {
        for (let i = 0; i < this.thirdMessage.length; i++) {
          if (i == 0) {
            thirdNotice = this.thirdMessage[i];
            continue;
          }
          thirdNotice = thirdNotice + "@*" + this.thirdMessage[i];
        }
      }
    }

    // fourth Notice
    let fourthNotice = "";

    if (this.bagi_status_pembangunan_catatan != "") {
      if (this.notice4) {
        for (let i = 0; i < this.notice4.length; i++) {
          if (i == 0) {
            fourthNotice = this.notice4[i];
            continue;
          }
          fourthNotice = fourthNotice + "@*" + this.notice4[i];
        }
      }
      if (this.fourthMessage) {
        for (let i = 0; i < this.fourthMessage.length; i++) {
          fourthNotice = fourthNotice + "@*" + this.fourthMessage[i];
        }
      }
    } else {
      if (this.fourthMessage) {
        for (let i = 0; i < this.fourthMessage.length; i++) {
          if (i == 0) {
            fourthNotice = this.fourthMessage[i];
            continue;
          }
          fourthNotice = fourthNotice + "@*" + this.thirdMessage[i];
        }
      }
    }

    let body = {
      kutipan_sampah: this.kutipan_sampah,
      sapuan_jalan: this.sapuan_jalan,
      cucian_longkang: this.cucian_longkang,
      pemotongan_rumput: this.pemotongan_rumput,
      dinyatakan_nama_bangunan: this.buildingName,
      strata_title: this.strata_title,
      hak_milik_kekal: this.hak_milik_kekal,
      nama_jalan: this.nama_jalan,
      panjang_jalan_mengikut_nama_jalan: this.panjang_jalan_mengikut_nama_jalan,
      panjang_longkang: this.panjang_longkang,
      luas_kawasan_berumput: this.luas_kawasan_berumput,
      luas_kawasan_TPKK: this.luas_kawasan_TPKK,
      parkir_area: this.parkir_area,

      surat_permohonan_perkhidmatan_pembersihan_dokumen: this.firstfile,
      surat_salinan_CF_dokumen: this.secondfile,
      salinan_status_pembanginan_dokumen: this.thirdfile,
      bagi_status_pembangunan_dokumen: this.fourthfile,
      dinyatakan_jenis_sistem: this.fivethnewfile,
      surat_permohonan_perkhidmatan_pembersihan_status:
        this.surat_permohonan_perkhidmatan_pembersihan_status,
      surat_salinan_CF_status: this.surat_salinan_CF_status,
      salinan_status_pembanginan_status: this.salinan_status_pembanginan_status,
      bagi_status_pembangunan_status: this.bagi_status_pembangunan_status,
      status_dokumen_keseluruhan: this.status_dokumen_keseluruhan,

      surat_permohonan_perkhidmatan_pembersihan_catatan: firstNotice,
      surat_salinan_CF_catatan: secondNotice,
      salinan_status_pembanginan_catatan: thirdNotice,
      bagi_status_pembangunan_catatan: fourthNotice,
    };

    this.http
      .put<any>(
        this.baseUrl + "/dbkl/updatePublicApplicationDetails/" + this.c,
        body,
        { headers: headers }
      )
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.spinner.hide();
          // console.log(data["message"]);

          // this.resp = data["status"] == "success";
          if (data["message"] == "application_updated") {
            if (this.lang == "en") {
              this.sucessMsg = "The list of applications has been updated!";
            } else {
              this.sucessMsg = "Senarai permohonan telah dikemas kini!";
            }
          }
          this.openSuccessModal();

          // this.updateStatus();
        },
        error: (error) => {
          this.errorMessage = error.message;
          // console.error("There was an error!", error);
          this.errormsg = error["error"]["message"];
          if (this.errormsg == "application_not_updated") {
            if (this.lang == "en") {
              this.errorMsg =
                "Application List could not be updated! Please refer console logs for further details.";
            } else {
              this.errorMsg =
                "Senarai Aplikasi tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
          this.openErrorModal();
          this.spinner.hide();
        },
      });
  }

  backtotop() {
    window.scroll(0, 0);
  }

  garbageData(event) {}
  public onSaveUsernameChanged(value: boolean) {
    this.kutipan_sampah = value;
  }

  public onSaveUsernameChanged1(value: boolean) {
    this.sapuan_jalan = value;
  }

  public onSaveUsernameChanged2(value: boolean) {
    this.cucian_longkang = value;
  }

  public onSaveUsernameChanged3(value: boolean) {
    this.pemotongan_rumput = value;
  }

  public onSaveUsernameChanged4(value: boolean) {
    this.strata_title = value;
  }

  public onSaveUsernameChanged5(value: boolean) {
    this.hak_milik_kekal = value;
  }

  public onSaveUsernameChanged6(value: boolean) {
    this.nama_jalan = value;
  }

  public onSaveUsernameChanged7(value: boolean) {
    this.panjang_jalan_mengikut_nama_jalan = value;
  }

  public onSaveUsernameChanged8(value: boolean) {
    this.panjang_longkang = value;
  }

  public onSaveUsernameChanged9(value: boolean) {
    this.luas_kawasan_berumput = value;
  }

  public onSaveUsernameChanged10(value: boolean) {
    this.luas_kawasan_TPKK = value;
  }

  public onSaveUsernameChanged11(value: boolean) {
    this.parkir_area = value;
  }

  openSuccessModal() {
    this.display = "block";
  }

  openErrorModal() {
    this.errorDisplay = "block";
  }

  closeSuccessModal() {
    this.display = "none";

    this.router.navigateByUrl("dbkl/applicationprocess");
  }

  closeErrorModal() {
    this.display = "none";

    this.router.navigateByUrl("dbkl/applicationprocess");
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
          localStorage.setItem("isdbkl", "false");
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }

  onSelectOption1(event) {
    if (event.target.value == "Lengkap") {
      this.surat_permohonan_perkhidmatan_pembersihan_status = 1;
    } else if (event.target.value == "Tidak Lengkap") {
      this.surat_permohonan_perkhidmatan_pembersihan_status = 0;
    }
  }
  onSelectOption2(event) {
    if (event.target.value == "Lengkap") {
      this.surat_salinan_CF_status = 1;
    } else if (event.target.value == "Tidak Lengkap") {
      this.surat_salinan_CF_status = 0;
    }
  }
  onSelectOption3(event) {
    if (event.target.value == "Lengkap") {
      this.salinan_status_pembanginan_status = 1;
    } else if (event.target.value == "Tidak Lengkap") {
      this.salinan_status_pembanginan_status = 0;
    }
  }
  onSelectOption4(event) {
    if (event.target.value == "Lengkap") {
      this.bagi_status_pembangunan_status = 1;
    } else if (event.target.value == "Tidak Lengkap") {
      this.bagi_status_pembangunan_status = 0;
    }
  }
  onSelectOption5(event) {
    console.log("initial----" + this.status_dokumen_keseluruhan);

    if (event.target.value === "Lengkap") {
      console.log("lengkap=====initial" + this.status_dokumen_keseluruhan);
      this.status_dokumen_keseluruhan = 1;
      console.log("lengkap=====final" + this.status_dokumen_keseluruhan);
    } else if (event.target.value === "Tidak Lengkap") {
      console.log("tidak=====initial" + this.status_dokumen_keseluruhan);
      this.status_dokumen_keseluruhan = 0;
      console.log("tidak=====final" + this.status_dokumen_keseluruhan);
    }
  }

  add1() {
    this.words1.push({ value: "" });

    if (this.first == undefined) {
      document.getElementById("tex1").style.border = "1px solid #1111A3";
      return;
    } else if (this.first.trim().length == 0) {
      this.first = undefined;
    }

    if (this.first != undefined) {
      this.firstMessage.push("DBKL: " + this.first);
      this.text = "";
      this.first = "";
      document.getElementById("tex1").style.border = "1px solid black";
    } else {
      document.getElementById("tex1").style.border = "1px solid #1111A3";
    }
  }

  add2() {
    this.words2.push({ value: "" });

    if (this.second == undefined) {
      document.getElementById("tex2").style.border = "1px solid #1111A3";
      return;
    } else if (this.second.trim().length == 0) {
      this.second = undefined;
    }

    if (this.second != undefined) {
      this.secondMessage.push("DBKL: " + this.second);
      this.text2 = "";
      this.second = "";
      document.getElementById("tex2").style.border = "1px solid black";
    } else {
      document.getElementById("tex2").style.border = "1px solid #1111A3";
    }
  }

  add3() {
    this.words3.push({ value: "" });
    if (this.third == undefined) {
      document.getElementById("tex3").style.border = "1px solid #1111A3";
      return;
    } else if (this.third.trim().length == 0) {
      this.third = undefined;
    }
    if (this.third != undefined) {
      this.thirdMessage.push("DBKL: " + this.third);
      this.text3 = "";
      this.third = "";
      document.getElementById("tex3").style.border = "1px solid black";
    } else {
      document.getElementById("tex3").style.border = "1px solid #1111A3";
    }
  }

  add4() {
    this.words4.push({ value: "" });
    if (this.four == undefined) {
      document.getElementById("tex4").style.border = "1px solid #1111A3";
      return;
    } else if (this.four.trim().length == 0) {
      this.four = undefined;
    }
    if (this.four != undefined) {
      this.fourthMessage.push("DBKL: " + this.four);
      this.text4 = "";
      this.four = "";
      document.getElementById("tex4").style.border = "1px solid black";
    } else {
      document.getElementById("tex4").style.border = "1px solid #1111A3";
    }
  }

  getData(t) {
    this.first = t;
  }

  getData2(t) {
    this.second = t;
  }

  getData3(t) {
    this.third = t;
  }

  getData4(t) {
    this.four = t;
  }

  removevalue1(event) {
    if (event.target.id.includes("id")) {
      for (let i = 0; i < this.firstMessage.length; i++) {
        if (i == event.target.id.charAt(event.target.id.length - 1)) {
          this.firstMessage.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.notice1.length; i++) {
        if (i == event.target.id) {
          this.notice1.splice(i, 1);
          break;
        }
      }
    }
  }

  removevalue2(event) {
    if (event.target.id.includes("id")) {
      for (let i = 0; i < this.secondMessage.length; i++) {
        if (i == event.target.id.charAt(event.target.id.length - 1)) {
          this.secondMessage.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.notice2.length; i++) {
        if (i == event.target.id) {
          this.notice2.splice(i, 1);
          break;
        }
      }
    }
  }

  removevalue3(event) {
    if (event.target.id.includes("id")) {
      for (let i = 0; i < this.thirdMessage.length; i++) {
        if (i == event.target.id.charAt(event.target.id.length - 1)) {
          this.thirdMessage.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.notice3.length; i++) {
        if (i == event.target.id) {
          this.notice3.splice(i, 1);
          break;
        }
      }
    }
  }

  removevalue4(event) {
    if (event.target.id.includes("id")) {
      for (let i = 0; i < this.fourthMessage.length; i++) {
        if (i == event.target.id.charAt(event.target.id.length - 1)) {
          this.fourthMessage.splice(i, 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < this.notice4.length; i++) {
        if (i == event.target.id) {
          this.notice4.splice(i, 1);
          break;
        }
      }
    }
  }

  getPdf(e) {
    
    const fileExtension = e.split(".").pop()?.toLowerCase();
    const DOWNLOAD_EXTENSIONS = ["docx", "pptx", "xls", "xlsx", "zip", "rar"];
    const PREVIEW_EXTENSIONS = ["pdf", "png", "jpg", "jpeg"];

    if (DOWNLOAD_EXTENSIONS.includes(fileExtension)) {
      // Download the file
      this.downloadFile(e, this.getFileUrl(e));
    } else if (PREVIEW_EXTENSIONS.includes(fileExtension)) {
      // Open in new tab for preview (especially for PDFs)
      window.open(this.getFileUrl(e), "_blank");
    } else {
      // Default behavior - try to open in new tab
      window.open(this.getFileUrl(e), "_blank");
    }
  }

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
        console.error('Download error:', error);

        if (this.lang == "en") {
          this.errorMsg = "Failed to download file. Please try again.";
        } else {
          this.errorMsg = "Gagal memuat turun fail. Sila cuba lagi.";
        }

        this.openErrorModal();
      }
    );
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

  downloadPdf(id: number) {
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    return this.http
      .get(this.basePublicUrl + "/jkas_resourses/public/pdfs/" + id, {
        headers,
        responseType: "blob",
      })
      .toPromise();
  }

  updateStatus() {
    this.spinner.show();

    // if (event.target.value == "Lengkap") {
    //   this.ckeck = true;
    // } else {
    //   this.ckeck = false;
    // }

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      status_semakan_dokumen: this.status_dokumen_keseluruhan,
    };

    this.http
      .put(this.basePublicUrl + "/dbkl/updateApplicationList/" + this.c, body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.openSuccessModal();

          // console.log(res);
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  opendocument() {
    // window.location.href = "{{basePublicUrl}}/jkas_resourses/free/pdfs/CONTOH SURAT PERMOHONAN.pdf";
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
