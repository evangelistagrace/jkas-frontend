import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { saveAs } from 'file-saver';

@Component({
  selector: "app-finacial-claim-review",
  templateUrl: "./finacial-claim-review.component.html",
  styleUrls: ["./finacial-claim-review.component.css"],
})
export class FinacialClaimReviewComponent implements OnInit {
  imageGroup: any;
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  uploader1: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  uploader2: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  uploader3: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  invoicedata: string;
  dataobject: any;
  secondfile: string;
  firstfile: string;
  url: any = environment.basePublicUrl;
  basePublicUrl: any = environment.basePublicUrl;
  registrationGroup: any;
  thirdfile: string;
  isfirstfile: boolean;
  issecondfile: boolean;
  isthirdfile: boolean;
  display: string;
  display1: string;
  array1: any = [];
  model: any;
  model1: any;
  model2: any;

  splited: any = [];
  invoice: string;
  no_nbois: string;
  e_mei: any;
  inbois_dokumen: any;
  jumlah_tuntutan: any;
  kemaskini_status: any;
  kontraktor: any;
  lampiran: any;
  nama_pemohon: any;
  ringkasan_dokumen: any;
  ulasan_pegawai: any;
  data: any;
  email: any;
  status: any;
  updatestatus: any;
  selectGroup: FormGroup;
  submitted: boolean;
  detailedmeeting: any;
  meetingupdate: string;
  lang: string;
  loginError: boolean;
  errorMsg: any;
  errmsg: string;
  pd1: any = [];
  pdf1: any = [];
  pd2: any = [];
  pdf2: any = [];
  pd3: any = [];
  pdf3: any = [];
  bd44: string;
  laporanTuntutan: string;
  UploaderData1: any = [];

