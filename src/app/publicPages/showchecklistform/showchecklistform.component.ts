import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { saveAs } from 'file-saver';

@Component({
  selector: "app-showchecklistform",
  templateUrl: "./showchecklistform.component.html",
  styleUrls: ["./showchecklistform.component.css"],
})
export class ShowchecklistformComponent implements OnInit {
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
  url: any = environment.basePublicUrl;
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
  confirm:any;
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
  f2: any;
  f3: any;
  file1: any;
  file2: any;
  file3: any;
  f4: any;
  file4: any;
  sp1: any;
  pdffiles1: any = [];
  temp: any;
  sp2: any;
  pdffiles2: any = [];
  pdffiles3: any = [];
  pdffiles4: any = [];
  pdffiles5:any=[];
  temp1: any;
  sp3: any;
  temp2: any;
  sp4: any;
  temp3: any;
  restfile2: string;
  check2: boolean;
  restfile: string;
  check1: boolean;
  isUser: string;
  surat_permohonan_perkhidmatan_pembersihan_catatan: any;
  salinan_status_pembanginan_catatan: any;
  bagi_status_pembangunan_catatan: any;
  surat_salinan_CF_catatan: any;
  notice1: any;
  notice2: any;
  notice3: any;
  notice4: any;
  words1: any=[];
  first: any;
  firstMessage: any=[];
  text: string;
  words2: any=[];
  second: any;
  secondMessage: any=[];
  text2: string;
  words3: any=[];
  third: any;
  thirdMessage: any=[];
  text3: string;
  words4: any=[];
  four: any;
  fourthMessage: any=[];
  text4: string;
  createDate: string;
  fivethnewfile: string;
  sp5: any;
  dinyatakan_jenis_sistem: any;
  temp4: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accessToken = localStorage.getItem("public_access_token");
    
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

    window.scroll(0, 0);
    this.createDate=localStorage.getItem("date");
    this.username = localStorage.getItem("username");
    this.isUser = localStorage.getItem("isUser");
    
    this.spinner.show();
    this.c = this.route.snapshot.queryParamMap.get("id");
    localStorage.setItem("path", "public/showchecklist?id="+this.c);
    this.apiKey = localStorage.getItem("AccessToken");

