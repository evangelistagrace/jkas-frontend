import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})
export class NewInventoryComponent implements OnInit {
  parliamens = [
    "SEGAMBUT",
    "TITIWANGSA",
    "WANGSA MAJU",
    "SETIAWANGSA",
    "BATU",
    "LEMBAH PANTAI",
    "KEPONG",
    "CHERAS",
    "BUKIT BINTANG",
    "SEPUTEH",
    "BANDAR TUN RAZAK",
  ];
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
  kordinat: any;
  long: any;
  tarikh_semakandi_lapangant_keadeansemata_tiada: any="";
  loginError: boolean;
  errorMsg: any;
  data: any;
  ukuran_panjang_potongrumput: any;
  ukuran_panjang_sampahkebun: any;
  ukuran_panjang_cucilongkan: any;
  ukuran_panjang_cucian_slesenbaslteksi: any;
  ukuran_panjang_cucian_siarkaki: any;
  ukuran_panjang_cucian_siarkaki_berbumbung: any;
  ukuran_panjang_jejantas_cucian: any;
  ukuran_panjang_jejantas_sapuan: any;
  ukuran_panjang_sapuan_kewlapangparkir: any;
  ukuran_panjang_sapuan_TPKK: any;
  ukuran_panjang_sapuan_jalan: any;
  kekerapan_kutipan_sisa_domestik: any;
  kekerapan_kutipan_sampah_haram: any;
  kekerapan_kutipan_sampah_pukal: any;
  selectedParlimen: any;
  Parliament: any;
  kodarea: any;
  p:any;
  parlimenAbc: any;
  latlong: any;
  locat: any;
  subArea: Object;
  parliament_subarea: any;
  check: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    $("input[name='key']").on('input', function (e) {
      var $input = $(this),
        val = $input.val();
      var locData=localStorage.getItem('locationArray');
      var data =JSON.parse(locData);
      for (let key of data) {
        if (key.includes(val)) {
          // console.log(key);
          let loc = key.split("|");
          this.long = loc[1];
          // console.log(this.long);
           localStorage.setItem("location",key);
           localStorage.setItem("longlati",this.long);
        }
      }
    });

    $("table.paginated").each(function () {
      var currentPage = 0;
      var numPerPage = 10;
      var $table = $(this);
      $table.bind("repaginate", function () {
        $table
          .find("tbody tr")
          .hide()
          .slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
          .show();
      });
      $table.trigger("repaginate");
      var numRows = $table.find("tbody tr").length;
      var numPages = Math.ceil(numRows / numPerPage);
      var $pager = $('<div class="pager"></div>');
      for (var page = 0; page < numPages; page++) {
        $('<span class="page-number"></span>')
          .text(page + 1)
          .bind(
            "click",
            {
              newPage: page,
            },
            function (event) {
              currentPage = event.data["newPage"];
              $table.trigger("repaginate");
              $(this).addClass("active").siblings().removeClass("active");
            }
          )
          .appendTo($pager)
          .addClass("clickable");
      }
      $pager
        .insertBefore($table)
        .find("span.page-number:first")
        .addClass("active");
    });



