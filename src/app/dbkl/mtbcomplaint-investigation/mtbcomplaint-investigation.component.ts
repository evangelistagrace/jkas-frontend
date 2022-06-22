import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-mtbcomplaint-investigation",
  templateUrl: "./mtbcomplaint-investigation.component.html",
  styleUrls: ["./mtbcomplaint-investigation.component.css"],
})
export class MtbcomplaintInvestigationComponent implements OnInit {
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
  ulasanKetua_unitf1:any;
  nama_pegawai: any;
  id_mtb: any;
  masa_siasatan: any;
  laporan_siasatan: any;
  susulan: any;
  ullasan_penyelia: any;
  tindakan: any;
  lain_lain: any;
  zon: any;
  lokasi_siasatan: any;
  ullasan_ketua_seksyen: any;
  isAdminType: string;
  username: string;
  userrole: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {

    this.date = this.route.snapshot.queryParamMap.get("value3");
    this.id = this.route.snapshot.queryParamMap.get("value1");
    this.masa = this.route.snapshot.queryParamMap.get("value2");
    // console.log(this.date + " " + this.id + " " + this.masa);
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      id_mtb: this.id,
      masa_siasatan: this.masa,
      tarikh_siasatan: this.date,
    };

    // console.log("BYGJ",body);

    this.http
      .post(this.basePublicUrl + "/dbkl/getComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          //console.log(res);
          this.data = res;
          this.information_name = this.data[0].pengadu_nama;
          this.tarikh_terima_aduan = this.data[0].tarikh_terima_aduan;
          this.pengadu_alamat = this.data[0].pengadu_alamat;
          this.no_rujukan = this.data[0].no_rujukan;
          this.emel = this.data[0].emel;
          this.no_telefon = this.data[0].no_telefon;
          this.no_faksimili = this.data[0].no_faksimili;

          this.sumber_aduan = this.data[0].sumber_aduan;
          this.lain_lain = this.data[0].lain_lain;
          this.tarikh_aduan = this.data[0].tarikh_aduan;
          this.tarikh_terima = this.data[0].tarikh_terima;
          this.lokasi_aduan = this.data[0].lokasi_aduan;
          this.keterangan_aduan = this.data[0].keterangan_aduan;

          (this.zon = this.data[0].zon),
            (this.tarikh_siasatan = this.data[0].tarikh_siasatan);
          this.nama_pegawai = this.data[0].nama_pegawai;
          this.lokasi_siasatan = this.data[0].lokasi_siasatan;

          this.laporan_siasatan = this.data[0].laporan_siasatan;
          this.tindakan = this.data[0].tindakan;
          this.susulan = this.data[0].susulan;
          this.ullasan_penyelia = this.data[0].ullasan_penyelia;
          this.ullasan_ketua_seksyen = this.data[0].ullasan_ketua_seksyen;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    this.spinner.hide();
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    this.date = this.route.snapshot.queryParamMap.get("value3");
    this.id = this.route.snapshot.queryParamMap.get("value1");
    this.masa = this.route.snapshot.queryParamMap.get("value2");
    localStorage.setItem(
      "path",
      "/dbkl/mtbcomplaints?value1=" +
        this.id +
        "&value2=" +
        this.masa +
        "&value3=" +
        this.date
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

          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

}