    // console.log(this.c);
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.apiKey,
    };
    this.http
      .get(this.baseUrl + "/dbkl/fetchPublicApplicationDetails/"+this.c, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.value = res;
          this.data=res;
          this.spinner.hide();

          for (var index of this.value) {
            if (index.no_siri_permohonan == this.c) {
              this.data.push(index);
              this.datearray = this.data[0].dinyatakan_nama_bangunan;
              this.buildingName1 = this.data[0].dinyatakan_nama_bangunan;
              this.buildingName2 = this.data[0].dinyatakan_nama_bangunan;
            }
          }

          // console.log(this.data);

          // this.buildingName1 = this.datearray[0];
          // this.buildingName2 = this.datearray[1];

          this.kutipan = this.data[0].kutipan_sampah;

          this.buildingName1 = this.data[0].dinyatakan_nama_bangunan;

          // Assign value to variables
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

          this.surat_permohonan_perkhidmatan_pembersihan_dokumen =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_dokumen;
          this.surat_salinan_CF_dokumen = this.data[0].surat_salinan_CF_dokumen;
          this.salinan_status_pembanginan_dokumen =
            this.data[0].salinan_status_pembanginan_dokumen;
          this.bagi_status_pembangunan_dokumen =
            this.data[0].bagi_status_pembangunan_dokumen;
this.dinyatakan_jenis_sistem=this.data[0].dinyatakan_jenis_sistem;

          // Notice
          this.surat_permohonan_perkhidmatan_pembersihan_catatan =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_catatan;
          this.surat_salinan_CF_catatan = this.data[0].surat_salinan_CF_catatan;
          this.salinan_status_pembanginan_catatan =
            this.data[0].salinan_status_pembanginan_catatan;
          this.bagi_status_pembangunan_catatan =
            this.data[0].bagi_status_pembangunan_catatan;

          // Notice split
          this.notice1 =
            this.data[0].surat_permohonan_perkhidmatan_pembersihan_catatan.split(
              "@*"
            );
          this.notice2 = this.data[0].surat_salinan_CF_catatan.split("@*");
          this.notice3 =
            this.data[0].salinan_status_pembanginan_catatan.split("@*");
          this.notice4 =
            this.data[0].bagi_status_pembangunan_catatan.split("@*");

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
          // console.log(this.pdffiles4);

           // fiveth file
           this.sp5 = this.data[0].dinyatakan_jenis_sistem.split(",");

           for (let i = 0; i < this.sp5.length; i++) {
             this.temp4 = this.sp5[i].split("/");
             this.pdffiles5.push(this.temp4[this.temp4.length - 1]);
           }
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
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
      if (j == 0) {
        this.firstfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);
        this.uploadFile(data).subscribe((data) => { });
        continue;
      }
      this.firstfile = this.firstfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => { });
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
      if (j == 0) {
        this.secondfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => { });
        continue;
      }
      this.secondfile = this.secondfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => { });
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
      if (j == 0) {
        this.thirdfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => { });
        continue;
      }
      this.thirdfile = this.thirdfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => { });
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
      if (j == 0) {
        this.fourthfile = fileItem.name;
        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.uploadFile(data).subscribe((data) => { });
        continue;
      }
      this.fourthfile = this.fourthfile + "," + fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => { });
    }
    this.uploader3.clearQueue();
    this.updatedata();
    

    for (var i = 0; i < this.uploader4.queue.length; i++) {
      let fileItem = this.uploader4.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
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


  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/public/uploadFile", data);
  }
  updatedata() {
    this.spinner.show();
    if (this.firstfile != "") {
      if (this.pdffiles1 != "") {
        for (let i = 0; i < this.pdffiles1.length; i++) {
          this.firstfile = this.firstfile + "," + this.pdffiles1[i];
        }
        // console.log(this.firstfile);
      }
    } else {
      for (let i = 0; i < this.pdffiles1.length; i++) {
        if (i == 0) {
          this.firstfile = this.pdffiles1[i];
          continue;
        }
        this.firstfile = this.firstfile + "," + this.pdffiles1[i];
      }
      // console.log(this.firstfile);
    }

    if (this.secondfile != "") {
      if (this.pdffiles2 != "") {
        for (let i = 0; i < this.pdffiles2.length; i++) {
          this.secondfile = this.secondfile + "," + this.pdffiles2[i];
        }
      }
    } else {
      for (let i = 0; i < this.pdffiles2.length; i++) {
        if (i == 0) {
          this.secondfile = this.pdffiles2[i];
          continue;
        }
        this.secondfile = this.secondfile + "," + this.pdffiles2[i];
      }
    }

    if (this.thirdfile != "") {
      if (this.pdffiles3 != "") {
        for (let i = 0; i < this.pdffiles3.length; i++) {
          this.thirdfile = this.thirdfile + "," + this.pdffiles3[i];
        }
      }
    } else {
      for (let i = 0; i < this.pdffiles3.length; i++) {
        if (i == 0) {
          this.thirdfile = this.pdffiles3[i];
          continue;
        }
        this.thirdfile = this.thirdfile + "," + this.pdffiles3[i];
      }
    }

    if (this.fourthfile != "") {
      if (this.pdffiles4 != "") {
        for (let i = 0; i < this.pdffiles4.length; i++) {
          this.fourthfile = this.fourthfile + "," + this.pdffiles4[i];
        }
      }
    } else {
      for (let i = 0; i < this.pdffiles4.length; i++) {
        if (i == 0) {
          this.fourthfile = this.pdffiles4[i];
          continue;
        }
        this.fourthfile = this.fourthfile + "," + this.pdffiles4[i];
      }
    }

    if (this.fivethnewfile != "") {
      if (this.pdffiles5 != "") {
        for (let i = 0; i < this.pdffiles5.length; i++) {
          this.fivethnewfile = this.fivethnewfile + "," + this.pdffiles5[i];
        }
      }
    } else {
      for (let i = 0; i < this.pdffiles5.length; i++) {
        if (i == 0) {
          this.fivethnewfile = this.pdffiles5[i];
          continue;
        }
        this.fivethnewfile = this.fivethnewfile + "," + this.pdffiles5[i];
      }
    }


      // first Notice
      let firstNotice = "";

      if (this.surat_permohonan_perkhidmatan_pembersihan_catatan != "") {
        for (let i = 0; i < this.notice1.length; i++) {
          if (i == 0) {
            firstNotice = this.notice1[i];
            continue;
          }
          firstNotice = firstNotice + "@*" +this.notice1[i];
        }
        for (let i = 0; i < this.firstMessage.length; i++) {
          firstNotice = firstNotice + "@*" + this.firstMessage[i];
        }
      } else {
        for (let i = 0; i < this.firstMessage.length; i++) {
          if (i == 0) {
            firstNotice = this.firstMessage[i];
            continue;
          }
          firstNotice = firstNotice + "@*"+ this.firstMessage[i];
        }
      }
  
      // second Notice
      let secondNotice = "";
      if (this.surat_salinan_CF_catatan != "") {
        for (let i = 0; i < this.notice2.length; i++) {
          if (i == 0) {
            secondNotice = this.notice2[i];
            continue;
          }
          secondNotice = secondNotice + "@*" + this.notice2[i];
        }
        for (let i = 0; i < this.secondMessage.length; i++) {
          secondNotice = secondNotice + "@*" + this.secondMessage[i];
        }
      } else {
        for (let i = 0; i < this.secondMessage.length; i++) {
          if (i == 0) {
            secondNotice = this.secondMessage[i];
            continue;
          }
          secondNotice = secondNotice + "@*" + this.secondMessage[i];
        }
      }
  
      // third Notice
      let thirdNotice = "";
  
      if (this.salinan_status_pembanginan_catatan != "") {
        for (let i = 0; i < this.notice3.length; i++) {
          if (i == 0) {
            thirdNotice = this.notice3[i];
            continue;
          }
          thirdNotice = thirdNotice + "@*" + this.notice3[i];
        }
        for (let i = 0; i < this.thirdMessage.length; i++) {
          thirdNotice = thirdNotice + "@*" + this.thirdMessage[i];
        }
      } else {
        for (let i = 0; i < this.thirdMessage.length; i++) {
          if (i == 0) {
            thirdNotice = this.thirdMessage[i];
            continue;
          }
          thirdNotice = thirdNotice + "@*" + this.thirdMessage[i];
        }
      }
  
      // fourth Notice
      let fourthNotice = "";
  
      if (this.bagi_status_pembangunan_catatan != "") {
        for (let i = 0; i < this.notice4.length; i++) {
          if (i == 0) {
            fourthNotice = this.notice4[i];
            continue;
          }
          fourthNotice = fourthNotice + "@*" + this.notice4[i];
        }
        for (let i = 0; i < this.fourthMessage.length; i++) {
          fourthNotice = fourthNotice + "@*" + this.fourthMessage[i];
        }
      } else {
        for (let i = 0; i < this.fourthMessage.length; i++) {
          if (i == 0) {
            fourthNotice = this.fourthMessage[i];
            continue;
          }
          fourthNotice = fourthNotice + "@*" + this.thirdMessage[i];
        }
      }

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.buildingName = this.buildingName1;
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
      dinyatakan_jenis_sistem:this.fivethnewfile,
      surat_permohonan_perkhidmatan_pembersihan_status: 0,
      surat_salinan_CF_status: 0,
      salinan_status_pembanginan_status: 0,
      bagi_status_pembangunan_status: 0,
      status_dokumen_keseluruhan: 0,
      surat_permohonan_perkhidmatan_pembersihan_catatan: firstNotice,
      surat_salinan_CF_catatan: secondNotice,
      salinan_status_pembanginan_catatan: thirdNotice,
      bagi_status_pembangunan_catatan: fourthNotice,
    };

    // console.log(body);

    this.http
      .put<any>(
        this.baseUrl + "/dbkl/updatePublicApplicationDetails/" + this.c,
        body,
        { headers: headers }
      )
      .subscribe({
        next: (data) => {
          // console.log(data);
          this.openSuccessModal();
          this.spinner.hide();
        },
        error: (error) => {
          this.errorMessage = error.message;
          // console.error("There was an error!", error);
          this.openErrorModal();
          this.spinner.hide();
        },
      });
  }

  backtotop() {
    window.scroll(0, 0);
  }

  garbageData(event) {
    // console.log("checkbox data", event.target.value);
  }
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
    // window.location.reload();
    this.router.navigateByUrl("/publicpage");
  }

  closeErrorModal() {
    this.display = "none";
    // window.location.reload();
    this.router.navigateByUrl("/publicpage");
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
          localStorage.clear();

          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

  removevalue1(event) {
    // console.log(event.target.id);
    this.restfile = "";
    // document.getElementById("id"+event.target.id).style.display="none";
    // document.getElementById("cl"+event.target.id).style.display="none";

    for (let i = 0; i < this.pdffiles1.length; i++) {
      if (i == event.target.id) {
        this.check1 = true;
        this.pdffiles1.splice(i, 1);
        this.sp1.splice(i, 1);

        break;
      }
    }

    // console.log(this.restfile);
  }

  removevalue2(event) {
    // console.log(event.target.id);
    this.restfile2 = "";
    // document.getElementById("id2"+event.target.id).style.display="none";
    // document.getElementById("cl2"+event.target.id).style.display="none";

    for (let i = 0; i < this.pdffiles2.length; i++) {
      if (i == event.target.id) {
        this.check2 = true;
        this.pdffiles2.splice(i, 1);
        this.sp2.splice(i, 1);

        break;
      }
      // console.log("2");
    }

    //console.log(this.restfile2);
  }

  removevalue3(event) {
    // console.log("id3" + event.target.id);
    this.thirdfile = "";
    // document.getElementById("id3"+event.target.id).style.display="none";
    // document.getElementById("cl3"+event.target.id).style.display="none";
    for (let i = 0; i < this.pdffiles3.length; i++) {
      if (i == event.target.id) {
        this.pdffiles3.splice(i, 1);
        this.sp3.splice(i, 1);

        break;
      }
      // console.log("3");
    }

    // console.log(this.thirdfile);
  }

  removevalue4(event) {
    // console.log("id4" + event.target.id);
    this.fourthfile = "";
    // document.getElementById("id4"+event.target.id).style.display="none";
    // document.getElementById("cl4"+event.target.id).style.display="none";
    for (let i = 0; i < this.pdffiles4.length; i++) {
      if (i == event.target.id) {
        this.pdffiles4.splice(i, 1);
        this.sp4.splice(i, 1);

        break;
      }
      // console.log("4");
    }

    // console.log(this.fourthfile);
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
      this.firstMessage.push("PUBLIC: "+this.first);
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
      this.secondMessage.push("PUBLIC: "+this.second);
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
      this.thirdMessage.push("PUBLIC: "+this.third);
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
      this.fourthMessage.push("PUBLIC: "+this.four);
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



  removevalue11(event) {
    
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

  removevalue12(event) {
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

  removevalue13(event) {
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

  removevalue14(event) {
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

  getPdf(e){
  //  console.log(e)
    this.downloadPdf(e)
    .then(blob => {
    //  console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
    //  console.log(fileURL);
      
      let tab = window.open();
      tab.location.href = fileURL
    });
  }
  downloadPdf(id: number) {
    let key=localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      "Authorization": key,

    };


    return this.http
      .get(this.basePublicUrl+"/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
      .toPromise();
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
