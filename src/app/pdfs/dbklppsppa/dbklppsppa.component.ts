import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MeetingService } from "src/app/services/meeting.service";
import { saveAs } from "file-saver";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";

@Component({
  selector: "app-dbklppsppa",
  templateUrl: "./dbklppsppa.component.html",
  styleUrls: ["./dbklppsppa.component.css"],
})
export class DbklppsppaComponent implements OnInit {
  value: any;
  data: any;
  basePublicUrl = environment.basePublicUrl;
  baseUrl: string;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
  SERVER_URL: any = environment.basePublicUrl + "/public/uploadFile";
  fileName: string;
  restData: any;
  constructor(
    private met: MeetingService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.value = this.met.value;
    //  console.log(this.value);

    this.data = this.met.getData;
    // console.log(this.data);
  }
  // getPdf(e) {
  //   this.downloadPdf(e).then((blob) => {
  //     //    console.log(blob)
  //     saveAs(blob, e);
  //     var fileURL = window.URL.createObjectURL(blob);
  //     //  console.log(fileURL);

  //     let tab = window.open();
  //     tab.location.href = fileURL;
  //   });
  // },

  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }
  getMaklumatDetails() {}

  bind(e) {
    // console.log(e);
  }
  getPdf(e) {
    this.downloadPdf(e).then((blob) => {
      // console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
      // console.log(fileURL);

      let tab = window.open();
      tab.location.href = fileURL;
    });
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
  }
}
