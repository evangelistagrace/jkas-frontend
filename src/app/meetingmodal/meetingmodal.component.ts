import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { MeetingService } from '../services/meeting.service';
import * as $ from "jquery";
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-meetingmodal',
  templateUrl: './meetingmodal.component.html',
  styleUrls: ['./meetingmodal.component.css']
})
export class MeetingmodalComponent implements OnInit {
  loginError: boolean;
  errorMsg: any;
  data: any;
  basePublicUrl = environment.basePublicUrl;
  display: string;
  display1: string;
  keyValue: any;
  meetingValue: any;
  detailed_meeting_id: any;
  no_siri_permohonan: any;
  jawatankuasa_mesurat: any;
  jenis_mesyuarat: any;
  jabatan_terlibat: any;
  tarikh_mesyuarat: any;
  masa_mesyuarat: any;
  hingga: any;
  pengerusi: any;
  bill_mesyuarat: any;
  tajuk_mesyuarat: any;
  setiausaha: any;
  tempat_mesyuarat: any;
  agenda_dan_minit: any;
  meeting_dokumen: any;
  ck: boolean = false;
  today: Date;
  minDate: Date;
  maxDate: Date;
  meetingDate: Date;

  datePickerValue: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  monthValue: any;
  dateValue: any;
  check: boolean;
  errorDisplay: string;
  manualupdate: string;
  lang: string;
  errorMessage: string;
  errmsg: string;
  meetingupdate: string;
  masa: any = [];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private met: MeetingService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    this.data = this.met.getMeetingData;
    this.meetingValue = this.met.getMeetingData;
    this.keyValue = this.met.value;
    $(document).ready(function () {
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if (month < 10) {
        month = parseInt('0' + month.toString());
      }
      if (day < 10) {
        day = parseInt('0' + day.toString());
      }

      var maxDate = year + '-' + month + '-' + day;
      $('#date').attr('min', maxDate)
    })

  }
  openModal() {
    this.display = "block";
  }
  openModal1() {
    this.display1 = "block";
  }
  showValue(e) {
    this.ck = true;
    // this.no_siri_permohonan=e;
    for (let i = 0; i < this.meetingValue.length; i++) {
      if (this.meetingValue[i].no_siri_permohonan == e) {
        if (this.meetingValue[i].tarikh_mesyuarat == null) {
          this.meetingValue[i].tarikh_mesyuarat = "";
        }
        this.datePickerValue = new Date(this.meetingValue[i].tarikh_mesyuarat);
        this.detailed_meeting_id = this.meetingValue[i].detailed_meeting_id;
        this.no_siri_permohonan = this.meetingValue[i].no_siri_permohonan;
        this.jawatankuasa_mesurat = this.meetingValue[i].jawatankuasa_mesurat;
        this.jenis_mesyuarat = this.meetingValue[i].jenis_mesyuarat;
        this.jabatan_terlibat = this.meetingValue[i].jabatan_terlibat;
        this.masa_mesyuarat = this.meetingValue[i].masa_mesyuarat;
        this.hingga = this.meetingValue[i].hingga;
        this.pengerusi = this.meetingValue[i].pengerusi;
        this.bill_mesyuarat = this.meetingValue[i].bill_mesyuarat;
        this.tajuk_mesyuarat = this.meetingValue[i].tajuk_mesyuarat;
        this.setiausaha = this.meetingValue[i].setiausaha;
        this.tempat_mesyuarat = this.meetingValue[i].tempat_mesyuarat;
        this.agenda_dan_minit = this.meetingValue[i].agenda_dan_minit;
        this.meeting_dokumen = this.meetingValue[i].meeting_dokumen;
      }
    }
  }
  closeModal() {
    this.ck = false;
    this.display = "none";
  }
  update(id) {
    let dat = "" + this.datePickerValue;
    if (dat == 'null') {
      this.check = true;
      return;
    }
    if (dat == 'Invalid Date') {
      this.check = true;
      return;
    }
    this.meetingDate = new Date(dat);
    let date = this.meetingDate.getDate();
    let month = this.meetingDate.getMonth() + 1;

    if (date < 10) {
      this.dateValue = '0' + date;
    } else {
      this.dateValue = date;
    }

    if (month < 10) {
      this.monthValue = '0' + month;
    } else {
      this.monthValue = month;
    }

    let meet = this.meetingDate.getFullYear() + "-" + this.monthValue + "-" + this.dateValue;
    this.spinner.show();
    let key = localStorage.getItem("dbkl_access_token");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      "jenis_jawatankuasa": this.jawatankuasa_mesurat,
      "jenis_mesyuarat": this.jenis_mesyuarat,
      "jabatan_terlibat": this.jabatan_terlibat,
      "tarikh_mesyuarat": meet,
      "masa_mesyuarat": this.masa_mesyuarat,
      "hingga": this.hingga,
      "pengerusi": this.pengerusi,
      "bill_mesyuarat": this.bill_mesyuarat,
      "tajuk_mesyuarat": this.tajuk_mesyuarat,
      "setiausaha": this.setiausaha,
      "tempat_mesyuarat": this.tempat_mesyuarat,
      "agenda_dan_minit": this.agenda_dan_minit,
      "meeting_dokumen": this.meeting_dokumen
    }
    this.http
      .put(environment.basePublicUrl + "/dbkl/updateDetailedMeeting/" + id, body, {
        headers: headers,
      })
      .subscribe(
        (res) => {

          this.spinner.hide();

          this.meetingupdate = res["message"];
          if (this.meetingupdate == "meeting_updated") {
            if (this.lang == "en") {
              this.manualupdate = "Meeting updated successfully!";
            }
          }
          else {
            this.manualupdate = "Mesyuarat berjaya dikemas kini!";
          }
          window.location.reload();
          // this.openSuccessModal();
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "meeting_not_updated") {
            if (this.lang == "en") {
              this.errmsg = "Meeting could not be added! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "Mesyuarat tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        });
  }

  reset(id) {
    this.datePickerValue = new Date("");
    this.masa_mesyuarat = null;
    this.tempat_mesyuarat = null;

    this.spinner.show();
    let key = localStorage.getItem("dbkl_access_token");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      "jenis_jawatankuasa": this.jawatankuasa_mesurat,
      "jenis_mesyuarat": this.jenis_mesyuarat,
      "jabatan_terlibat": this.jabatan_terlibat,
      "tarikh_mesyuarat": "",
      "masa_mesyuarat": null,
      "hingga": this.hingga,
      "pengerusi": this.pengerusi,
      "bill_mesyuarat": this.bill_mesyuarat,
      "tajuk_mesyuarat": this.tajuk_mesyuarat,
      "setiausaha": this.setiausaha,
      "tempat_mesyuarat": null,
      "agenda_dan_minit": this.agenda_dan_minit,
      "meeting_dokumen": this.meeting_dokumen
    }



    this.http
      .put(environment.basePublicUrl + "/dbkl/updateDetailedMeeting/" + id, body, {
        headers: headers,
      })
      .subscribe(
        (res) => {


          //  window.location.reload();
          this.router.navigateByUrl("/dbkl/applicationprocess");
          this.spinner.hide();
          this.meetingupdate = res["message"];
          if (this.meetingupdate == "meeting_updated") {
            if (this.lang == "en") {
              this.manualupdate = "Meeting updated successfully!";
            }
          }
          else {
            this.manualupdate = "Mesyuarat berjaya dikemas kini!";
          }
          //this.openSuccessModal();
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];


          if (this.errorMsg == "meeting_not_updated") {
            if (this.lang == "en") {
              this.errmsg = "Meeting could not be added! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "Mesyuarat tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }

          }
          //  this.openErrorModal();
        });

  }

  getValue(e) {


  }
  onCloseSuccessModal() {
    this.display = "none";
    window.location.reload();
  }
  openSuccessModal() {
    this.display = "block";
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    window.location.reload();

  }
}
