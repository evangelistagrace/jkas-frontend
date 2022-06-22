import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
@Component({
  selector: "app-noncompliance",
  templateUrl: "./noncompliance.component.html",
  styleUrls: ["./noncompliance.component.css"],
})
export class NoncomplianceComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  userType: string;
  data: any;
  loginError: boolean;
  errorMsg: any;
  display: string;
  errorDisplay: string;
  errorMessage: any;
  pengesahan_peneriman: any;
  nama: any;
  alamat: any;
  tarikh: any;
  lawatan_tapak_tarikh: any;
  bertempat_di: any;
  wakil: any;
  kad_pengenalan: any;
  peratusan_permis_adalah_kurang_daripada_50: any;
  kawasan_itu_kotor_dan_perlu_dibersihkan: any;
  tiada_kemudahan_stopper_untuk_tayar_trak: any;
  tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah: any;
  tiada_garisan_kuning_di_hadapan_rumah_sampah: any;
  tong_sampah_tidak_mencukupi_mengikut_spesifikasi: any;
  turning_point_tidak_mengikut_spesifikasi: any;
  mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai: any;
  w1: any;
  w2: any;
  w3: any;
  w4: any;
  non_compliance_id: any = "";
  accessToken: string;
  username: string;
  url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    // console.log(key);
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.userType = this.route.snapshot.paramMap.get("id");
    // console.log(this.userType);
    this.url = "/public/maklumat/" + this.userType;
    this.http
      .get(
        this.basePublicUrl + "/public/getNonComplianceForm/" + this.userType,
        { headers: headers }
      )
      .subscribe(
        (res) => {
       //   console.log(res);
          this.spinner.hide();
          // this.openSuccessModal();
          this.data = res;
          this.pengesahan_peneriman = this.data[0].pengesahan_peneriman;
          this.nama = this.data[0].nama;
          this.alamat = this.data[0].alamat;
          this.tarikh = this.data[0].tarikh;
          this.lawatan_tapak_tarikh = this.data[0].lawatan_tapak_tarikh;
          this.bertempat_di = this.data[0].bertempat_di;
          this.wakil = this.data[0].wakil;
          this.kad_pengenalan = this.data[0].kad_pengenalan;
          this.peratusan_permis_adalah_kurang_daripada_50 =
            this.data[0].peratusan_permis_adalah_kurang_daripada_50;
          this.kawasan_itu_kotor_dan_perlu_dibersihkan =
            this.data[0].kawasan_itu_kotor_dan_perlu_dibersihkan;
          this.tiada_kemudahan_stopper_untuk_tayar_trak =
            this.data[0].tiada_kemudahan_stopper_untuk_tayar_trak;
          this.tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah =
            this.data[0].tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah;
          this.tiada_garisan_kuning_di_hadapan_rumah_sampah =
            this.data[0].tiada_garisan_kuning_di_hadapan_rumah_sampah;
          this.tong_sampah_tidak_mencukupi_mengikut_spesifikasi =
            this.data[0].tong_sampah_tidak_mencukupi_mengikut_spesifikasi;
          this.turning_point_tidak_mengikut_spesifikasi =
            this.data[0].turning_point_tidak_mengikut_spesifikasi;
          this.mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai =
            this.data[0].mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai;
          this.non_compliance_id = this.data[0].non_compliance_id;
          let b = this.data[0].alamat.split(",");

          for (let i = 0; i < b.length; i++) {
            if (i == 0) {
              this.w1 = b[i];
            } else if (i == 1) {
              this.w2 = b[i];
            } else if (i == 2) {
              this.w3 = b[i];
            } else if (i == 3) {
              this.w4 = b[i];
            }
          }

          // console.log(this.non_compliance_id);
        },
        (error) => {
          // console.log(JSON.stringify(error));
          this.errorMessage = error.message;
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
          // this.openErrorModal();
          this.spinner.hide();
        }
      );
  }

  ngOnInit() {
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

    window.scroll(0, 0);

    localStorage.setItem("path", "public/noncompliance/"+this.userType);
    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
  }

  backtotop() {
    window.scroll(0, 0);
  }

  openSuccessModal() {
    this.display = "block";
  }

  openErrorModal() {
    this.errorDisplay = "block";
  }

  closeSuccessModal() {
    this.display = "none";
    // window.location.reload();
    // this.router.navigateByUrl('/public/maklumat?value=' + this.userType);
  }

  closeErrorModal() {
    this.errorDisplay = "none";
    // window.location.reload();
    // this.router.navigateByUrl('/public/maklumat?value=' + this.userType);
  }
  goProducts() {
    // this.router.navigate(['/public/maklumat'], { queryParams: { order: 'popular' } });
    this.router.navigateByUrl("/public/maklumat/" + this.userType);
  }

  update() {
    this.spinner.show();
    let body = {
      pengesahan_peneriman: this.pengesahan_peneriman,
      nama: this.nama,
      alamat: this.w1 + "," + this.w2 + "," + this.w3 + "," + this.w4,
      tarikh: this.tarikh,
      lawatan_tapak_tarikh: this.lawatan_tapak_tarikh,
      bertempat_di: this.bertempat_di,
      wakil: this.wakil,
      peratusan_permis_adalah_kurang_daripada_50:
        this.peratusan_permis_adalah_kurang_daripada_50,
      kawasan_itu_kotor_dan_perlu_dibersihkan:
        this.kawasan_itu_kotor_dan_perlu_dibersihkan,
      tiada_kemudahan_stopper_untuk_tayar_trak:
        this.tiada_kemudahan_stopper_untuk_tayar_trak,
      tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah:
        this.tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah,
      tiada_garisan_kuning_di_hadapan_rumah_sampah:
        this.tiada_garisan_kuning_di_hadapan_rumah_sampah,
      tong_sampah_tidak_mencukupi_mengikut_spesifikasi:
        this.tong_sampah_tidak_mencukupi_mengikut_spesifikasi,
      turning_point_tidak_mengikut_spesifikasi:
        this.turning_point_tidak_mengikut_spesifikasi,
      mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai:
        this.mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai,
    };
    // console.log(body);
    let key = localStorage.getItem("AccessToken");
    // console.log(key);
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .put(
        this.basePublicUrl +
          "/public/updateNonComplianceForm/" +
          this.non_compliance_id,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          // console.log(res);
          this.spinner.hide();
          this.openSuccessModal();
        },
        (error) => {
          // console.log("error is", JSON.stringify(error));
          // console.log("status", error.status);
          this.errorMessage = error.message;
          this.spinner.hide();

          this.openErrorModal();
          // console.log(this.non_compliance_id);
        }
      );
  }

  onSaveUsernameChanged1(value: boolean) {
    this.peratusan_permis_adalah_kurang_daripada_50 = value;
    // console.log(value);
  }
  onSaveUsernameChanged2(value: boolean) {
    this.kawasan_itu_kotor_dan_perlu_dibersihkan = value;
    // console.log(value);
  }
  onSaveUsernameChanged3(value: boolean) {
    this.tiada_kemudahan_stopper_untuk_tayar_trak = value;
    // console.log(value);
  }
  onSaveUsernameChanged4(value: boolean) {
    this.tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah = value;
    // console.log(value);
  }
  onSaveUsernameChanged5(value: boolean) {
    this.tiada_garisan_kuning_di_hadapan_rumah_sampah = value;
    // console.log(value);
  }
  onSaveUsernameChanged6(value: boolean) {
    this.tong_sampah_tidak_mencukupi_mengikut_spesifikasi = value;
    // console.log(value);
  }
  onSaveUsernameChanged7(value: boolean) {
    this.turning_point_tidak_mengikut_spesifikasi = value;
    // console.log(value);
  }
  onSaveUsernameChanged8(value: boolean) {
    this.mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai = value;
    // console.log(value);
  }

  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };

    let body = {};

    // console.log(header);
    this.http
      .post(this.basePublicUrl + "/public/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/publicLogin");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
}
