import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as $ from 'jquery';
import { saveAs } from 'file-saver';
@Component({
  selector: "app-new-feedback",
  templateUrl: "./new-feedback.component.html",
  styleUrls: ["./new-feedback.component.css"],
})
export class NewFeedbackComponent implements OnInit {
  feedbackDrop=[
    "SELESAI",
"TIDAK SELESAI" 
  ]
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

  baseUrl = environment.basePublicUrl;
  myForm: any;
  registrationGroup: any;
  selected: any;
  nama_pegawai_merinyu: any;
  validation_messages = {
    dropdown: [{ type: "required", messages: "This field is required!" }],
    status: [{ type: "required", messages: "This field is required!" }],
    image: [{ type: "required", messages: "This field is required!" }],
    officer: [{ type: "required", messages: "This field is required!" }],
    notes: [{ type: "required", messages: "This field is required!" }],
  };
  fileName: any = [];
  url: any = environment.basePublicUrl;
  SERVER_URL: any = this.url + "/public/uploadFile";
  beforeimage: string;
  afterimage: string;
  // url: any;
  feedback: any;
  display: string;
  display1: string;
  submitted: boolean;
  agensi_token: string;
  firstImage: boolean;
  secondImage: boolean;
  npid: string;
  ResponseArray: any = [];
  Fid: any;
  Organizations: Object;
  npErrorMessage: any;
  lang: string;
  errormsg: string;
  msg: string;
  bimg: any;
  aimg: any;
  report_image: any;
  status: any;
  beforedt: any;
  afterdt: any;
  firstlength: any;
  secondlength: any;
  clicked: boolean = true;
  bimghide: boolean = true;
  aimghide: boolean = true;
  reviewval: boolean;
  var1: boolean;
  reportdt: any;
  bimg1: any;
  aimg1: any;
  img: Observable<Blob>;
  isImageLoading: boolean;
  notes: any;
  katatan: any;
  agency_token: any;
  ;
  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // $(function () {
    //   $(".pushme").click(function () {
    //     $(this).text(function (i, v) {
    //       return v !== 'PUSH ME' ? 'DON"T PUSH ME' : 'PUSH ME'
    //     })
    //   });
    // })

    // Img Authorization
    this.agency_token = localStorage.getItem('egency_token');
    if (!this.agency_token) {
      this.router.navigateByUrl("/agency");
    }


