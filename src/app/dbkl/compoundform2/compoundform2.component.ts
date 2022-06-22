import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-compoundform2",
  templateUrl: "./compoundform2.component.html",
  styleUrls: ["./compoundform2.component.css"],
})
export class Compoundform2Component implements OnInit {
  no_notis_bas: any;
  date: any;
  id_mtb1: any;
  parlimen1: any;
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  compounddata: Object;
  kepada: any;
  company_no: any;
  alamat: any;
  parlimen: any;
  id_mtb: any;
  lokasi_kompaun: any;
  akta_jalan: boolean;
  butir_butir_kesalahan: any;
  tarikh: any;
  waktu: any;
  tempat: any;
  undang_kecil_pelesenan: boolean;
  undang_kecil_permungutan: boolean;
  undang_pelesenan_penjaja: boolean;
  undang_kecil_larangan_meludah: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.spinner.show();
    this.no_notis_bas = this.route.snapshot.queryParamMap.get("value4");
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id_mtb1 = this.route.snapshot.queryParamMap.get("value2");
    this.parlimen1 = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/compoundform?value=" +
        this.date +
        "&value2=" +
        this.id_mtb1 +
        "&value3=" +
        this.parlimen1 +
        "&value4=" +
        this.no_notis_bas
    );
    // console.log(this.no_notis_bas);
    let key = localStorage.getItem("AccessToken");
    let header = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {};
    // console.log(header);
    this.http
      .post(
        this.basePublicUrl + "/dbkl/getCompoundForm/" + this.no_notis_bas,
        body,
        { headers: header }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res[0];
          this.compounddata = res;
          // console.log(this.compounddata);

          this.akta_jalan = true;
          this.alamat = this.data.alamat;
          // console.log(this.alamat)
          this.butir_butir_kesalahan = this.data.butir_butir_kesalahan;
          this.company_no = this.data.company_no;
          this.id_mtb = this.data.id_mtb;
          this.kepada = this.data.kepada;
          this.lokasi_kompaun = this.data.lokasi_kompaun;
          // this.no_notis_bas=this.data.no_notis_bas ;
          this.parlimen = this.data.parlimen;
          this.tarikh = this.data.tarikh;
          this.tempat = this.data.tempat;
          this.undang_kecil_larangan_meludah =
            this.data.undang_kecil_larangan_meludah;
          this.undang_kecil_pelesenan = this.data.undang_kecil_pelesenan;
          this.undang_kecil_permungutan = this.data.undang_kecil_permungutan;
          this.undang_pelesenan_penjaja = this.data.undang_pelesenan_penjaja;
          this.waktu = this.data.waktu;
        },
        (error) => {
          this.loginError = true;
          // console.log(error);
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
 this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }
}
