import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MeetingService } from '../services/meeting.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-dbklppsppacatatan',
  templateUrl: './dbklppsppacatatan.component.html',
  styleUrls: ['./dbklppsppacatatan.component.css']
})
export class DbklppsppacatatanComponent implements OnInit {
  catatan: string;
  id: string;
  value: string;
  basePublicUrl = environment.basePublicUrl;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private met: MeetingService,
  ) { }

  ngOnInit(): void {
    this.catatan = this.met.getData;
    this.id = this.met.value;
  }

  add() {
    this.spinner.show();
    try {
      let token = localStorage.getItem("AccessToken");
      let headers = {
        "Content-Type": "application/json",
        Authorization: token,
      };
      let body = {
        catatan: this.value
      };
      this.http
      .put(
        this.basePublicUrl + "/dbkl/updateApplicationList/" + this.id,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
         window.location.reload();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
        }
      );
    } catch(error) {

    }
    console.log('Updating ref ' + this.id + ' with catatan ' + this.value);
    this.spinner.hide();
  }
}