    this.lang = localStorage.getItem("lang");
    localStorage.setItem('path', '/dbkl/inventorymanage');
  //   this.registrationGroup = new FormGroup({
  //     //  parlimen: new FormControl("", [Validators.required]),
  //     // lokasi: new FormControl("", [Validators.required]),
  //     jumlah_unit_premis: new FormControl("", [Validators.required]),
  //     sisa_domestik: new FormControl("", [Validators.required]),
  //     sampah_pukal: new FormControl("", [Validators.required]),
  //     sampah_haram: new FormControl("", [Validators.required]),
  //     sapuan_jalan: new FormControl("", [Validators.required]),
  //     sapuan_TPKK: new FormControl("", [Validators.required]),
  //     sapuan_parkir: new FormControl("", [Validators.required]),
  //     sapuan_jejantas: new FormControl("", [Validators.required]),
  //     cucian_jejantas: new FormControl("", [Validators.required]),
  //     cucian_siarkaki: new FormControl("", [Validators.required]),
  //     cucian_siarkaki_berbumbung: new FormControl("", [Validators.required]),
  //     cucian_slesenbaslteksi: new FormControl("", [Validators.required]),
  //     cucian_longkang: new FormControl("", [Validators.required]),
  //     catatan: new FormControl("", [Validators.required]),
  //     rujuken_tarikh_serahan: new FormControl("", [Validators.required]),
  //     tarikh_semakandi_lapangant_keadeansemata_ada: new FormControl("", [
  //       Validators.required,
  //     ]),
  //     tarikh_semakandi_lapangant_keadeansemata_tiada: new FormControl("", [
  //       Validators.required,
  //     ]),
  //     potong_rumput: new FormControl("", [Validators.required]),
  //     sampah_kebun: new FormControl("", [Validators.required]),
  //   });
   }
  
 

  selectEvent(event) {
    this.selectedGuest = event.target.value;
    // console.log("selected guest value" + this.selectedGuest);
    this.getParliament();
  }
  getParliament() {

    this.spinner.show();
    this.subarray1 = [];
    let body = {
      parlimen: this.selectedGuest,
    };
    this.http
      .post(environment.basePublicUrl + "/public/mapKawasanPerkhidmatan", body)
      .subscribe((data) => {
        this.spinner.hide();
        this.subarray = data;
        //  console.log("my response is thiss" + JSON.stringify(this.subarray));
        var i = 0;
        var j = 0;
        var values;
        var lati;
        var long;
        var status1;
        var count = 0;
        for (i; i < this.subarray.length; i++) {
          for (let k = 0; k < this.subarray[j].lokasi.length; k++) {
            values = this.subarray[j].lokasi[k].Lokasi;
            lati = this.subarray[j].lokasi[k].latitude;
            long = this.subarray[j].lokasi[k].longitude;
            status1 = this.subarray[j].lokasi[k].status;
            this.location.push(values);
            this.subarray1.push(values + "," + "|" + lati + "," + long);
            localStorage.setItem('locationArray',JSON.stringify(this.subarray1))
            count++;
            //console.log(values);
            //console.log(this.location);
            
          }
          j++;
        }
      });
  }
 
  getValue(e) {
  //  console.log(e);
    let v = event;
    for (let key of this.subarray1) {
      if (key.includes(v)) {
        // console.log(key);
        let loc = key.split("|");
        this.long = loc[1];
        // console.log(this.long);
      }
    }
  }
  selectlocation(event) {
    //console.log(event);

    let v = event;
    //console.log(v);

    for (let key of this.subarray1) {

      if (key.includes(v)) {
      //  console.log(key);
        let loc=key.split("|");
        this.long=loc[1];
      //  console.log(this.long);
        

      }
    }
  }

  // get f() {
  //   return this.registrationGroup.controls;
  // }
  saveInventory() {
   // console.log(this.sisa_domestik);
   // console.log(this.jumlah_unit_premis);
    if (
      this.parlimenAbc == undefined ||
      this.lokasi == undefined
    ) {
      this.check = true;
      // console.log(this.check);
      return;
    }
    
    // this.submitted = true;
    // if (this.registrationGroup.invalid) {
    // console.log("bye");
    
      
    //   return;
    // }
    this.spinner.show();
    let body = {
      parlimen: this.parlimenAbc,
      lokasi: this.lokasi,
      kordinat:"",
      jumlah_unit_premis:this.jumlah_unit_premis,
      sisa_domestik: this.sisa_domestik,
      sampah_pukal: this.sampah_pukal,
      sampah_haram: this.sampah_haram,
      sapuan_jalan: this.sapuan_jalan,
      sapuan_TPKK: this.sapuan_TPKK,
      sapuan_parkir: this.sapuan_parkir,
      sapuan_jejantas: this.sapuan_jejantas,
      cucian_jejantas: this.cucian_jejantas,
      cucian_siarkaki: this.cucian_siarkaki,
      cucian_siarkaki_berbumbung: this.cucian_siarkaki_berbumbung,
      cucian_stesenbas_teksi: this.cucian_slesenbaslteksi,
      cucian_longkang: this.cucian_longkang,
      potong_rumput: this.potong_rumput,
      sampah_kebun: this.sampah_kebun,
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
 console.log(body);

    this.http
      .post(environment.basePublicUrl + "/dbkl/createOmpBaru", body, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          this.spinner.hide();

         console.log(body);
          
          this.anncdata = data["message"];
          if (this.anncdata == "omp_baru_added") {

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
  selectChangeHandler(event: any) {
    this.spinner.show();
    this.selectedParlimen = event.target.value;
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(
        this.basePublicUrl +
          "/dbkl/getOmpSubArea/" +
          this.selectedParlimen,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.subArea = res;
        //console.log(res);
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  activityly(event: any){
    this.parliament_subarea=event.target.value;
  //  console.log(this.parliament_subarea);
    localStorage.setItem("subArea",this.parliament_subarea);
    
   }
  searchButton() {
    this.spinner.show();
    this.Parliament = this.selectedParlimen;
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
      let body={
        parliament_name:this.selectedParlimen,
        parliament_subarea:localStorage.getItem("subArea"),
    }
    this.http
    .post(this.basePublicUrl + "/dbkl/getOmpBaru" , body, {
      headers: headers,
    })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          (this.kodarea = this.data.kodarea),
            (this.lokasi = this.data.lokasi),
            (this.parlimen = this.data.parlimen),
            (this.kordinat = this.data.kordinat),
            (this.jumlah_unit_premis = this.data.jumlah_unit_premis),
            (this.kekerapan_kutipan_sisa_domestik =
              this.data.kekerapan_kutipan_sisa_domestik),
            (this.kekerapan_kutipan_sampah_pukal =
              this.data.kekerapan_kutipan_sampah_pukal),
            (this.kekerapan_kutipan_sampah_haram =
              this.data.kekerapan_kutipan_sampah_haram),
            (this.ukuran_panjang_sapuan_jalan =
              this.data.ukuran_panjang_sapuan_jalan),
            (this.ukuran_panjang_sapuan_TPKK =
              this.data.ukuran_panjang_sapuan_TPKK),
            (this.ukuran_panjang_sapuan_kewlapangparkir =
              this.data.ukuran_panjang_sapuan_kewlapangparkir),
            (this.ukuran_panjang_jejantas_sapuan =
              this.data.ukuran_panjang_jejantas_sapuan),
            (this.ukuran_panjang_jejantas_cucian =
              this.data.ukuran_panjang_jejantas_cucian),
            (this.ukuran_panjang_cucian_siarkaki =
              this.data.ukuran_panjang_cucian_siarkaki),
            (this.ukuran_panjang_cucian_siarkaki_berbumbung =
              this.data.ukuran_panjang_cucian_siarkaki_berbumbung),
            (this.ukuran_panjang_cucian_slesenbaslteksi =
              this.data.ukuran_panjang_cucian_slesenbaslteksi),
            (this.ukuran_panjang_cucilongkan =
              this.data.ukuran_panjang_cucilongkan),
            (this.ukuran_panjang_potongrumput =
              this.data.ukuran_panjang_potongrumput),
            (this.ukuran_panjang_sampahkebun =
              this.data.ukuran_panjang_sampahkebun),
            (this.catatan = this.data.catatan),
            (this.rujuken_tarikh_serahan = this.data.rujuken_tarikh_serahan),
            (this.tarikh_semakandi_lapangant_keadeansemata_ada =
              this.data.tarikh_semakandi_lapangant_keadeansemata_ada),
            (this.tarikh_semakandi_lapangant_keadeansemata_tiada =
              this.data.tarikh_semakandi_lapangant_keadeansemata_tiada);
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
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
    window.location.reload();
  }

  closeErrorModal() {
    this.errorDisplay = "none";
    this.router.navigateByUrl("dbkl/dbklmainpage");
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
