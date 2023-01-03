import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { saveAs } from "file-saver";
export interface OmpData {
  ompId: number,
  areaCode?: string;
  location?: string;
  parlimen?: string;
  coordinate?: string;
  totalPremise?: string;
  domesticWaste?: string;
  bulkWaste?: string;
  illegalWaste?:string;
  road?:string;
  tpkk?:string;
  kawasanLapang?:string;
  jejantasSapuan?:string;
  jejantasCucian?:string;
  cucianSiarkaki?:string;
  cucianSiarkakiBumbung?:string;
  cucianStesenBas?:string;
  cucianLongkang?:string;
  potongRumput?:string;
  sampahKebun?:string;
  catatan?:string;
  tarikh?:string;
  available?:string;
  notAvailable?:string;
}

@Component({
  selector: "app-ompbaru",
  templateUrl: "./ompbaru.component.html",
  styleUrls: ["./ompbaru.component.css"],
})
export class OmpbaruComponent implements OnInit {
  categories = [
    {
      id: "1",
      caption: "Kediaman Teres (Landed)",
      rate: 7.8
    },
    {
      id: "2",
      caption: "Kediaman Bertingkat (Non-Landed)",
      rate: 5.45
    },
    {
      id: "3",
      caption: "Kawasan Komersial",
      rate: 12.50
    },
    {
      id: "4",
      caption: "MGB 660L",
      rate: 83.60
    },
    {
      id: "5",
      caption: "Mobile Compactor / RORO",
      rate: 80
    },
    {
      id: "6",
      caption: "MGB 1100L",
      rate: 139.30
    }
  ];
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  selectedParlimen: any;
  Parliament: any;
  kodarea: any;
  lokasi: any;
  parlimen: any;
  kordinat: any;
  jumlah_unit_premis: any;
  kekerapan_kutipan_sisa_domestik: any;
  kekerapan_kutipan_sampah_pukal: any;
  kekerapan_kutipan_sampah_haram: any;
  ukuran_panjang_sapuan_jalan: any;
  ukuran_panjang_sapuan_TPKK: any;
  ukuran_panjang_sapuan_kewlapangparkir: any;
  ukuran_panjang_jejantas_sapuan: any;
  ukuran_panjang_jejantas_cucian: any;
  ukuran_panjang_cucian_siarkaki: any;
  ukuran_panjang_cucian_siarkaki_berbumbung: any;
  ukuran_panjang_cucian_slesenbaslteksi: any;
  ukuran_panjang_cucilongkan: any;
  ukuran_panjang_potongrumput: any;
  ukuran_panjang_sampahkebun: any;
  catatan: any;
  rujuken_tarikh_serahan: any;
  tarikh_semakandi_lapangant_keadeansemata_ada: any;
  tarikh_semakandi_lapangant_keadeansemata_tiada: any;
  p: any;
  parlim: any;
  checked: boolean;
  parliament_subarea: any;
  subArea: Object;
  ukuran_panjang_cucian_longkang: any;
  isAdminType: string;
  username: string;
  AccessToken: string;
  deleteItem: any;
  display2: string;
  display3: string;
  ompid: string;
  ompData: OmpData[] = [];
  dataSource = new MatTableDataSource<OmpData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['areaCode', 'location', 'parlimen', 'coordinate', 'totalPremise',
                                
                                'domesticCategory', 'domesticTotal','domesticFreq','domesticJumlah',
                                'pukalCategory', 'pukalTotal','pukalFreq','pukalJumlah',
                                'sweepFreq','sweepUnit','sweepTotal','sweepKomersialFreq','sweepKomersialUnit','sweepKomersialTotal',
                                  
                                'cucianDrainDomesticFreq', 'cucianDrainDomesticUnit','cucianDrainDomesticTotal',
                                'cucianDrainKomersialFreq', 'cucianDrainKomersialUnit', 'cucianDrainKomersialTotal',
                                'cucianDrainMonsoonFreq', 'cucianDrainMonsoonUnit', 'cucianDrainMonsoonTotal',
                                'cucianDrainMonsoonKomersialFreq', 'cucianDrainMonsoonKomersialUnit', 'cucianDrainMonsoonKomersialTotal',
                                'cucianJejantasDalamFreq','cucianJejantasDalamUnit', 'cucianJejantasDalamTotal',
                                'cucianJejantasAtasFreq', 'cucianJejantasAtasUnit', 'cucianJejantasAtasTotal',
                                'cucianSiarBumbungFreq', 'cucianSiarBumbungUnit', 'cucianSiarBumbungTotal',
                                'cucianSiarGulam1Freq', 'cucianSiarGulam1Unit', 'cucianSiarGulam1Total',
                                'cucianSiarGulam2Freq', 'cucianSiarGulam2Unit', 'cucianSiarGulam2Total',
                                'cucianTandasFreq', 'cucianTandasUnit', 'cucianTandasTotal',
                                'cucianTeksiFreq', 'cucianTeksiUnit', 'cucianTeksiTotal',

                                'bersihLapangFreq','bersihLapangUnit','bersihLapangTotal',
                                'bersihTpkkFreq', 'bersihTpkkUnit', 'bersihTpkkTotal',
                                'bersihPenjajaFreq', 'bersihPenjajaUnit', 'bersihPenjajaTotal',
                                'bersihPasarFreq', 'bersihPasarUnit', 'bersihPasarTotal',
                                'bersihPasarMlmFreq', 'bersihPasarMlmUnit', 'bersihPasarMlmTotal',

                                'grassFreq', 'grassUnit', 'grassTotal',

                                'jumlah','tarikhSerahan',
                                'checkAda','checkTiada','catatan','kemaskini'];
  headers: string[] = [
    'header-areaCode','header-location','header-parlimen','header-coordinate','header-totalUnitPremise',
    'header-khidmat-sisapepejal', 'header-khidmat-pembersihan',
    'header-jumlah','header-reference','header-review','header-notes','header-edit'];
  headers2: string[] = [
    'header-domesticWaste','header-bulkGarbage',
    'header-sweep',
    'header-cucian',
    'header-pembersihan',
    'header-grass',
    'header-available','header-none'];
  headers3: string[] = [
    'header-domestic-category','header-domestic-jumlah','header-domestic-frequency','header-domestic-total',
    'header-pukal-category','header-pukal-jumlah','header-pukal-frequency','header-pukal-total',
    'header-sweep-domestic','header-sweep-komersial',
    'header-cucian-drain-domestic', 'header-cucian-drain-komersial', 'header-cucian-drain-monsoon', 'header-cucian-drain-monsoon-komersial','header-cucian-jejantas-dalam', 'header-cucian-jejantas-atas', 'header-cucian-siar-bumbung', 'header-cucian-siar-gulam1', 'header-cucian-siar-gulam2','header-cucian-tandas', 'header-cucian-teksi',
    'header-pembersihan-lapang', 'header-pembersihan-tpkk', 'header-pembersihan-penjaja', 'header-pembersihan-pasar', 'header-pembersihan-pasar-mlm'];
  headers4: string[] = [
      'header-sweep-freq','header-sweep-unit','header-sweep-jumlah', 
      'header-sweep-komersial-freq','header-sweep-komersial-unit','header-sweep-komersial-jumlah',
      
      'header-cucian-drain-domestic-freq','header-cucian-drain-domestic-unit','header-cucian-drain-domestic-jumlah',
      'header-cucian-drain-komersial-freq','header-cucian-drain-komersial-unit','header-cucian-drain-komersial-jumlah',
      'header-cucian-drain-monsoon-freq','header-cucian-drain-monsoon-unit','header-cucian-drain-monsoon-jumlah',
      'header-cucian-drain-monsoon-komersial-freq', 'header-cucian-drain-monsoon-komersial-unit','header-cucian-drain-monsoon-komersial-jumlah',
      'header-cucian-jejantas-dalam-freq','header-cucian-jejantas-dalam-unit','header-cucian-jejantas-dalam-jumlah',
      'header-cucian-jejantas-atas-freq','header-cucian-jejantas-atas-unit','header-cucian-jejantas-atas-jumlah',
      'header-cucian-siar-bumbung-freq','header-cucian-siar-bumbung-unit','header-cucian-siar-bumbung-jumlah',
      'header-cucian-siar-gulam1-freq','header-cucian-siar-gulam1-unit','header-cucian-siar-gulam1-jumlah',
      'header-cucian-siar-gulam2-freq','header-cucian-siar-gulam2-unit','header-cucian-siar-gulam2-jumlah',
      'header-cucian-tandas-freq','header-cucian-tandas-unit','header-cucian-tandas-jumlah',
      'header-cucian-teksi-freq','header-cucian-teksi-unit','header-cucian-teksi-jumlah',

      'header-pembersihan-lapang-freq', 'header-pembersihan-lapang-unit','header-pembersihan-lapang-jumlah',
      'header-pembersihan-tpkk-freq', 'header-pembersihan-tpkk-unit','header-pembersihan-tpkk-jumlah',
      'header-pembersihan-penjaja-freq','header-pembersihan-penjaja-unit','header-pembersihan-penjaja-jumlah',
      'header-pembersihan-pasar-freq','header-pembersihan-pasar-unit','header-pembersihan-pasar-jumlah',
      'header-pembersihan-pasar-mlm-freq','header-pembersihan-pasar-mlm-unit','header-pembersihan-pasar-mlm-jumlah',

      'header-grass-freq','header-grass-unit','header-grass-jumlah'
  ]
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/ompbaru");
  }
  activityly(event: any) {
    this.parliament_subarea = event.target.value;
    //console.log(this.parliament_subarea);
    localStorage.setItem("subArea", this.parliament_subarea);
  }
  backtotop() {
    window.scroll(0, 0);
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
        this.basePublicUrl + "/dbkl/getOmpSubArea/" + this.selectedParlimen,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          // alert(JSON.stringify(res));
          this.subArea = res;
          console.log(res);
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  search() {
    if (this.parlim == undefined) {
      this.checked = true;
      return;
    }

    if (this.parlim == "") {
      this.checked = true;
      return;
    }
    //console.log(this.parlim);
    this.checked = false;
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
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/getOmpBaru", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          this.ompData = [];
          for (let i=0; i<this.data.length; i++) {
            let result = this.data[i];
            let newOmpData = {
              location: result.lokasi,
              parlimen: result.parlimen,
              areaCode: result.kodarea,

              domesticCategory: result.domestic_category,
              domesticRate: result.domestic_rate,
              domesticTotal: result.domestic_total,
              domesticFreq: result.domestic_freq,
              pukalCategory: result.pukal_category,
              pukalRate: result.pukal_rate,
              pukalTotal: result.pukal_total,
              pukalFreq: result.pukal_freq,

              sweepFreq: result.sapuan_domestic_freq,
              sweepUnit: result.sapuan_domestic_unit,
              sweepRate: result.sapuan_domestic_rate,
              sweepKomersialFreq: result.sapuan_komersial_freq,
              sweepKomersialUnit: result.sapuan_komersial_unit,
              sweepKomersialRate: result.sapuan_komersial_rate,

              cucianDrainDomesticUnit: result.cucian_domestic_unit,
              cucianDrainDomesticFreq: result.cucian_domestic_freq,
              cucianDrainDomesticRate: result.cucian_domestic_rate,
              cucianDrainKomersialFreq: result.cucian_komersial_freq,
              cucianDrainKomersialUnit: result.cucian_komersial_unit,
              cucianDrainKomersialRate: result.cucian_komersial_rate,
              cucianDrainMonsoonFreq: result.cucian_drain_domestic_freq,
              cucianDrainMonsoonUnit: result.cucian_drain_domestic_unit,
              cucianDrainMonsoonRate: result.cucian_drain_domestic_rate,
              cucianDrainMonsoonKomersialFreq: result.cucian_drain_komersial_freq,
              cucianDrainMonsoonKomersialUnit: result.cucian_drain_komersial_unit,
              cucianDrainMonsoonKomersialRate: result.cucian_drain_komersial_rate,
              cucianJejantasDalamFreq: result.cucian_jejantas_dalam_freq,
              cucianJejantasDalamUnit: result.cucian_jejantas_dalam_unit,
              cucianJejantasDalamRate: result.cucian_jejantas_dalam_rate,
              cucianJejantasAtasFreq: result.cucian_jejantas_atas_freq,
              cucianJejantasAtasUnit: result.cucian_jejantas_atas_unit,
              cucianJejantasAtasRate: result.cucian_jejantas_atas_rate,
              cucianSiarBumbungFreq: result.cucian_siar_roof_freq,
              cucianSiarBumbungUnit: result.cucian_siar_roof_unit,
              cucianSiarBumbungRate: result.cucian_siar_roof_rate,
              cucianSiarGulam1Freq: result.cucian_siar_gulam1_freq,
              cucianSiarGulam1Unit: result.cucian_siar_gulam1_unit,
              cucianSiarGulam1Rate: result.cucian_siar_gulam1_rate,
              cucianSiarGulam2Freq: result.cucian_siar_gulam2_freq,
              cucianSiarGulam2Unit: result.cucian_siar_gulam2_unit,
              cucianSiarGulam2Rate: result.cucian_siar_gulam2_rate,
              cucianTandasFreq: result.cucian_tandas_freq,
              cucianTandasUnit: result.cucian_tandas_unit,
              cucianTandasRate: result.cucian_tandas_rate,
              cucianTeksiFreq: result.cucian_teksi_freq,
              cucianTeksiRate: result.cucian_teksi_rate,
              cucianTeksiUnit: result.cucian_teksi_total,

              bersihLapangFreq: result.bersih_lapang_freq,
              bersihLapangUnit: result.bersih_lapang_unit,
              bersihLapangRate: result.bersih_lapang_rate,
              bersihTpkkFreq: result.bersih_tpkk_freq,
              bersihTpkkUnit: result.bersih_tpkk_unit,
              bersihTpkkRate: result.bersih_tpkk_rate,
              bersihPenjajaFreq: result.bersih_penjaja_freq,
              bersihPenjajaUnit: result.bersih_penjaja_unit,
              bersihPenjajaRate: result.bersih_penjaja_rate,
              bersihPasarFreq: result.bersih_pasar_freq,
              bersihPasarUnit: result.bersih_pasar_unit,
              bersihPasarRate: result.bersih_pasar_rate,
              bersihPasarMlmFreq: result.bersih_pasar_mlm_freq,
              bersihPasarMlmUnit: result.bersih_pasar_mlm_unit,
              bersihPasarMlmRate: result.bersih_pasar_mlm_rate,
              grassFreq: result.rumput_freq,
              grassUnit: result.rumput_unit,
              grassRate: result.rumput_rate,
              
              bulkWaste: result.kekerapan_kutipan_sampah_pukal,
              coordinate: result.kordinat,
              domesticWaste: result.kekerapan_kutipan_sisa_domestik,
              illegalWaste: result.kekerapan_kutipan_sisa_domestik,
              jejantasCucian: result.ukuran_panjang_cucian_jejantas,
              jejantasSapuan: result.ukuran_panjang_sapuan_jalan,
              kawasanLapang: result.ukuran_panjang_sapuan_kaw_lapang_parkir,
              road: result.ukuran_panjang_sapuan_jalan,
              totalPremise: result.jumlah_unit_premis,
              tpkk: result.ukuran_panjang_sapuan_TPKK,
              kadar: result.kadar,
              frekuensi: result.frekuensi,
              catatan: result.catatan,
              ompId: result.omp_id,
              tarikh: result.rujuken_tarikh_serahan,
              cucianSiarkaki: result.ukuran_panjang_cucian_siarkaki,
              cucianSiarkakiBumbung: result.ukuran_panjang_cucian_siarkaki_berbumbung,
              cucianStesenBas: result.ukuran_panjang_cucian_stesenbas_teksi,
              cucianLongkang: result.ukuran_panjang_cucian_longkang,
              potongRumput: result.ukuran_panjang_potongrumput,
              sampahKebun: result.ukuran_panjang_sampahkebun,
              available: result.tarikh_semakandi_lapangant_keadeansemata_ada,
              notAvailable: result.tarikh_semakandi_lapangant_keadeansemata_tiada,
              suratSerahan: result.surat_serahan
            };
            if (result.domestic_category) {
              this.categories.forEach((category) => {
                if (result.domestic_category === category.id) {
                  console.log('set cat', category);
                  newOmpData['domesticCategory'] = category.caption;
                }
              })
            }
            if (result.pukal_category) {
              this.categories.forEach((category) => {
                if (result.pukal_category === category.id) {
                  console.log('set cat', category);
                  newOmpData['pukalCategory'] = category.caption;
                }
              })
            }
            newOmpData['jumlahKeseluruhan'] = 
                (+result.domestic_rate * +result.domestic_total) 
              + (+result.pukal_rate * +result.pukal_total) 
              + (+result.sapuan_domestic_unit * +result.sapuan_domestic_rate)
              + (+result.sapuan_komersial_unit * +result.sapuan_komersial_rate)
              + (+result.cucian_domestic_unit * +result.cucian_domestic_rate)
              + (+result.cucian_komersial_unit * +result.cucian_komersial_rate)
              + (+result.cucian_drain_domestic_unit * +result.cucian_drain_domestic_rate)
              + (+result.cucian_drain_komersial_unit * +result.cucian_drain_komersial_rate)
              + (+result.cucian_jejantas_dalam_freq * +result.cucian_jejantas_dalam_unit * +result.cucian_jejantas_dalam_rate)
              + (+result.cucian_jejantas_atas_freq * +result.cucian_jejantas_atas_unit * +result.cucian_jejantas_atas_rate)
              + (+result.cucian_siar_roof_freq * +result.cucian_siar_roof_unit * +result.cucian_siar_roof_rate)
              + (+result.cucian_siar_gulam1_freq * +result.cucian_siar_gulam1_unit * +result.cucian_siar_gulam1_rate)
              + (+result.cucian_siar_gulam2_freq * +result.cucian_siar_gulam2_unit * +result.cucian_siar_gulam2_rate)
              + (+result.cucian_tandas_freq * +result.cucian_tandas_unit * +result.cucian_tandas_rate)
              + (+result.cucian_teksi_freq * +result.cucian_teksi_rate * +result.cucian_teksi_total);
              + (+result.bersih_lapang_freq * +result.bersih_lapang_unit * +result.bersih_lapang_rate)
              + (+result.bersih_tpkk_freq * +result.bersih_tpkk_unit * +result.bersih_tpkk_rate)
              + (+result.bersih_penjaja_freq * +result.bersih_penjaja_unit * +result.bersih_penjaja_rate)
              + (+result.bersih_pasar_freq * +result.bersih_pasar_unit * +result.bersih_pasar_rate)
              + (+result.bersih_pasar_mlm_freq * +result.bersih_pasar_mlm_unit * +result.bersih_pasar_mlm_rate)
              + (+result.rumput_freq * +result.rumput_unit * +result.rumput_rate)
              ;
            this.ompData.push(newOmpData);
          }
          console.log('data source: ', this.ompData);
          this.dataSource.data = this.ompData;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    this.spinner.hide();
  }
  logout() {
    this.AccessToken = localStorage.getItem("AccessToken");
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.AccessToken,
    };

    let body = {};

    this.http
      .post(this.basePublicUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
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

  selectEvent(event) {
    this.display2 = "block";
    console.log(event);
    localStorage.setItem("ompid", event);
  }
  deleteSelected() {
    this.ompid = localStorage.getItem("ompid");
    let authorization = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: authorization,
      }),
    };
    this.spinner.show();
    this.http
      .delete(
        environment.basePublicUrl + "/dbkl/deleteOmpBaru/" + this.ompid,
        options
      )
      .subscribe(
        (s) => {
          this.spinner.hide();
          window.location.reload();
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
  closeModalDelete() {
    this.display2 = "none";
  }

  lookup(filterValue) {
    this.dataSource.filter = filterValue.target.value;
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
}
