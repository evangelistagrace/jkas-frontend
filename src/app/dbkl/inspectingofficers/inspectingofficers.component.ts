import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-inspectingofficers",
  templateUrl: "./inspectingofficers.component.html",
  styleUrls: ["./inspectingofficers.component.css"],
})
export class InspectingofficersComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  loginError: boolean;
  errorMsg: any;
  data: any;
  show: boolean = false;
  value: any = [];
  value4: any = [];
  mtb: any;
  p;
  dataVALUE:any;
  datevalue: any;
  Role: string;
  dataShow: any=[];
  isAdminType: string;
  username: string;
  userrole: string;
  getDate: any=[];
  parli: string;
  mtbUser: string;
  parlime: string;
  datee: string;
  getMtb: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private dataservice: AuthService
  ) {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");

    localStorage.setItem("path", "/dbkl/inspectingofficers");
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
          //console.log(this.data);
          
          for(let key of this.data){
            this.dataShow.push(key);
          }
          
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.userrole = localStorage.getItem("roleforuser");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    // $(document).ready(function () {
    //   // Search all columns
    //   $("#txt_searchall").keyup(function () {
    //     // Search Text
    //     var search = $(this).val();
    //     // Hide all table tbody rows
    //     $("table tbody tr").hide();
    //     // Count total search result
    //     var len = $(
    //       'table tbody tr:not(.notfound) td:contains("' + search + '")'
    //     ).length;
    //     if (len > 0) {
    //       // Searching text in columns and show match row
    //       $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
    //         function () {
    //           $(this).closest("tr").show();
    //         }
    //       );
    //     } else {
    //       $(".notfound").show();
    //     }
    //   });
    //   // Search on name column only
    //   $("#txt_name").keyup(function () {
    //     // Search Text
    //     var search = $(this).val();
    //     // Hide all table tbody rows
    //     $("table tbody tr").hide();
    //     // Count total search result
    //     var len = $(
    //       'table tbody tr:not(.notfound) td:nth-child(2):contains("' +
    //         search +
    //         '")'
    //     ).length;
    //     if (len > 0) {
    //       // Searching text in columns and show match row
    //       $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
    //         function () {
    //           $(this).closest("tr").show();
    //         }
    //       );
    //     } else {
    //       $(".notfound").show();
    //     }
    //   });
    // });
    // // Case-insensitive searching (Note - remove the below script for Case sensitive search )
    // $.expr[":"].contains = $.expr.createPseudo(function (arg) {
    //   return function (elem) {
    //     return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    //   };
    // });

    // $("td", "table").each(function (i) {
    //   $(this).text(i + 1);
    // });

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
   

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

  date(id: string,parlimen:string) {
    this.show = true;
    this.parli=parlimen;
    this.mtb = id;
    localStorage.setItem("mtbId",this.mtb);
    localStorage.setItem("parlime",this.parli);
   // console.log(this.parli);
    
    //console.log("mtb",this.mtb);
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {
      officer_name:this.mtb,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/getMTBOfficersTarikh",body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getDate = res;  
          //console.log(this.getDate);
          
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    this.value = [];
    for (let v of this.data) {
      if (id == v.officer_name) {
        this.value.push(v);
        this.value4 = this.value;
        //console.log("asa",this.value4);
        
      }
    }
    let body1 = {
      officer_name: this.mtb,

    };
   // console.log(",,,,,",body);
    
    this.http
      .post(this.basePublicUrl + "/dbkl/getMTB" ,body1, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getMtb=res[0];
        //  console.log(this.getMtb);
        localStorage.setItem("mtbids",this.getMtb)
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  showDate(data: any) {
    // console.log(data);
  }
  backtotop() {
    window.scroll(0, 0);
  }
  redir(id:string){
    this.datee=id;
    this.mtbUser=localStorage.getItem("mtbId");
    this.parlime=localStorage.getItem("parlime");
    this.router.navigate(['/dbkl/mtbmap'], { queryParams: { value:  this.datee,value2: this.mtbUser,value3: this.parlime} });
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

  searchMtb(e){
   // console.log(e);
    this.dataShow=[];
    for(let i=0;i<this.data.length;i++){
      //console.log(this.data[i].id_mtb);
      
      if(this.data[i].officer_name.includes(e)){
        
        this.dataShow.push(this.data[i]);
      //  console.log(this.dataShow);
        
      }
    }
    
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
   searchdate(e){
    console.log(e);
  this.value4=[];
   for(let i=0;i<this.getDate.length;i++){     
     if(this.getDate[i].includes(e)){
       this.value4.push(this.getDate[i]);
      console.log(this.value4);
      
     }
    //  else{
    //    this.noDataFound="NO data found";
    //    this.value4.push(this.noDataFound);
    //   console.log(this.value4);
    //  }
   }
 }
}
