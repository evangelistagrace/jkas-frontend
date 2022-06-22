import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { saveAs } from 'file-saver';
@Component({
  selector: "app-create-innvoice",
  templateUrl: "./create-innvoice.component.html",
  styleUrls: ["./create-innvoice.component.css"],
})
export class CreateInnvoiceComponent implements OnInit {

  url: any = environment.basePublicUrl;
  SERVER_URL: any = this.url + "/public/uploadFile";
  imageGroup: any;
  validation_messages = {
    npId: [{ type: "required", message: "namaPemohan is required" }],
    eMel: [{ type: "required", message: "namaPemohan is required" }],
    jumlahTuntutan: [{ type: "required", message: "namaPemohan is required" }],
  };

  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  public uploader1: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  public uploader2: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  public uploader3: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  invoicedata: string;
  dataobject: any;
  secondfile: string;
  firstfile: string;
  registrationGroup: any;
  thirdfile: string;
  isfirstfile: boolean;
  issecondfile: boolean;
  isthirdfile: boolean;
  display: string;
  display1: string;
  array1: any = [];
  splited: any = [];
  firstDocArray: any = [];
  invoisDoc: string;
  add1stDoc: string;
  add2ndDoc: any;
  add3rdDoc: any;
  invos: any;
  kontrack: any;
  invoisData: any = [];
  fastFile: any;
  add1stDoc1: string;
  add2ndDoc2: any;
  add3rdDoc3: any;
  clicked: boolean;
  invoisid: any;
  email: any;
  permonan: any;
  jumlahtun: any;
  FileArray: any = [];
  FileArray1: any = [];
  FileArray2: any = [];
  myfiles: string;
  myfiles1: string;
  myfiles2: string;
  spiltedData1: string = "";
  f1: any = [];
  file: any;
  f2: any;
  f3: any;
  array2: any = [];
  array3: any = [];
  npErrorMessage: any;
  LengthOf1stFile: any;
  isError2: any;
  lang: string;
  errormsg: string;
  successmsg: string;
  successmsg2: string;
  islogin: string;
  agency_token: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
   

