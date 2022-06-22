import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addnoncompliance',
  templateUrl: './addnoncompliance.component.html',
  styleUrls: ['./addnoncompliance.component.css']
})
export class AddnoncomplianceComponent implements OnInit {

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
  peratusan_permis_adalah_kurang_daripada_50: boolean = false;
  kawasan_itu_kotor_dan_perlu_dibersihkan: boolean = false;
  tiada_kemudahan_stopper_untuk_tayar_trak: boolean = false;
  tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah: boolean = false;
  tiada_garisan_kuning_di_hadapan_rumah_sampah: boolean = false;
  tong_sampah_tidak_mencukupi_mengikut_spesifikasi: boolean = false;
  turning_point_tidak_mengikut_spesifikasi: boolean = false;
  mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai: boolean = false;
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
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/dbklnoncompliance");

    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");

    this.spinner.show();
    let key = localStorage.getItem("AccessToken");

    this.userType = this.route.snapshot.queryParamMap.get("id");
    localStorage.setItem("path", "/dbkl/dbklnoncompliance?id=" + this.userType);

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
    let id=localStorage.getItem("appno");
    this.router.navigateByUrl('/dbkl/dbklsitevisit?id='+id);
  }

  closeErrorModal() {
    this.errorDisplay = "none";
    
  }

  update() {
    this.spinner.show();
    let body = {
      site_id: this.userType,
      kad_pengenalan: this.kad_pengenalan,
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
    //console.log(body);
    let key = localStorage.getItem("AccessToken");
    //console.log(key);
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .post(
        this.basePublicUrl +
        "/public/addNonComplianceForm",
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          //console.log(res);
          this.spinner.hide();
          this.openSuccessModal();
        },
        (error) => {
          this.errorMessage = error.message;
          this.errorMsg = error["error"]["message"];
          this.spinner.hide();
          this.openErrorModal();
        }
      );
  }

  onSaveUsernameChanged1(value: boolean) {
    this.peratusan_permis_adalah_kurang_daripada_50 = value;
    
  }
  onSaveUsernameChanged2(value: boolean) {
    this.kawasan_itu_kotor_dan_perlu_dibersihkan = value;
 
  }
  onSaveUsernameChanged3(value: boolean) {
    this.tiada_kemudahan_stopper_untuk_tayar_trak = value;
   
  }
  onSaveUsernameChanged4(value: boolean) {
    this.tiada_kemudahan_greating_di_hadapan_pintu_rumah_sampah = value;
   
  }
  onSaveUsernameChanged5(value: boolean) {
    this.tiada_garisan_kuning_di_hadapan_rumah_sampah = value;
  
  }
  onSaveUsernameChanged6(value: boolean) {
    this.tong_sampah_tidak_mencukupi_mengikut_spesifikasi = value;
   
  }
  onSaveUsernameChanged7(value: boolean) {
    this.turning_point_tidak_mengikut_spesifikasi = value;
   
  }
  onSaveUsernameChanged8(value: boolean) {
    this.mesin_swm_24m_perlu_ditinggikan_6_inci_dari_lantai = value;
    
  }
  goProducts() {
    this.router.navigateByUrl("/dbkl/dbklsitevisit?id=" + this.userType);
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
