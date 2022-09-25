import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { saveAs } from 'file-saver';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-complaintinvestigation",
  templateUrl: "./complaintinvestigation.component.html",
  styleUrls: ["./complaintinvestigation.component.css"],
})
export class ComplaintinvestigationComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  filename: string;
  imgBase64: string;
  date: string;
  id: string;
  parliamen: string;
  information_name: any;
  masa: string;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  tarikh_terima_aduan: any;
  pengadu_alamat: any;
  no_rujukan: any;
  emel: any;
  no_telefon: any;
  no_faksimili: any;
  sumber_aduan: any;
  tarikh_aduan: any;
  tarikh_terima: any;
  lokasi_aduan: any;
  keterangan_aduan: any;
  tarikh_siasatan: any;
  nama_pegawai: any;
  id_mtb: any;
  masa_siasatan: any;
  laporan_siasatan: any;
  susulan: any;
  ullasan_penyelia: any;
  tindakan: any;
  ullasan_ketua_seksyen: any;
  lokasi_siasatan: any;
  zon: any;
  lain_lain: any;
  ulasanKetua_unitf1: any;
  userrole: string;
  username: string;
  isAdminType: string;
  parlimenA: any;
  sebelum_siasatan: any;
  ullasan_ketua_unit: any;
  tarikh_siasatanA: any;
  report1A: any;
  tindakan1A: any;
  ullasan_penyelia1A: any;
  ullasan_ketua_seksyen1A: any;
  ulasanpenyelia: any;
  formGroup: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/complaintinvestigation");
    this.spinner.show();
    this.date = this.route.snapshot.queryParamMap.get("value3");
    this.id = this.route.snapshot.queryParamMap.get("value1");
    this.masa = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value5");
    // console.log(this.date + " " + this.id + " " + this.masa);

    this.formGroup = new FormGroup({
      formId: new FormControl(""),
      zon: new FormControl(""),
      tarikhSiasatan: new FormControl(""),
      namaPegawai: new FormControl(""),
      parlimen: new FormControl(""),
      laporanSiasatan: new FormControl(""),
      tindakan: new FormControl(""),
      ulasanPenyelia: new FormControl("", [Validators.required]),
      ulasanKetuaSeksyen: new FormControl(""),
      ulasanKetuaUnit: new FormControl(""),
    });

    let key = localStorage.getItem("AccessToken");
    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      id_mtb: this.id,
      masa_siasatan: this.masa,
      tarikh_siasatan: this.date,
    };
    // console.log(body);

    this.http
      .post(this.basePublicUrl + "/dbkl/getComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res : any) => {
           //console.log(res);
          this.spinner.hide();
          this.data = res;

          if (res.length == 0) {
            alert('No result found.');
            return;
          }

          let aduan = res[0];
          this.formGroup = new FormGroup({
            formId: new FormControl(aduan.form_id),
            zon: new FormControl(aduan.zon, [Validators.required]),
            tarikhSiasatan: new FormControl(aduan.tarikh_siasatan, [Validators.required]),
            namaPegawai: new FormControl(aduan.nama_pegawai, [Validators.required]),
            parlimen: new FormControl(aduan.parlimen, [Validators.required]),
            laporanSiasatan: new FormControl(aduan.laporan_siasatan, [Validators.required]),
            tindakan: new FormControl(aduan.tindakan, [Validators.required]),
            ulasanPenyelia: new FormControl(aduan.ullasan_penyelia, [Validators.required]),
            ulasanKetuaSeksyen: new FormControl(aduan.ullasan_ketua_seksyen),
            ulasanKetuaUnit: new FormControl(aduan.ullasan_ketua_unit),
          });
          console.log(this.formGroup);

          // this.nama_pegawai=this.data[0].nama_pegawai,
          // this.zon= this.data[0].zon,
          // this.parlimenA=this.data[0].parlimen,
          // this.tarikh_siasatanA= this.data[0].tarikh_siasatan,
          // this.lokasi_siasatan= this.data[0].loc,
          // this.report1A= this.data[0].laporan_siasatan,
          // this.tindakan1A= this.data[0].tindakan,
          // this.ullasan_penyelia1A= this.data[0].ullasan_penyelia,
          // this.ullasan_ketua_seksyen1A= this.data[0].ullasan_ketua_seksyen,
          // //console.log(this.ullasan_ketua_seksyen1A);
          
          // this.ulasanpenyelia=this.data[0].ullasan_ketua_unit,
         // console.log( this.ulasanpenyelia);
          
          this.sebelum_siasatan= this.basePublicUrl + "/jkas_resourses/public/images/" + aduan.sebelum_siasatan
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  backtotop() {
    window.scroll(0, 0);
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
          // console.log("error is", error["error"]);
        }
      );
  }
  getPdf(e){
    //console.log(e)
    this.downloadPdf(e)
    .then(blob => {
      //console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
     // console.log(fileURL);
      
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
  cancel () {
    window.history.back();// <-- go back to previous location on cancel
  }

  displayModal: string = "none";
  modalMessage: string = "";
  closeModal = () => this.displayModal = "none";
  onSubmit() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = this.formGroup.value;
    this.http
      .put(this.basePublicUrl + '/dbkl/updateComplaintComments', body, {
        headers,
      })
      .subscribe((res) => {
        this.displayModal = "block";
        this.modalMessage = "Successfully update complaint.";
        this.spinner.hide();
      }, (error) => {
        this.displayModal = "block";
        this.modalMessage = "Failed to update complaint";
        this.spinner.hide();
      });
  }
}