    window.scroll(0, 0);
    this.islogin = localStorage.getItem('islogin');
    if (this.islogin != "true" && this.islogin != "") {
      this.router.navigateByUrl("agency");
    }

    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "agency/updateinvoice");
    window.scroll(0, 0);
    this.spinner.hide();
    this.isfirstfile = true;
    this.issecondfile = true;
    this.isthirdfile = true;
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

    this.invoicedata = localStorage.getItem("invoicedata");
    this.dataobject = JSON.parse(this.invoicedata);
     //console.log(JSON.stringify(this.dataobject));
    this.splited.push(this.dataobject[0].inbois_dokumen.split(".pdf"));
    this.invoisDoc = this.dataobject[0].inbois_dokumen;
    this.invoisid = this.dataobject[0].no_inbois;
    this.kontrack = this.dataobject[0].kontraktor;
    this.permonan = this.dataobject[0].nama_pemohon;
    this.email = this.dataobject[0].e_mei;
    this.permonan = this.dataobject[0].nama_pemohon;
    this.jumlahtun = this.dataobject[0].jumlah_tuntutan;
    this.add1stDoc = this.dataobject[0].inbois_dokumen;
    this.f1 = this.add1stDoc.split(",");
    // console.log(this.f1 + " " + this.f1.length);
    for (let i = 0; i < this.f1.length; i++) {
      // console.log(this.f1[i]);

      let f = this.f1[i].split("/");
      // console.log(f[f.length - 1]);
      this.FileArray.push(f[f.length - 1]);
      this.LengthOf1stFile = this.FileArray.length;
      if (this.FileArray == "") {
        this.FileArray = [];
      }
    }
    this.add2ndDoc = this.dataobject[0].ringkasan_dokumen;
    this.f2 = this.add2ndDoc.split(",");
    for (let i = 0; i < this.f2.length; i++) {
      let f1 = this.f2[i].split("/");
      this.FileArray1.push(f1[f1.length - 1]);
      if (this.FileArray1 == "") {
        this.FileArray1 = [];
      }
    }

    this.add3rdDoc = this.dataobject[0].lampiran;
    this.f3 = this.add3rdDoc.split(",");
    for (let i = 0; i < this.f3.length; i++) {
      // console.log(this.f1[i]);

      let f2 = this.f3[i].split("/");
      this.FileArray2.push(f2[f2.length - 1]);
      if (this.FileArray2 == "") {
        this.FileArray2 = [];
      }
    }
    this.invos = this.dataobject[0].no_inbois;
    this.kontrack = this.dataobject[0].kontraktor;

    // console.log("my response is" + this.splited);
    this.imageGroup = new FormGroup({
      namaPemohan: new FormControl("", [Validators.required]),
      eMel: new FormControl("", [Validators.required]),
      jumlahTuntutan: new FormControl("", [Validators.required]),
    });
  }
  makefalse() {
    localStorage.setItem('islogin', 'false');
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
      this.firstfile = fileItem.name;
      this.FileArray.push(this.firstfile);
      // console.log(this.array1);
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader.clearQueue();

    // 2nd uploader

    // for (var i = 0; i < this.uploader1.queue.length; i++) {
    //   let fileItem = this.uploader1.queue[i]._file;
    //   if (fileItem.size > 10000000) {
    //     alert("Each File should be less than 10 MB of size.");
    //     return;
    //   }
    // }
    for (var j = 0; j < this.uploader1.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader1.queue[j]._file;
      // console.log(fileItem.name);
      this.secondfile = fileItem.name;
      this.FileArray1.push(this.secondfile);

      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    //console.log(this.FileArray1);
    
    this.uploader1.clearQueue();

    // for (var i = 0; i < this.uploader2.queue.length; i++) {
    //   let fileItem = this.uploader2.queue[i]._file;
    //   if (fileItem.size > 10000000) {
    //     alert("Each File should be less than 10 MB of size.");
    //     return;
    //   }
    // }
    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      // console.log(fileItem.name);
      this.thirdfile = fileItem.name;
      this.FileArray2.push(this.thirdfile);

      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    //console.log(this.FileArray2);
    
    this.uploader2.clearQueue();
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }
  updateInvoice() {
    this.uploadSubmit();

    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    let body = {
      invoice_no: this.invoisid,
      contractor: this.kontrack,
      applicant_name: this.permonan,
      e_mei: this.email,
      amount_claim: this.jumlahtun,
      invoice_document: this.FileArray,
      summary_document: this.FileArray1,
      attachment: this.FileArray2,
      status: this.dataobject[0].status,
      employee_review: this.dataobject[0].ulasan_pegawai,
    };
    // console.log("this is my body" + JSON.stringify(body))
    this.spinner.show();
    this.http
      .put(environment.basePublicUrl + "/agensi/updateInvoice", body, {
        headers: headers,
      })
      .subscribe(
        (data) => {

          this.spinner.hide();
          if (data["status"] == "success") {
            this.openModal2();
            this.successmsg2 = data["message"];
            if (this.successmsg2 == "payment_claim_updated") {
              if (this.lang == "en") {
                this.successmsg = "Payment Claim updated successfully!";
              }
              else {
                this.successmsg = "Tuntutan Pembayaran berjaya dikemas kini!";
              }
            }
          } else {
          }
        },
        (error) => {
          this.spinner.hide();
          this.openModal1;
          this.isError2 = error["error"]["message"];
          //console.log(this.isError2)
          if (this.isError2 == "payment_claim_not_updated") {
            if (this.lang == "en") {
              this.errormsg = "Payment Claim could not be updated! Please refer console logs for further details.";
            }
            else {
              this.errormsg = "Tuntutan Pembayaran tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }

        }
      );
  }
  openModal2() {
    this.display = "block";
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
    this.spinner.show();
    localStorage.clear();

    let body = {
      invoice_no: this.invos,
      contractor: this.kontrack,
    };

    this.http
      .post(environment.basePublicUrl + "/agensi/getInvoice", body)
      .subscribe((data) => {
         //console.log(data);
        this.clicked = true;
        this.spinner.hide();
        this.invoicedata = JSON.stringify(data);
        localStorage.setItem("invoicedata", this.invoicedata);
        location.reload();
        this.invoisData = data;
        this.add1stDoc1 = this.invoisData[0].inbois_dokumen;
        this.add2ndDoc2 = this.invoisData[0].ringkasan_dokumen.substring(
          28,
          this.invoisData[0].ringkasan_dokumen.length
        );
        this.add3rdDoc3 = this.invoisData[0].inbois_dokumen.substring(
          28,
          this.invoisData[0].inbois_dokumen.length
        );
        // console.log(this.add1stDoc)
      }),
      (error) => {
        this.spinner.hide();
      };
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    this.router.navigateByUrl("/agency");
  }
  remove(index) {
    this.FileArray.splice(index, 1);
  }
  remove1(index) {
    this.FileArray1.splice(index, 1);
  }
  remove2(index) {
    this.FileArray2.splice(index, 1);
  }
  getPdf(e){
    this.downloadPdf(e)
    .then(blob => {
      //console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
      //console.log(fileURL);
      
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
      .get("{{url}}/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
      .toPromise();
  }

  backtotop() {
    window.scroll(0, 0);
   
  }

}
