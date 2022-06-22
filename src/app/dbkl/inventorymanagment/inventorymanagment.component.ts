import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

@Component({
  selector: "app-inventorymanagment",
  templateUrl: "./inventorymanagment.component.html",
  styleUrls: ["./inventorymanagment.component.css"],
})
export class InventorymanagmentComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  registrationGroup: FormGroup;
  submitted: boolean;
  parlimen: any;
  lokasi: any;
  sisa_domestik: any="";
  sampah_pukal: any="";
  sapuan_TPKK: any="";
  sapuan_jalan: any="";
  sapuan_parkir: any="";
  cucian_jejantas: any="";
  cucian_longkang: any="";
  cucian_siarkaki_berbumbung: any="";
  cucian_slesenbaslteksi: any="";
  cucian_siarkaki: any="";
  sapuan_jejantas: any="";
  catatan: any="";
  rujuken_tarikh_serahan: any="";
  tarikh_semakandi_lapangant_keadeansemata_ada: any="";
  potong_rumput: any="";
  sampah_kebun: any="";
  display: string;
  errorDisplay: string;
  lang: string;
  anncdata: any;
  sucessmsg: string;
  errmsg: string;
  subarray1: any[];
  selectedGuest: any;
  subarray: any;
  location: any = [];
  sampah_haram: any="";
  jumlah_unit_premis: any="";
  kordinat: any="";
  long: any;
  tarikh_semakandi_lapangant_keadeansemata_tiada: any="";
  loginError: boolean;
  errorMsg: any;
  data: any;
  ukuran_panjang_potongrumput: any="";
  ukuran_panjang_sampahkebun: any="";
  ukuran_panjang_cucilongkan: any="";
  ukuran_panjang_cucian_slesenbaslteksi: any="";
  ukuran_panjang_cucian_siarkaki: any="";
  ukuran_panjang_cucian_siarkaki_berbumbung: any="";
  ukuran_panjang_jejantas_cucian: any="";
  ukuran_panjang_jejantas_sapuan: any="";
  ukuran_panjang_sapuan_kewlapangparkir: any="";
  ukuran_panjang_sapuan_TPKK: any="";
  ukuran_panjang_sapuan_jalan: any="";
  kekerapan_kutipan_sisa_domestik: any="";
  kekerapan_kutipan_sampah_haram: any="";
  kekerapan_kutipan_sampah_pukal: any="";
  selectedParlimen: any;
  Parliament: any;
  kodarea: any;
  p:any;
  parlimenAbc: any;
  latlong: any;
  locat: any;
  subArea: Object;
  parliament_subarea: any;
  omp_id: string;
  check: boolean;
  isAdminType: string;
  username: string;
  ukuran_panjang_cucian_stesenbas_teksi: any="";
  ukuran_panjang_cucian_jejantas: any="";
  ukuran_panjang_sapuan_jejantas: any="";
  ukuran_panjang_sapuan_kaw_lapang_parkir: any="";
  ukuran_panjang_cucian_longkang: any="";

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.omp_id = this.route.snapshot.queryParamMap.get("id");
    this.spinner.show();
    this.lang = localStorage.getItem("lang");
    localStorage.setItem('path', 'dbkl/updateinventory');
    let key = localStorage.getItem("AccessToken");
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.basePublicUrl + "/dbkl/getSingleOmpBaru/" + this.omp_id, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res;
          //console.log(res);
          localStorage.setItem("parlimen_subarea",this.data.parlimen_subarea);
          localStorage.setItem("kordinat",this.data.kordinat);
          localStorage.setItem("kodarea",this.data.kodarea);
          this.parlimen=this.data.parlimen;
          this.lokasi=this.data.lokasi;
          this.jumlah_unit_premis=this.data.jumlah_unit_premis;
          this.kekerapan_kutipan_sisa_domestik=this.data.kekerapan_kutipan_sisa_domestik;
          this.kekerapan_kutipan_sampah_pukal=this.data.kekerapan_kutipan_sampah_pukal;
          this.kekerapan_kutipan_sampah_haram=this.data.kekerapan_kutipan_sampah_haram;
          this.ukuran_panjang_sapuan_jalan=this.data.ukuran_panjang_sapuan_jalan;
          this.ukuran_panjang_sapuan_TPKK=this.data.ukuran_panjang_sapuan_TPKK;
          this.ukuran_panjang_sapuan_kaw_lapang_parkir=this.data.ukuran_panjang_sapuan_kaw_lapang_parkir;
          this.ukuran_panjang_cucian_jejantas=this.data.ukuran_panjang_cucian_jejantas;
          this.ukuran_panjang_sapuan_jejantas=this.data.ukuran_panjang_sapuan_jejantas;
          this.ukuran_panjang_cucian_siarkaki=this.data.ukuran_panjang_cucian_siarkaki;
          this.ukuran_panjang_cucian_siarkaki_berbumbung=this.data.ukuran_panjang_cucian_siarkaki_berbumbung;
          this.ukuran_panjang_cucian_stesenbas_teksi=this.data.ukuran_panjang_cucian_stesenbas_teksi ;
          this.ukuran_panjang_cucian_longkang=this.data.ukuran_panjang_cucian_longkang ;
          this.ukuran_panjang_potongrumput=this.data.ukuran_panjang_potongrumput ;
          this.ukuran_panjang_sampahkebun=this.data.ukuran_panjang_sampahkebun ;
          this.catatan=this.data.catatan ;
          this.rujuken_tarikh_serahan=this.data.rujuken_tarikh_serahan ;
          this.tarikh_semakandi_lapangant_keadeansemata_ada=this.data.tarikh_semakandi_lapangant_keadeansemata_ada ;
          this.tarikh_semakandi_lapangant_keadeansemata_tiada=this.data.tarikh_semakandi_lapangant_keadeansemata_tiada ;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  
  
 
  saveInventory() {
    // if (
    //   this.jumlah_unit_premis == undefined ||
    //   this.potong_rumput == undefined || this.sapuan_jalan == undefined
    // ) {
    //   this.check = true;
    //   // console.log(this.check);
    //   return;
    // }
    this.spinner.show();
    let body = {
      parlimen: this.parlimen,
      lokasi:this.lokasi,
      kodarea:localStorage.getItem("kodarea"),
      kordinat: localStorage.getItem("kordinat"),
      parlimen_subarea:localStorage.getItem("parlimen_subarea"),
      jumlah_unit_premis:this.jumlah_unit_premis,
      kekerapan_kutipan_sisa_domestik: this.kekerapan_kutipan_sisa_domestik,
      kekerapan_kutipan_sampah_pukal: this.kekerapan_kutipan_sampah_pukal,
      kekerapan_kutipan_sampah_haram: this.kekerapan_kutipan_sampah_haram,
      ukuran_panjang_sapuan_jalan: this.ukuran_panjang_sapuan_jalan,
      ukuran_panjang_sapuan_TPKK: this.ukuran_panjang_sapuan_TPKK,
      ukuran_panjang_sapuan_kaw_lapang_parkir: this.ukuran_panjang_sapuan_kaw_lapang_parkir,
      ukuran_panjang_sapuan_jejantas: this.ukuran_panjang_sapuan_jejantas,
      ukuran_panjang_cucian_jejantas: this.ukuran_panjang_cucian_jejantas,
      ukuran_panjang_cucian_siarkaki: this.ukuran_panjang_cucian_siarkaki,
      ukuran_panjang_cucian_siarkaki_berbumbung: this.ukuran_panjang_cucian_siarkaki_berbumbung,
      ukuran_panjang_cucian_stesenbas_teksi: this.ukuran_panjang_cucian_stesenbas_teksi,
      ukuran_panjang_cucian_longkang: this.ukuran_panjang_cucian_longkang,
      ukuran_panjang_potongrumput: this.ukuran_panjang_potongrumput,
      ukuran_panjang_sampahkebun: this.ukuran_panjang_sampahkebun,
      catatan: this.catatan,
      rujukan_tarikh_serahan: this.rujuken_tarikh_serahan,
      tarikh_semakandi_lapangant_keadeansemata_ada: this
        .tarikh_semakandi_lapangant_keadeansemata_ada,
      tarikh_semakandi_lapangant_keadeansemata_tiada: this
        .tarikh_semakandi_lapangant_keadeansemata_tiada,
    };

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("AccessToken"),
    };
