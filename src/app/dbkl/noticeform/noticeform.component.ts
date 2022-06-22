import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-noticeform",
  templateUrl: "./noticeform.component.html",
  styleUrls: ["./noticeform.component.css"],
})
export class NoticeformComponent implements OnInit {
  id_mtb: any;
  nama_pegawai_merinyu: any;
  status_tindakan: any;
  gambar_lokasi_kerja_photo3: any;
  gambar_lokasi_kerja_photo1: any;
  gambar_lokasi_kerja_photo2: any;
  lokasi_merinyu: any;
  kontraktor_emel: any;
  imageGroup: FormGroup;
  image1: string;
  image3: string;
  image2: string;
  basePublicUrl = environment.basePublicUrl;
  url:any= environment.basePublicUrl;
  SERVER_URL: any = this.url+"/public/uploadFile";
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
  submitted: boolean;
  emailGroup: any;
  display: string;
  submitted2: boolean;
  ck: boolean;
  loginError: boolean;
  errorMsg: any;
  display1: string;
  errordisplay: string;
  errmsg: string;
  lang: string;
  meetingupdate: string;
  detailedmeeting: any;
  username: string;
  userrole: string;
  data: any;
  dataShow: any=[];

  constructor(private http: HttpClient,private spinner: NgxSpinnerService, private router: Router) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    this.userrole = localStorage.getItem("roleforuser");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/noticeform");
    this.imageGroup = new FormGroup({
      id_mtb: new FormControl("", [Validators.required]),
      nama_pegawai_merinyu: new FormControl("", [Validators.required]),
      lokasi_merinyu: new FormControl("", [Validators.required]),
      gambar_lokasi_kerja_photo1: new FormControl("", [Validators.required]),
      gambar_lokasi_kerja_photo2: new FormControl("", [Validators.required]),
      gambar_lokasi_kerja_photo3: new FormControl("", [Validators.required]),
      status_tindakan: new FormControl("", [Validators.required]),
    });
    this.emailGroup = new FormGroup({
      email: new FormControl("", [Validators.required,Validators.pattern(
        "^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"
      ),]),
    });
    let key = localStorage.getItem("AccessToken");

    localStorage.setItem("path", "/dbkl/inspectingofficers");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getMTBOfficersList", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          for(let key of this.data){
            this.dataShow.push(key);
          }
          
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  get c() {
    return this.emailGroup.controls;
  }
  submit() {
    this.submitted2 = true;
    if (this.emailGroup.invalid) {
      return;
    }

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
      // console.log(fileItem.name);
      this.image1 = fileItem.name;
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
      this.image2 = fileItem.name;
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
      // console.log(fileItem.name);
      this.image3 = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader2.clearQueue();

    let body = {
      id_mtb: this.id_mtb,
      nama_pegawai_merinyu: this.nama_pegawai_merinyu,
      lokasi_merinyu: this.lokasi_merinyu,
      gambar_lokasi_kerja_photo1: this.image1,
      gambar_lokasi_kerja_photo2: this.image2,
      gambar_lokasi_kerja_photo3: this.image3,
      status_tindakan: this.status_tindakan,
      kontraktor_emel: this.kontraktor_emel,
    };

    //console.log(body);
    
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    //console.log(headers);
    
    this.http
    .post(this.basePublicUrl+"/dbkl/sendNotice", body,{ headers: headers })
    .subscribe(
      (res) => {
       // console.log(res);
        this. openModal();
        this.spinner.hide();
        this.detailedmeeting=res["message"] ;
        if(this.meetingupdate=="notice_sent"){
          if (this.lang == "en") {
            this.meetingupdate = "Notice sent successfully!";
          }
        }
        else {
          this.meetingupdate= "Notis Pemberitahuan berjaya dihantar";
        }
      
        
      },
      (error) => {
        this.loginError = true;
        this.spinner.hide();
        this.errorMsg = error["error"]["message"];
        this.errorModal();
            
        if(this.errorMsg=="notice_not_sent"){
          if (this.lang == "en") {
            this.errmsg = "Notice could not be sent! Please refer console logs for further details.";
          }
          else {
            this.errmsg = "Notis tidak dapat dihantar! Sila rujuk log konsol untuk keterangan lebih lanjut.";
         } } }
    
    );
  }

  get f() {
    return this.imageGroup.controls;
  }
  uploadSubmit() {
    this.submitted = true;
    if (this.imageGroup.invalid) {
      return;
    }
    this.succesModel();
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }

  backtotop() {
    window.scroll(0, 0);
  }
  succesModel() {
    this.display = "block";
  }
  back() {
    this.display = "none";
  }
  closeModal() {
    this.ck = false;
    this.display = "none";
  }
  
  openModal() {
    this.display1 = "block";
  }
  onCloseHandled() {
    this.router.navigateByUrl("/dbkl/mtbwork-form");
  }
  errorModal() {
    this.errordisplay = "block";
  }
  erroronCloseHandled() {
    this.errordisplay = "none";
  
  }
  logout() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let header = {
      accept: "application/json",
      Authorization: key,
    };

    let body = {};
    this.http
      .post(this.basePublicUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("user_type");
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          // this.openErrorModal();
        }
      );
  }
}

