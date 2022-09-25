import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-job-payment",
  templateUrl: "./job-payment.component.html",
  styleUrls: ["./job-payment.component.css"],
})
export class JobPaymentComponent implements OnInit {
  url: any = environment.basePublicUrl;
  imageGroup: any;
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  baseUrl = environment.basePublicUrl;
  invoicedata: string;
  dataobject: any;
  nama_pemohon: any;
  emal: any;
  jumlah_tuntutan: any;
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

  bd44Uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  laporanTuntutanUploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  validation_messages = {
    npId: [{ type: "required", message: "namaPemohan is required" }],
    eMel: [{ type: "required", message: "eMel is required" }],
    jumlahTuntutan: [
      { type: "required", message: "jumlahTuntutan is required" },
    ],
    namaPemohan: [
      { type: "required", message: "namaPemohan is required" },
      { type: "pattern", message: "invalid name" },
    ],
  };
  firstFile: string;
  firstFile1: string;
  firstFile2: string;
  secondFIle: string;
  ThirdFile: string;
  no_inbois: string;
  kontraktor: string;
  npErrorMessage: any;
  showToast: boolean;
  display: string;
  display1: string;
  submitted: boolean;
  dataArray: any;
  FilesArray: any;
  firstfile: any;
  secondfile: any;
  thirdfile: any;
  showfiles: boolean;
  npid: string;
  npid1: string;
  kontraktor1: string;
  UploaderData1: any = [];
  UploaderData2: any = [];
  UploaderData3: any = [];
  FileArray: any = [];
  FileArray1: any = [];
  FileArray2: any = [];
  myfiles: string;
  myfiles1: string;
  myfiles2: string;
  bd44Files: string;
  laporanTuntutanFiles: string;
  spiltedData1: string = "";
  f1: any = [];
  file: any;
  f2: any;
  f3: any;
  data2: any;
  selecteditem: any;
  dataarry: string;
  isError: boolean;
  isError2: any;
  lang: string;
  errormsg: string;
  successmsg: string;
  agency_token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.agency_token = localStorage.getItem('egency_token');

