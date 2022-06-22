import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { identity, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Maklumat } from "../table/maklumat";
import { Subject } from "rxjs";
import { UploadService } from "../services/upload.service";
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-uploadbutton',
  templateUrl: './uploadbutton.component.html',
  styleUrls: ['./uploadbutton.component.css']
})
export class UploadbuttonComponent implements OnInit {

  url: any = environment.basePublicUrl;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
  SERVER_URL: any = environment.basePublicUrl + "/public/uploadFile";
  token: string;
  applicationSerialNo: any;
  basePublicUrl = environment.basePublicUrl;
  file: any;
  maklumat1: any;
  maklumat2: any;
  data: any;
  loginError: boolean;
  errorMsg: any;
  dataArray: any = [];
  v: any;
  count: number = 0;
  fileName: string;
  restData: any;

  // beforeimage: string;

  constructor(
    private http: HttpClient,
    private s: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log(this.s.value);
    this.v = this.s.value;
    this.data = this.s.getMakumatData;

    for (let i = 0; i < this.data.length; i++) {
      this.dataArray.push(this.data[i].makalumat_ketidakpatuhan);
    }

    // this.getMaklumatDetails();

    // this.applicationSerialNo = this.route.snapshot.paramMap.get("id");
    // this.token = localStorage.getItem("AccessToken");
    // let headers = {
    //   "Content-Type": "application/json",
    //   Authorization: this.token,
    // };

    // this.http.get(this.basePublicUrl+'/public/siteVisitInformation/'+this.applicationSerialNo, { headers: headers }).subscribe((res) => {
    //   this.data = res;
    //   console.log(this.data);

    //   this.spinner.hide();
    // for(let i=0;i<this.data.length;i++){
    //   this.dataArray.push(this.data[i].maklum_balas_ketidakpatuhan)
    // }
    // console.log(this.dataArray);

    // },
    //   (error) => {
    //     this.spinner.hide();
    //     this.loginError = true;
    //     this.errorMsg = error['error']['message'];
    //     this.router.navigateByUrl('/publicLogin');
    //   });
  }
  uploadSubmit(event) {
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
     // console.log(this.fileName);
      
     // console.log("filenan",this.fileName);
      
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

       this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader.clearQueue();
    // console.log("hii"+this.fileName+"hello");
    // console.log(event);

    let ev = event;
    for (let index of this.data) {
      if (index.site_id == ev) {
        this.restData = index;
      }
    }

 //    console.log(this.restData);
    // if (this.restData.keputusan_lawatan_tapak == null) {
    //   this.restData.keputusan_lawatan_tapak = "";
    // }

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
      makalumat_ketidakpatuhan:this.fileName,
      maklum_balas_ketidakpatuhan: this.restData.maklum_balas_ketidakpatuhan,
    };

    this.http
      .put(
        this.basePublicUrl + "/public/updateSiteVisitInformation/" + ev,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
       //    console.log(res);
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
  getMaklumatDetails() { }

  bind(e) {
    // console.log(e);
  }
  getPdf(e){
    this.downloadPdf(e)
    .then(blob => {
     // console.log(blob)
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

  // deleteData(e){
  //   console.log(e);
    
  //   let key=localStorage.getItem("AccessToken");
  //   const options = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       accept: "application/json",
  //       Authorization: key,
  //     }),
  //     body: {
  //       "site_id": e
  //     },
  //   };
  //   this.http
  //     .delete(
  //       this.basePublicUrl + "/dbkl/deleteSitevisitPDF",
  //       options
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.spinner.hide();
  //         window.location.reload();
          
  //       },
  //       (error) => {
  //         this.spinner.hide();
  //         this.loginError = true;
  //         this.errorMsg = error["error"]["message"];
  //       }
  //     );
  // }
  
}
