import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-compoundinspectingofficer",
  templateUrl: "./compoundinspectingofficer.component.html",
  styleUrls: ["./compoundinspectingofficer.component.css"],
})
export class CompoundinspectingofficerComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  show: boolean = false;
  value: any = [];
  p;
  mtb: any;
  value4: any[];
  datevalue: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.getOfficersList();
  }

  ngOnInit() {
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/compoundinspectingofficer");
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

  settings = {
    selectMode: "multi",
    actions: {
      position: "right",
      edit: false,
      add: false,
      new: false,
      custom: [{ name: "routeToUpdateFeedback", title: `Edit ` }],
    },
    columns: {
      officer_id: {
        title: "Bill. No.",
      },
      id_mtb: {
        title: "ID MTK/MTB",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          // return "<a  (click)='onUserRowSelect($event)' style='color: blue;cursor: pointer;'>"+row.id_mtb+"</a>";
          return (
            "<a  (click)=" +
            "onClickRow($event) style=" +
            "color: blue;cursor: pointer;" +
            ">" +
            row.id_mtb +
            "</a>"
          );
        },
      },
      parlimen: {
        title: "Parliament",
      },
    },
  };

  settings1 = {
    actions: false,

    columns: {
      date: {
        title: "Date",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "/dbkl/compoundinfo?value=" +
            row.date +
            "&value2=" +
            row.id_mtb +
            "&value3=" +
            row.parlimen +
            ">" +
            row.date +
            "</a>"
          );
        },
      },
    },
  };

  date(id: string) {
    this.show = true;
    this.mtb = id;
    this.value = [];
    // console.log(this.data);
    for (let v of this.data) {
      if (id == v.id_mtb) {
        // console.log(v.id_mtb);
        this.value.push(v);
        this.value4 = this.value;
      }
    }

    // console.log(this.value);
  }

  chang() {
    let g = this.datevalue.split("T");
    // console.log(g[0]);

    for (let v of this.value) {
      if (v.date == g[0]) {
        this.value4 = [];
        $("#myTable").append(
          "<tr><td [routerLink]='['/dbkl/dailyworkinfo']' [queryParams]='{ value: v.date,value2:v.id_mtb,value3:v.parlimen}' style='color:blue;text-align:center;cursor: pointer;' >" +
            v.date +
            "</td></tr>"
        );
      }
    }
  }
  onUserRowSelect(event): void {
    this.date(event.data["id_mtb"]);
  }

  getOfficersList() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getMTBOfficersList", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
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