    window.scroll(0, 0);
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "agency/createinvoice");
    this.invoicedata = localStorage.getItem("invoicedata");
    this.no_inbois = localStorage.getItem("data2");
    this.kontraktor = localStorage.getItem("data1");

    //console.log(this.no_inbois + " " + this.kontraktor);


    this.dataobject = JSON.parse(this.invoicedata);
    // console.log(this.dataobject);
    this.imageGroup = new FormGroup({
      namaPemohan: new FormControl("", [
        Validators.required,

      ]),

      eMel: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"),
      ]),
      jumlahTuntutan: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{1,}$")]),
      noinvoicee: new FormControl("", [Validators.required]),
      kontraktorr: new FormControl("", [
        Validators.required,
      ]),
      file: new FormControl("", [Validators.required]),
      file1: new FormControl("", [Validators.required]),
      file2: new FormControl("", [Validators.required]),
    });
    this.uploader.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader1.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader2.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader3.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
  }

  uploadSubmit() {
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      this.UploaderData1.push(fileItem.name);
      this.myfiles = JSON.stringify(this.UploaderData1);
      this.firstFile = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => {});
    }

    for (var j = 0; j < this.uploader1.queue.length; j++) {
      let data1 = new FormData();
      let fileItem = this.uploader1.queue[j]._file;
      this.UploaderData2.push(fileItem.name);
      this.myfiles1 = JSON.stringify(this.UploaderData2);
      this.secondFIle = fileItem.name;
      data1.append("file", fileItem);
      data1.append("fileSeq", "seq" + j);
      this.uploadFile(data1).subscribe((data) => {});
    }
    this.uploader1.clearQueue();

    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data2 = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      this.UploaderData3.push(fileItem.name);
      this.myfiles2 = JSON.stringify(this.UploaderData3);
      this.ThirdFile = fileItem.name;
      data2.append("file", fileItem);
      data2.append("fileSeq", "seq" + j);
      this.uploadFile(data2).subscribe((data) => {});
    }
    this.uploader2.clearQueue();

    for (var j = 0; j < this.bd44Uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.bd44Uploader.queue[j]._file;
      this.bd44Files = JSON.stringify([fileItem.name])
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => {});
    }
    this.bd44Uploader.clearQueue();

    for (var j = 0; j < this.laporanTuntutanUploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.laporanTuntutanUploader.queue[j]._file;
      this.laporanTuntutanFiles = JSON.stringify([fileItem.name])
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => {});
    }
    this.laporanTuntutanUploader.clearQueue();
  }

  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }

  get f() {
    return this.imageGroup.controls;
  }

  CreateInvoice() {
    localStorage.setItem("invoicid", this.no_inbois);
    localStorage.setItem("kontraktor1", this.kontraktor);
    this.submitted = true;
    if (this.imageGroup.invalid) {
      //console.log("ii");

      return;
    }
    this.spinner.show();
    this.uploadSubmit();

    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    let body = {
      invoice_no: this.no_inbois,
      contractor: this.kontraktor,
      applicant_name: this.nama_pemohon,
      e_mei: this.emal,
      amount_claim: this.jumlah_tuntutan,
      invoice_document: this.myfiles.substring(2, this.myfiles.length - 2),
      summary_document: this.myfiles1.substring(2, this.myfiles1.length - 2),
      attachment: this.myfiles2.substring(2, this.myfiles2.length - 2),
      bd44: this.bd44Files.substring(2, this.bd44Files.length - 2),
      laporan_tuntutan: this.laporanTuntutanFiles.substring(2, this.laporanTuntutanFiles.length - 2)
    };
    // console.log(
    //   "my body" + JSON.stringify(body))
    this.http
      .post(environment.basePublicUrl + "/agensi/createInvoice", body, {
        headers: headers,
      })
      .subscribe(
        (resp) => {
          this.npid1 = localStorage.getItem("invoicid");
          this.kontraktor1 = localStorage.getItem("kontraktor1");
          // console.log(resp);
          this.spinner.hide();
          if (resp["status"] == "success") {

            this.openModal();
            if (resp["message"] == "payment_claim_added") {
              if (this.lang == "en") {
                this.successmsg = "Payment Claim added successfully!";
              }
              else {
                this.successmsg = "Tuntutan Pembayaran berjaya ditambahkan!";
              }
            }
          } else {
          }


        },
        (error) => {
          // console.log(".....",error['error']['message']);

          this.spinner.hide();
          this.openModal1();
          this.isError2 = error["error"]["message"];

          if (this.isError2 == "payment_claim_not_added") {
            if (this.lang == "en") {
              this.errormsg = "Payment Claim could not be added! Please refer console logs for further details.";
            }
            else {
              this.errormsg = "Tuntutan Pembayaran tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
          else if (this.isError2 == "invoice_exists") {
            if (this.lang == "en") {
              this.errormsg = "Invoice id already exists!";
            }
            else {
              this.errormsg = "Id invois sudah ada!";
            }
          }


        }
      );
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.showfiles = true;
    this.spinner.show();
    this.display = "none";

    // let body = {
    //   invoice_no: this.no_inbois,
    //   contractor: this.kontraktor,
    // };
    // this.http
    //   .post(environment.basePublicUrl + "/agensi/getInvoice", body)
    //   .subscribe((data) => {

    //     this.spinner.hide();
    //     this.FilesArray = data;

    //     this.f1 = data[0].ringkasan_dokumen.split(",");

    //     for (let i = 0; i < this.f1.length; i++) {


    //       let f = this.f1[i].split("/");

    //       this.FileArray.push(f[f.length - 1]);

    //     }
    //     this.f2 = data[0].inbois_dokumen.split(",");
    //     for (let i = 0; i < this.f2.length; i++) {
    //       let f1 = this.f2[i].split("/");
    //       this.FileArray1.push(f1[f1.length - 1]);
    //     }
    //     this.f3 = data[0].lampiran.split(",");
    //     for (let i = 0; i < this.f3.length; i++) {
    //       let f2 = this.f3[i].split("/");
    //       this.FileArray2.push(f2[f2.length - 1]);
    //     }
    //   });
    this.data2 = localStorage.getItem("data1");
    this.selecteditem = localStorage.getItem("data2");

    this.http
      .post(this.baseUrl + "/agensi/getInvoice", {
        invoice_no: this.selecteditem,
        contractor: this.data2,
      })
      .subscribe(
        (data) => {
          this.dataarry = JSON.stringify(data);
          localStorage.setItem("invoicedata", this.dataarry);

          this.spinner.hide();
          this.router.navigateByUrl("/agency/updateinvoice");

        },
        (error) => {
          this.spinner.hide();
          this.openModal1();
          this.isError2 = error["error"]["message"];
          if (this.isError2 == "invoice_exists") {
            if (this.lang == "en") {
              this.errormsg = "Invoice id already exists!";
            }
            else {
              this.errormsg = "Id invois sudah ada!";
            }
          }
        }
      );
  }

  openModal1() {
    this.display1 = "block";
  }

  onCloseHandled1() {
    this.display1 = "none";
    this.router.navigateByUrl("/agency");
  }
  comeback() {
    this.router.navigateByUrl("/agency");
  }

  backtotop() {
    window.scroll(0, 0);

  }
}