//console.log(body);

    this.http
      .put(environment.basePublicUrl + "/dbkl/updateOmpBaru/" + this.omp_id, body, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          this.spinner.hide();

          //console.log(data);
          
          this.anncdata = data["message"];
          if (this.anncdata == "OMP Baru list updated successfully.") {

            if (this.lang == "en") {

              this.sucessmsg = "OMP Baru added successfully!";
            }
            else {
              this.sucessmsg = "OMP Baru berjaya ditambahkan!";
            }
            this.openSuccessModal();
          }
        },
        (error) => {
          this.spinner.hide();
          this.anncdata = error["message"];
          if (this.anncdata == "omp_baru_not_added") {

            if (this.lang == "en") {

              this.errmsg = "OMP Baru could not be added! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "OMP Baru tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
            this.openErrorModal();
          }
        }
      );
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


  backtotop() {
    window.scroll(0, 0);
  }
  openSuccessModal() {
    this.router.navigateByUrl("dbkl/ompbaru");
   //this.display = "block";
  }

  openErrorModal() {
    this.errorDisplay = "block";
  }

  closeSuccessModal() {
    window.location.reload();
  }

  closeErrorModal() {
    this.errorDisplay = "none";
    this.router.navigateByUrl("dbkl/dbklmainpage");
  }
}
