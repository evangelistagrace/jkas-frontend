import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/services/meeting.service';
import { saveAs } from 'file-saver';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dbklppsppa',
  templateUrl: './dbklppsppa.component.html',
  styleUrls: ['./dbklppsppa.component.css']
})
export class DbklppsppaComponent implements OnInit {
  value: any;
  data: any;
  basePublicUrl = environment.basePublicUrl;
  baseUrl: string;
  constructor(private met: MeetingService,private http: HttpClient) { }

  ngOnInit() {
    this.value=this.met.value
  //  console.log(this.value);
    
    this.data=this.met.getData;
   // console.log(this.data);
    
  }
  getPdf(e){
    this.downloadPdf(e)
    .then(blob => {
  //    console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
    //  console.log(fileURL);
      
      let tab = window.open();
      tab.location.href = fileURL
    });
  }
  
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/public/uploadFile", data);
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
}
