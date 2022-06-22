import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../services/meeting.service';
import { saveAs } from 'file-saver';
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-showpdf',
  templateUrl: './showpdf.component.html',
  styleUrls: ['./showpdf.component.css']
})
export class ShowpdfComponent implements OnInit {
  value: any;
  data: any;
  baseUrl = environment.basePublicUrl;

  constructor(private met: MeetingService,private http: HttpClient) { }

  ngOnInit() {
    this.value=this.met.value
    this.data=this.met.getData;
  }
  getPdf(e){
    this.downloadPdf(e)
    .then(blob => {
   //   console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
  //    console.log(fileURL);
      
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
      .get("{{baseUrl}}/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
      .toPromise();
  }
}

