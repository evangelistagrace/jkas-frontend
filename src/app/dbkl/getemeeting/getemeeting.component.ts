import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { user } from "src/app/table/usermanage";
import { usermanagement } from "src/app/table/usermanagment";
import { environment } from "src/environments/environment";
import { FileUploader } from "ng2-file-upload";
import { saveAs } from 'file-saver';

@Component({
  selector: "app-getemeeting",
  templateUrl: "./getemeeting.component.html",
  styleUrls: ["./getemeeting.component.css"],
})

export class GetemeetingComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  UploaderData1: any = [];
  detailed_meeting_id: any;
  errorMsg: any;
  loginError: boolean;
  data: any;
  basePublicUrl = environment.basePublicUrl;
  agenda_dan_minit: any;
  bill_mesyuarat: any;
  hingga: any;
  tempat_mesyuarat: any;
  tarikh_mesyuarat: any;
  tajuk_mesyuarat: any;
  setiausaha: any;
  pengerusi: any;
  model:any;
  meeting_dokumen: any;
  masa_mesyuarat: any;
  jenis_mesyuarat: any;
  jawatankuasa_mesurat: any;
  jabatan_terlibat: any;
  jenis_jawatankuasa: any;
  detailedmeeting: any;
  updatemeeting: string;
  lang: string;
  meetingupdate: string;
  errmsg: string;
  display: string;
  display1: string;
  filename: string;
  firstFile: any;
  myfiles: string;
  pd1: any;
  pdf1: any;
  uploader1: any;
  uploader2: any;
  uploader3: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);
    this.spinner.show();
    this.detailed_meeting_id = this.route.snapshot.queryParamMap.get("id");
    // console.log(this.detailed_meeting_id);
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
    }
    localStorage.setItem(
      "path",
      "/dbkl/getemeeting?id=" + this.detailed_meeting_id
    );
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(
        this.basePublicUrl +
          "/dbkl/getDetailedMeeting/" +
          this.detailed_meeting_id,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res[0];
//console.log(res);

          (this.agenda_dan_minit = this.data.agenda_dan_minit),
            (this.bill_mesyuarat = this.data.bill_mesyuarat),
            (this.hingga = this.data.hingga),
            (this.jabatan_terlibat = this.data.jabatan_terlibat),
            (this.jawatankuasa_mesurat = this.data.jawatankuasa_mesurat),
            (this.jenis_mesyuarat = this.data.jenis_mesyuarat),
            (this.masa_mesyuarat = this.data.masa_mesyuarat),
            (this.meeting_dokumen = this.data.meeting_dokumen),
            (this.pengerusi = this.data.pengerusi),
            (this.setiausaha = this.data.setiausaha),
            (this.tajuk_mesyuarat = this.data.tajuk_mesyuarat),
            (this.tarikh_mesyuarat = this.data.tarikh_mesyuarat),
            (this.tempat_mesyuarat = this.data.tempat_mesyuarat),
            (this.meeting_dokumen=this.data.meeting_dokumen);
           // console.log(this.meeting_dokumen);
            
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  updateSubmit() {
    this.uploadSubmit();
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let body = {
      jenis_jawatankuasa: this.jawatankuasa_mesurat,
      jenis_mesyuarat: this.jenis_mesyuarat,
      jabatan_terlibat: this.jabatan_terlibat,
      tarikh_mesyuarat: this.tarikh_mesyuarat,
      masa_mesyuarat: this.masa_mesyuarat,
      hingga: this.hingga,
      pengerusi: this.pengerusi,
      bill_mesyuarat: this.bill_mesyuarat,
      tajuk_mesyuarat: this.tajuk_mesyuarat,
      setiausaha: this.setiausaha,
      tempat_mesyuarat: this.tempat_mesyuarat,
      agenda_dan_minit: this.agenda_dan_minit,
      meeting_dokumen: this.firstFile,
    };

    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };

    // console.log("this is my body" + body)

    this.http
      .put(
        this.basePublicUrl +
          "/dbkl/updateEMeeting/" +
          this.detailed_meeting_id,
        body,
        { headers: headers }
      )      .subscribe(
        (res) => {
          this.data = res;
          // console.log(res);
          this.spinner.hide();
          this.detailedmeeting=res["message"] ;
          this.openModal();
          if(this.meetingupdate=="detailed_meeting_updated"){
            if (this.lang == "en") {
              this.updatemeeting = "Detailed Meeting Form updated Successfully!";
            }
          }
          else {
            this.updatemeeting= "Borang Mesyuarat berjaya dikemaskini!";
          }
        
          },
          (error) => {
            this.loginError = true;
            this.spinner.hide();

            this.errorMsg = error["error"]["message"];
           this.openModal1();
             
            if(this.errorMsg=="detailed_meeting_not_updated"){
              if (this.lang == "en") {
                this.errmsg = "Detailed Meeting could not be updated! Please refer console logs for further details.";
              }
              else {
                this.errmsg = "Mesyuarat terperinci tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
              }
          }});
  }

  search() {
    this.router.navigate(["/dbkl/listemeeting"], {
      queryParams: {
        value: this.jenis_mesyuarat,
        value1: this.jawatankuasa_mesurat,
      },
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
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.search();
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
  }
  getPdf(e){
    //console.log(e)
    this.downloadPdf(e)
    .then(blob => {
     // console.log(blob)
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
      .get("{{SERVER_URL}}/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
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
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
 this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }
}