    $("#SeeMore2").click(function () {
      var $this = $(this);
      $this.toggleClass("SeeMore2");
      if ($this.hasClass("SeeMore2")) {
        $this.text("Sembunyikan ulasan ") +
          $this.append(
            '<i class="icofont-simple-up" style="color:white;font-size: xx-large !important";cursor: pointer;"aria-hidden="true" (click)="showreview()" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 "></i>'
          );
      } else {
        $this.text("Mengkaji Semula ") +
          $this.append(
            '<i class="icofont-simple-down" style="color:white;font-size:xx-large !important";cursor: pointer;"aria-hidden="true" (click)="showreview()" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 "></i>'
          );
      }
    });


    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "agency/new-feedback");
    window.scroll(0, 0);
    localStorage.setItem("isAgency", "false");
    this.http
      .get(environment.basePublicUrl + "/agensi/getOrganisationList")
      .subscribe((data) => {
        // console.log(data);
        this.Organizations = data;
      });
    this.npid = localStorage.getItem("npid");
    this.agensi_token = localStorage.getItem("egency_token");
    window.scroll(0, 0);
    this.registrationGroup = new FormGroup({

      officer: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]{3,32}$"),
      ]),
      notes: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z ]*$"),
      ]),
      // feedback: new FormControl("", [
      //   Validators.required,
      //   Validators.pattern("^[a-zA-Z]{3,32}$"),
      // ]),
    });

    let headers = {
      "accept": "application/json",
      Authorization: this.agensi_token,

    }

    // this.spinner.show();
    this.http.get(environment.basePublicUrl + "/agensi/getLastFeedback", { headers: headers }).subscribe(data => {
      //console.log("see the last feedback" + JSON.stringify(data));

      let imgArray=data[0].gambar_sebelum.split("/");
      this.bimg1=imgArray[imgArray.length-1];

      let imgArray1=data[0].gambar_selepas.split("/");
      this.aimg1=imgArray1[imgArray1.length-1]
      
     this.getImageFromService1(this.bimg1);
     this.getImageFromService2(this.aimg1);

      // this.bimg = environment.basePublicUrl + data[0].gambar_sebelum;
      // this.aimg = environment.basePublicUrl + data[0].gambar_selepas;
      this.selected = data[0].organisasi;
      this.nama_pegawai_merinyu = data[0].nama_pegawai_merinyu;
      this.feedback = data[0].maklum_balas;
      //console.log("feedback",this.feedback);
      this.notes=data[0].katatan;
      this.report_image = environment.basePublicUrl + data[0].gambar_laporan;
      this.status = data[0].kerja_selesail;
      this.beforedt = data[0].sebelum_tarikh_masa;
      this.afterdt = data[0].selepas_tarikh_masa;
      this.firstlength = data[0].sebelum_tarikh_masa.length;
      this.secondlength = data[0].selepas_tarikh_masa.length;
      this.reportdt = data[0].aporan_tarikh_masa;
    
      //console.log("feedback",this.feedback);

      this.spinner.hide();
    })
  }

  getImageFromService1(img:any) {
    this.isImageLoading = true;
    this.getImage1(this.bimg1).subscribe(data => {
      this.createImageFromBlob1(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
     // console.log(error);
    });
}

  getImage1(id: string): Observable<Blob> {
    let headers = {
      "accept": "image/png",
      Authorization: this.agensi_token,
    };
    return this.http.get(environment.basePublicUrl+"/jkas_resourses/public/images/" + this.bimg1, {headers,responseType: "blob"});
}

imageToShow: any;

createImageFromBlob1(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      
      this.bimg =this.imageToShow
      
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

getImageFromService2(img:any) {
  this.isImageLoading = true;
  this.getImage2(this.aimg1).subscribe(data => {
    this.createImageFromBlob2(data);
    this.isImageLoading = false;
  }, error => {
    this.isImageLoading = false;
    
  });
}

getImage2(id: string): Observable<Blob> {
  let headers = {
    "accept": "image/png",
    Authorization: this.agensi_token,
  };
  return this.http.get(environment.basePublicUrl+"/jkas_resourses/public/images/" + this.aimg1, {headers,responseType: "blob"});
}

imageToShow1: any;

createImageFromBlob2(image: Blob) {
 let reader = new FileReader();
 reader.addEventListener("load", () => {
    this.imageToShow1 = reader.result;
    
    this.aimg =this.imageToShow1
    
 }, false);

 if (image) {
    reader.readAsDataURL(image);
 }
}

  getfunc() {

    if ("1" == "1") {
      this.var1 = true;
    }
    else {

    }
  }
  changeWebsite(e) {
    // console.log(e.target.value); 
    this.selected = e.target.value;
    //console.log(this.selected);
  }
  get f() {
    return this.registrationGroup.controls;
  }
  showreview() {
    this.reviewval = true;
  }

  getfeedback(e){
    this.feedback=e.target.value
     //console.log( this.feedback);

  }
  createfeedback() {
    this.submitted = true;
    if (this.registrationGroup.invalid) {
      return;
    }

    if(this.beforeimage==undefined){
      this.beforeimage=this.bimg1;
    }
    if(this.afterimage==undefined){
      this.afterimage=this.aimg1;
    }

   
    this.spinner.show();
    this.uploadSubmit();
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: this.agensi_token,
    };
    let body = {
      np_number: localStorage.getItem("npid"),
      organization: this.selected,
      merinyu_officer_name: this.nama_pegawai_merinyu,
      feedback: this.feedback,
      picture_before: this.beforeimage,
      picture_after: this.afterimage,
      notes:this.notes
    };

    //console.log(body);
    

    this.http
      .post(this.baseUrl + "/agensi/createFeedback", body, { headers: headers })
      .subscribe(
        (res) => {
          
          this.ResponseArray = res;
          //console.log(this.ResponseArray.message)
          this.Fid = this.ResponseArray.feedback_id;
          this.spinner.hide();
          this.openModal();
          if (this.ResponseArray.message == "feedback_added") {
            if (this.lang == "en") {
              this.msg = "Feedback added successfully!";
            }
            else {
              this.msg = "Maklum balas berjaya ditambahkan!";
            }
          }
        },
        (error) => {
          
          this.spinner.hide();
          this.openModal1();
          this.npErrorMessage = error["error"]["message"];
          if (this.npErrorMessage == "feedback_not_added") {
            if (this.lang == "en") {
              this.errormsg = "Feedback could not be added! Please refer console logs for further details.";
            }
            else {
              this.errormsg = "Maklum balas tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
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
      // console.log(fileItem.name);
      this.beforeimage = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => console.log(data.message));
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
      // console.log(fileItem.name);
      this.afterimage = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader1.clearQueue();
  }
  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.router.navigateByUrl("/agency/job-feedback");
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    this.router.navigateByUrl("/agency");
  }
  makeChange() {
    this.firstImage = false;
  }
  makeChange1() {
    this.secondImage = false;
  }
  reset() {
    this.spinner.show();
    this.http
      .get(environment.basePublicUrl + "/agensi/getOrganisationList")
      .subscribe((data) => {
        this.spinner.hide();
        //console.log(data);
        this.Organizations = data;
        this.bimghide = false;
        this.aimghide = false;
        this.clicked = false;
        this.selected = "abc";
        this.feedback = "";
        this.beforedt = "";
        this.afterdt = "";
        this.nama_pegawai_merinyu = "";
        this.katatan="";
      });

  }

  onselect() {
    this.bimghide = false;

  }
  onselect1() {
    this.aimghide = false;

  }
  logout() {
    localStorage.setItem("isAgency", "false");
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: this.agensi_token,
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
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
