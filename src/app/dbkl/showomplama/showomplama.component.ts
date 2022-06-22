import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-showomplama",
  templateUrl: "./showomplama.component.html",
  styleUrls: ["./showomplama.component.css"],
})
export class ShowomplamaComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  parilament_name: string;
  selectedparlimen: any;
  longitude: any;
  latitude: any;
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
  var: any;
  p: any;
  dataShow: any=[];
  subArea: string;
  ukuran_panjang_cucian_longkang: any;
  isAdminType: string;
  username: string;
                                                                        
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.parilament_name =localStorage.getItem("parlimen");
this.subArea=localStorage.getItem("subArea");
    let key = localStorage.getItem("AccessToken");
    localStorage.setItem(
      "path",
      "/dbkl/showomplama?value=" + this.parilament_name
    );
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body={
      parliament_name:this.parilament_name,
        parliament_subarea:this.subArea,
    }
    this.http
      .post(this.basePublicUrl + "/dbkl/getOmpLama" ,body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res;
          this.spinner.hide();
          (this.kodarea = this.data.kodarea),
            (this.lokasi = this.data.lokasi),
            (this.parlimen = this.data.parlimen),
            (this.latitude = this.data.latitude),
            (this.longitude = this.data.longitude),
            (this.kordinat = this.latitude + this.longitude),
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
            (this.ukuran_panjang_cucian_longkang =
              this.data.ukuran_panjang_cucian_longkang),
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
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  ngOnInit() {
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");

    
    window.scroll(0, 0);
     // Pegination
     $(document).ready(function () {
      // Search all columns
      $("#txt_searchall").keyup(function () {
        // Search Text
        var search = $(this).val();
        // Hide all table tbody rows
        $("table tbody tr").hide();
        
        // Count total search result
        var len = $(
          'table tbody tr:not(.notfound) td:contains("' + search + '")'
        ).length;
        if (len > 0) {
          // Searching text in columns and show match row
          $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
            function () {
              $(this).closest("tr").show();
            }
          );
        } else {
          $(".notfound").show();
        }
      });
      // Search on name column only
      $("#txt_name").keyup(function () {
        // Search Text
        var search = $(this).val();
        // Hide all table tbody rows
        $("table tbody tr").hide();
        // Count total search result
        var len = $(
          'table tbody tr:not(.notfound) td:nth-child(2):contains("' +
            search +
            '")'
        ).length;
        if (len > 0) {
          // Searching text in columns and show match row
          $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
            function () {
              $(this).closest("tr").show();
            }
          );
        } else {
          $(".notfound").show();
        }
      });
    });
    // Case-insensitive searching (Note - remove the below script for Case sensitive search )
    $.expr[":"].contains = $.expr.createPseudo(function (arg) {
      return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
    });

    $("td", "table").each(function (i) {
      $(this).text(i + 1);
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

    //End Pegination

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

