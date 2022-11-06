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
                                'domesticWaste', 'bulkWaste','road','tpkk','kawasanLapang',
                                'jejantasSapuan','jejantasCucian','cucianSiarKaki','cucianSiarKakiBerbumbung','cucianStesenBas','cucianLongkang',
                                'potongRumput','sampahKebun','kadar','frekuensi','jumlah','catatan','tarikhSerahan','checkAda','checkTiada','kemaskini'];
  headers: string[] = ['header-areaCode','header-location','header-parlimen','header-coordinate','header-totalUnitPremise','header-frequency',
                        'header-measurement','header-kadar','header-frekuensi','header-jumlah','header-reference','header-review','header-notes','header-edit'];
  headers2: string[] = ['header-domesticWaste','header-bulkGarbage','header-sweep','header-bridges','header-laundry','header-gutterWash',
                        'header-cutTheGrass','header-gardenWaste','header-available','header-none'];
  headers3: string[] = ['header-road','header-tpkk','header-parking','header-sweep2','header-laundry2','header-postFooter','header-postCoveredLegs','header-busTaxi'];
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