  myfiles: string;
  firstFile: string;
  UploaderData2: any = [];
  secondFIle: string;
  myfiles1: string;
  UploaderData3: any = [];
  ThirdFile: string;
  myfiles2: string;
  filename: string;
  filename1: string;
  filename2: string;
  filename3: string;
  firstFile1: string;
  firstFile2: any;
  isAdminType: string;
  username: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.uploader.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        this.filename = fileItem.name;
      }
      //console.log(this.filename);

    };
    this.uploader1.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader1.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader1.queue.length; i++) {
        let fileItem1 = this.uploader1.queue[i]._file;
        this.filename1 = fileItem1.name;
      }
      // console.log(this.filename1);
    };
    this.uploader2.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader2.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader2.queue.length; i++) {
        let fileItem2 = this.uploader2.queue[i]._file;
        this.filename2 = fileItem2.name;
      }
      //console.log(this.filename2);
    };
    this.uploader3.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader3.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader3.queue.length; i++) {
        let fileItem3 = this.uploader3.queue[i]._file;
        this.filename3 = fileItem3.name;
      }
      //console.log(this.filename3);

    };

    this.selectGroup = new FormGroup({
      status: new FormControl("", [Validators.required]),
      comment: new FormControl(""),
    });
    window.scroll(0, 0);

    this.spinner.show();
    this.no_nbois = this.route.snapshot.queryParamMap.get("value");
    localStorage.setItem("path", "/dbkl/financialclaim?value=" + this.no_nbois);
    let key = localStorage.getItem("AccessToken");
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };

    // console.log("this is my body" + body)

    this.http
      .get(
        this.basePublicUrl +
        "/dbkl/getAgencyJobPaymentClaimByInbois/" +
        this.no_nbois,
        { headers: headers }
      )
      .subscribe((res: any) => {
        console.log('result: ', res);
        this.bd44 = res.bd44;
        this.laporanTuntutan = res.laporan_tuntutan;
        this.kontraktor = res.kontraktor;
        this.e_mei = res.e_mei;
        this.nama_pemohon = res.nama_pemohon;
        this.jumlah_tuntutan = res.jumlah_tuntutan;

        this.spinner.hide();
        this.data = res;
        this.pd1 = this.data.ringkasan_dokumen.split(',');
        for (let i = 0; i < this.pd1.length; i++) {
          let p1 = this.pd1[i].split('/');
          this.pdf1.push(p1[p1.length - 1]);
        }
        //console.log(this.pdf1);
        this.pd2 = this.data.lampiran.split(',');
        for (let i = 0; i < this.pd2.length; i++) {
          let p2 = this.pd2[i].split('/');
          this.pdf2.push(p2[p2.length - 1]);
        }

        this.pd3 = this.data.inbois_dokumen.split(',');
        for (let i = 0; i < this.pd3.length; i++) {
          let p3 = this.pd3[i].split('/');
          this.pdf3.push(p3[p3.length - 1]);
        }


        (this.inbois_dokumen = this.basePublicUrl + this.data.inbois_dokumen),
          (this.jumlah_tuntutan = this.data.jumlah_tuntutan),
          (this.kemaskini_status = this.data.kemaskini_status),
          (this.kontraktor = this.data.kontraktor),
          (this.lampiran = this.basePublicUrl + this.data.lampiran),
          (this.nama_pemohon = this.data.nama_pemohon),
          (this.no_nbois = this.data.no_nbois),
          (this.ringkasan_dokumen =
            this.basePublicUrl + this.data.ringkasan_dokumen),
          (this.ulasan_pegawai = this.data.ulasan_pegawai);
        (this.e_mei = this.data.e_mei),
          localStorage.setItem("e_mei", this.data.e_mei);
        localStorage.setItem("inbois_dokumen", this.data.inbois_dokumen);
        localStorage.setItem("jumlah_tuntutan", this.data.jumlah_tuntutan);
        localStorage.setItem("kemaskini_status", this.data.kemaskini_status);
        localStorage.setItem("kontraktor", this.data.kontraktor);
        localStorage.setItem("lampiran", this.data.lampiran);
        localStorage.setItem("nama_pemohon", this.data.nama_pemohon);
        localStorage.setItem("ringkasan_dokumen", this.data.ringkasan_dokumen);
        localStorage.setItem("no_nbois", this.data.no_nbois);
        localStorage.setItem("ulasan_pegawai", this.data.ulasan_pegawai);
        //console.log( this.lampiran);
      });
  }
  backtotop() {
    window.scroll(0, 0);
  }

  uploadSubmit() {
    // for (var i = 0; i < this.uploader.queue.length; i++) {
    //   let fileItem = this.uploader.queue[i]._file;
    //   if (fileItem.size > 10000000) {
    //     alert("Each File should be less than 10 MB of size.");
    //     return;
    //   }
    // }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData1.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles = JSON.stringify(this.UploaderData1);

      this.firstFile = fileItem.name;
      //console.log(this.firstFile);
      localStorage.setItem("inbois_dokumen", this.firstFile);
      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader.clearQueue();


    for (var j = 0; j < this.uploader1.queue.length; j++) {
      let data1 = new FormData();
      let fileItem = this.uploader1.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData2.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles1 = JSON.stringify(this.UploaderData2);

      this.firstFile1 = fileItem.name;
      //console.log(this.firstFile1);
      localStorage.setItem("ringkasan_dokumen", this.firstFile1);
      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data1.append("file", fileItem);
      data1.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader1.clearQueue();


    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data2 = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData3.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles2 = JSON.stringify(this.UploaderData3);

      this.firstFile2 = fileItem.name;
      //console.log( this.firstFile2);
      localStorage.setItem("lampiran", this.firstFile2);
      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data2.append("file", fileItem);
      data2.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader2.clearQueue();
  }


  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.basePublicUrl, data);
  }

  getSelected(event) {
    // console.log(event.target.value);
    this.updatestatus = event.target.value;
  }
  get f() { return this.selectGroup.controls; }

  updateInvoice() {
    console.log('status: ', this.updatestatus, ', ulasan: ', this.ulasan_pegawai);
    this.submitted = true;
    // if (this.selectGroup.invalid) {
    //   alert('Sila semak kembali input anda.');
    //   return;
    // }
    this.spinner.show();
    this.uploadSubmit();

    let key = localStorage.getItem("AccessToken");
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {
      nama_pemohon: localStorage.getItem("nama_pemohon"),
      e_mei: localStorage.getItem("e_mei"),
      jumlah_tuntutan: localStorage.getItem("jumlah_tuntutan"),
      inbois_dokumen: localStorage.getItem("inbois_dokumen"),
      ringkasan_dokumen: localStorage.getItem("ringkasan_dokumen"),
      lampiran: localStorage.getItem("lampiran"),
      status: this.updatestatus,
      ulasan_pegawai: this.ulasan_pegawai,
    };

    this.http
      .put(
        environment.basePublicUrl +
        "/dbkl/updateAgencyJobPaymentClaimByInbois/" +
        this.no_nbois,
        body,
        { headers: headers }
      )
      .subscribe(
        (data) => {


          this.spinner.hide();
          this.openModal();
          this.detailedmeeting = data["message"];
          if (this.meetingupdate == "payment_claim_updated") {
            if (this.lang == "en") {
              this.meetingupdate = "Financial Claim updated successfully!";
            }
          }
          else {
            this.meetingupdate = "Tuntutan Kewangan berjaya dikemas kini!";
          }


        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          this.openModal1();

          if (this.errorMsg == "payment_claim_not_updated") {
            if (this.lang == "en") {
              this.errmsg = "Financial Claim could not be updated! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "Tuntutan Kewangan tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }

        });
  }
  onchange1(event: any) {
    this.isfirstfile = false;
    // console.log(this.isfirstfile)
  }
  onchange2(event: any) {
    this.issecondfile = false;
    // console.log(this.isfirstfile)
  }

  onchange3(event: any) {
    this.isthirdfile = false;
    // console.log(this.isfirstfile)
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.router.navigateByUrl("dbkl/claim-review");
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    this.router.navigateByUrl("dbkl/dbklmainpage");
  }
  getPdf(e) {
    this.downloadPdf(e)
      .then(blob => {
        saveAs(blob, e);
        var fileURL = window.URL.createObjectURL(blob);
        let tab = window.open();
        tab.location.href = fileURL
      });
  }
  downloadPdf(id: number) {
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      "Authorization": key,

    };
    return this.http
      .get(environment.basePublicUrl + "/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
      .toPromise();
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
          // console.log("error is", error["error"]);
        }
      );
  }
}
