import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
import { saveAs } from "file-saver";

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
  categories = [
    {
      id: 1,
      caption: "Kediaman Teres (Landed)",
      rate: 7.8
    },
    {
      id: 2,
      caption: "Kediaman Bertingkat (Non-Landed)",
      rate: 5.45
    },
    {
      id: 3,
      caption: "Kawasan Komersial",
      rate: 12.50
    },
    {
      id: 4,
      caption: "MGB 660L",
      rate: 83.60
    },
    {
      id: 6,
      caption: "MGB 1100L",
      rate: 139.30
    },
    {
      id: 5,
      caption: "Mobile Compactor / RORO",
      rate: 80
    }
  ];
  frequencies = [];
  basePublicUrl = environment.basePublicUrl;
  registrationGroup: FormGroup;
  submitted: boolean;
  parlimen: any;
  lokasi: any;
  SERVER_URL: any = environment.basePublicUrl + "/public/uploadFile";
  tarikhSiasatan: any;
  sisa_domestik: any = "";
  sampah_pukal: any = "";
  sapuan_TPKK: any = "";
  sapuan_jalan: any = "";
  sapuan_parkir: any = "";
  cucian_jejantas: any = "";
  cucian_longkang: any = "";
  cucian_siarkaki_berbumbung: any = "";
  cucian_slesenbaslteksi: any = "";
  cucian_siarkaki: any = "";
  sapuan_jejantas: any = "";
  catatan: any = "";
  rujuken_tarikh_serahan: any = "";
  tarikh_semakandi_lapangant_keadeansemata_ada: any = "";
  potong_rumput: any = "";
  sampah_kebun: any = "";
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
  });
  fileName: string = "";
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
  sampah_haram: any = "";
  jumlah_unit_premis: any = "";
  kordinat: any;
  long: any;
  tarikh_semakandi_lapangant_keadeansemata_tiada: any = "";
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

  // sisa domestik
  domesticCategory: any;
  domesticTotal: any = 0;
  domesticRate: any = 0;
  domesticFreq: any = 0;
  selectCategoryDomestic(id:any) {
    this.categories.forEach((val) => {
      if (val.id == id) {
        this.domesticRate = val.rate;
      }
    });
  }

  // pukal
  pukalCategory: any;
  pukalTotal: any = 0;
  pukalRate: any = 0;
  pukalFreq: any = 0;
  selectCategoryPukal(id:any) {
    this.categories.forEach((val) => {
      if (val.id == id) {
        this.pukalRate = val.rate;
      }
    });
  }

  // sapuan
  sapuanRate: any = 0.27870;
  sapuanFreq: any = 0;
  sapuanPanjang: any = 0;
  sapuanKomersialRate: any = 0.55740;
  sapuanKomersialFreq: any = 0;
  sapuanKomersialPanjang: any = 0;

  // cucian
  cucianDomesticRate: any = 0.34838;
  cucianDomesticFreq: any = 0;
  cucianDomesticPanjang: any = 0;
  cucianKomersialRate: any = 0.69676;
  cucianKomersialFreq: any = 0;
  cucianKomersialPanjang: any = 0;
  cucianDrainDomesticRate: any = 0.09290;
  cucianDrainDomesticFreq: any = 0;
  cucianDrainDomesticPanjang: any = 0;
  cucianDrainKomersialRate: any = 0.04645;
  cucianDrainKomersialFreq: any = 0;
  cucianDrainKomersialPanjang: any = 0;
  cucianJejantasDalamRate: any = 4.5;
  cucianJejantasDalamFreq: any = 0;
  cucianJejantasDalamPanjang: any = 0;
  cucianJejantasAtasRate: any = 9.0;
  cucianJejantasAtasFreq: any = 0;
  cucianJejantasAtasPanjang: any = 0;
  cucianSiarRoofRate: any = 1.80;
  cucianSiarRoofFreq: any = 0;
  cucianSiarRoofPanjang: any = 0;
  cucianSiarGulam1Rate: any = 2.50;
  cucianSiarGulam1Freq: any = 0;
  cucianSiarGulam1Panjang: any = 0;
  cucianSiarGulam2Rate: any = 3.50;
  cucianSiarGulam2Freq: any = 0;
  cucianSiarGulam2Panjang: any = 0;
  cucianTandasRate: any = 2.50;
  cucianTandasFreq: any = 0;
  cucianTandasPanjang: any = 0;
  cucianTeksiRate: any = 20.00;
  cucianTeksiTotal: any = 0;
  cucianTeksiFreq: any = 0;

  // pembersihan
  bersihLapangRate: any = 0.00333;
  bersihLapangFreq: any = 0;
  bersihLapangPanjang: any = 0;
  bersihTpkkRate: any = 0.00333;
  bersihTpkkFreq: any = 0;
  bersihTpkkPanjang: any = 0;
  bersihPenjajaRate: any = 0.05;
  bersihPenjajaFreq: any = 0;
  bersihPenjajaPanjang: any = 0;
  bersihPasarRate: any = 0.05;
  bersihPasarFreq: any = 0;
  bersihPasarPanjang: any = 0;
  bersihPasarMlmRate: any = 1.00;
  bersihPasarMlmFreq: any = 0;
  bersihPasarMlmPanjang: any = 0;

  // lain lain
  rumputRate: any = 0.075;
  rumputFreq: any = 0;
  rumputPanjang: any = 0;

  selectedParlimen: any;
  Parliament: any;
  kodarea: any;
  p: any;
  parlimenAbc: any;
  latlong: any;
  locat: any;
  subArea: Object;
  parliament_subarea: any;
  check: boolean;
  kadar: any;
  frekuensi: any;
  deliveryDate: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    for(var i=1; i<=30; i++) {
      this.frequencies.push(i);
    }
    window.scroll(0, 0);
    $("input[name='key']").on('input', function (e) {
      var $input = $(this),
        val = $input.val();
      var locData = localStorage.getItem('locationArray');
      var data = JSON.parse(locData);
      for (let key of data) {
        if (key.includes(val)) {
          // console.log(key);
          let loc = key.split("|");
          this.long = loc[1];
          // console.log(this.long);
          localStorage.setItem("location", key);
          localStorage.setItem("longlati", this.long);
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
  }
  doUpload() {
    this.spinner.show();
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
    }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      this.fileName = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.http.post<any>(this.SERVER_URL, data).subscribe((response) => {
        console.log(response);
        this.fileName = response.filename;
        this.spinner.hide();
      });
    }
    this.uploader.clearQueue();
    console.log('filename: ', this.fileName);
    this.spinner.hide();
  }
  getPdf(e) {
    this.downloadPdf(e).then((blob) => {
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
      let tab = window.open();
      tab.location.href = fileURL;
    });
  }
  downloadPdf(id: number) {
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    return this.http
      .get(this.basePublicUrl + "/jkas_resourses/public/pdfs/" + id, {
        headers,
        responseType: "blob",
      })
      .toPromise();
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
            localStorage.setItem('locationArray', JSON.stringify(this.subarray1))
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
    let v = event;
    for (let key of this.subarray1) {
      if (key.includes(v)) {
        let loc = key.split("|");
        this.long = loc[1];
      }
    }
  }

  saveInventory() {
    if (
      this.parlimenAbc == undefined ||
      this.lokasi == undefined
    ) {
      this.check = true;
      return;
    }

    this.spinner.show();
    let body = {
      parlimen: this.parlimenAbc,
      lokasi: this.lokasi,
      kordinat: "",
      jumlah_unit_premis: this.jumlah_unit_premis,
      sisa_domestik: this.sisa_domestik,
      sampah_pukal: this.sampah_pukal,

      domestic_category: this.domesticCategory,
      domestic_total: this.domesticTotal,
      domestic_rate: this.domesticRate,
      domestic_freq: this.domesticFreq,

      pukal_category: this.pukalCategory,
      pukal_total: this.pukalTotal,
      pukal_rate: this.pukalRate,
      pukal_freq: this.pukalFreq,

      sapuan_domestic_unit: this.sapuanPanjang,
      sapuan_domestic_rate: this.sapuanRate,
      sapuan_domestic_freq: this.sapuanFreq,
      sapuan_komersial_unit: this.sapuanKomersialPanjang,
      sapuan_komersial_rate: this.sapuanKomersialRate,
      sapuan_komersial_freq: this.sapuanKomersialFreq,

      cucian_domestic_unit: this.cucianDomesticPanjang,
      cucian_domestic_rate: this.cucianDomesticRate,
      cucian_domestic_freq: this.cucianDomesticFreq,
      cucian_komersial_unit: this.cucianKomersialPanjang,
      cucian_komersial_rate: this.cucianKomersialRate,
      cucian_komersial_freq: this.cucianKomersialFreq,
      cucian_drain_domestic_unit: this.cucianDrainDomesticPanjang,
      cucian_drain_domestic_rate: this.cucianDrainDomesticRate,
      cucian_drain_domestic_freq: this.cucianDrainDomesticFreq,
      cucian_drain_komersial_unit: this.cucianDrainKomersialPanjang,
      cucian_drain_komersial_rate: this.cucianDrainKomersialRate,
      cucian_drain_komersial_freq: this.cucianDrainKomersialFreq,
      cucian_jejantas_dalam_unit: this.cucianJejantasDalamPanjang,
      cucian_jejantas_dalam_rate: this.cucianJejantasDalamRate,
      cucian_jejantas_dalam_freq: this.cucianJejantasDalamFreq,
      cucian_jejantas_atas_unit: this.cucianJejantasAtasPanjang,
      cucian_jejantas_atas_rate: this.cucianJejantasAtasRate,
      cucian_jejantas_atas_freq: this.cucianJejantasAtasFreq,
      cucian_siar_roof_unit: this.cucianSiarRoofPanjang,
      cucian_siar_roof_rate: this.cucianSiarRoofRate,
      cucian_siar_roof_freq: this.cucianSiarRoofFreq,
      cucian_siar_gulam1_unit: this.cucianSiarGulam1Panjang,
      cucian_siar_gulam1_rate: this.cucianSiarGulam1Rate,
      cucian_siar_gulam1_freq: this.cucianSiarGulam1Freq,
      cucian_siar_gulam2_unit: this.cucianSiarGulam2Panjang,
      cucian_siar_gulam2_rate: this.cucianSiarGulam2Rate,
      cucian_siar_gulam2_freq: this.cucianSiarGulam2Freq,
      cucian_tandas_unit: this.cucianTandasPanjang,
      cucian_tandas_rate: this.cucianTandasRate,
      cucian_tandas_freq: this.cucianTandasFreq,
      cucian_teksi_rate: this.cucianTeksiRate,
      cucian_teksi_total: this.cucianTeksiTotal,
      cucian_teksi_freq: this.cucianTeksiFreq,

      bersih_lapang_unit: this.bersihLapangPanjang,
      bersih_lapang_rate: this.bersihLapangRate,
      bersih_lapang_freq: this.bersihLapangFreq,
      bersih_tpkk_unit: this.bersihTpkkPanjang,
      bersih_tpkk_rate: this.bersihTpkkRate,
      bersih_tpkk_freq: this.bersihTpkkFreq,
      bersih_penjaja_unit: this.bersihPenjajaPanjang,
      bersih_penjaja_rate: this.bersihPenjajaRate,
      bersih_penjaja_freq: this.bersihPenjajaFreq,
      bersih_pasar_unit: this.bersihPasarPanjang,
      bersih_pasar_rate: this.bersihPasarRate,
      bersih_pasar_freq: this.bersihPasarFreq,
      bersih_pasar_mlm_unit: this.bersihPasarMlmPanjang,
      bersih_pasar_mlm_rate: this.bersihPasarMlmRate,
      bersih_pasar_mlm_freq: this.bersihPasarMlmFreq,

      rumput_unit: this.rumputPanjang,
      rumput_rate: this.rumputRate,
      rumput_freq: this.rumputFreq,

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
      rujukan_tarikh_serahan: this.deliveryDate,
      tarikh_semakandi_lapangant_keadeansemata_ada: this
        .tarikh_semakandi_lapangant_keadeansemata_ada,
      tarikh_semakandi_lapangant_keadeansemata_tiada: this
        .tarikh_semakandi_lapangant_keadeansemata_tiada,
      surat_serahan: this.fileName,
      kadar: this.kadar,
      frekuensi: this.frekuensi
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
  activityly(event: any) {
    this.parliament_subarea = event.target.value;
    //  console.log(this.parliament_subarea);
    localStorage.setItem("subArea", this.parliament_subarea);

  }
  searchButton() {
    this.spinner.show();
    this.Parliament = this.selectedParlimen;
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {
      parliament_name: this.selectedParlimen,
      parliament_subarea: localStorage.getItem("subArea"),
    }
    this.http
      .post(this.basePublicUrl + "/dbkl/getOmpBaru", body, {
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
          localStorage.setItem("isdbkl", "false");
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          // console.log("error is", error["error"]);
        }
      );
  }
}
