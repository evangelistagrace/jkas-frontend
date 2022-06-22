import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeetingService } from '../services/meeting.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-uploaddocument',
  templateUrl: './uploaddocument.component.html',
  styleUrls: ['./uploaddocument.component.css']
})
export class UploaddocumentComponent implements OnInit {

  url: any = environment.basePublicUrl;
  public uploader: FileUploader  = new FileUploader({
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

  constructor(
    private http: HttpClient,
    private met: MeetingService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.v = this.met.value;
    this.data = this.met.getData;

    for (let i = 0; i < this.data.length; i++) {
      this.dataArray.push(this.data[i].surat_penyerahan_kawasan);
    }
  //console.log(this.dataArray);


    
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
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      
    }
    this.uploader.clearQueue();
   
    let ev = event;
    for (let index of this.data) {
      if (index.site_id == ev) {
        this.restData = index;
      }
    }

    this.token = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.token,
    };
    let body = {
      surat_penyerahan_kawasan:this.fileName
    };

    this.http
      .put(
        this.basePublicUrl+"/public/updateApplicationList/"+ev,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          window.location.reload();
          
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }
 
}
