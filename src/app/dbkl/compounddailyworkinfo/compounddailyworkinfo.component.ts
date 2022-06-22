import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-compounddailyworkinfo",
  templateUrl: "./compounddailyworkinfo.component.html",
  styleUrls: ["./compounddailyworkinfo.component.css"],
})
export class CompounddailyworkinfoComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: Object;
  loginError: boolean;
  errorMsg: any;
  parliamen: any;
  id: any;
  date: any;
  p;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");

    let body = {
      tarikh: this.date,
      id_mtb: this.id,
    };
    // console.log(body);

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/viewDailyMTBInquiryInformation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log(res);
          this.data = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  ngOnInit() {
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/compounddailyworkinfo");
    $(document).ready(function () {
      $("#yearOfApplication").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
          $(this).toggle($(this).text().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {
      $("#applicationSerialNumber").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });

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

    $(document).ready(function () {
      $("#yearOfApplication").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
          $(this).toggle($(this).text().indexOf(value) > -1);
        });
      });
    });

    $(document).ready(function () {
      $("#applicationSerialNumber").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tableBody tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }
  backtotop() {
    window.scroll(0, 0);
  }
  logout() {
    
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

        },
        (error) => {

          // console.log("error is", error["error"]);
        }
      );
  }
}
