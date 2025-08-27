import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { TableService } from "src/app/table/table.service";
import { ApplicationList } from "src/app/table/applicationList";
import { UploaddocumentComponent } from "src/app/uploaddocument/uploaddocument.component";
import { MeetingService } from "src/app/services/meeting.service";
import { ShowpdfComponent } from "src/app/showpdf/showpdf.component";
import { Ng2SmartTableComponent } from "ng2-smart-table";


@Component({
  selector: 'app-publicppsppa-bak',
  templateUrl: './publicppsppa-bak.component.html',
  styleUrls: ['./publicppsppa-bak.component.css']
})
export class PublicppsppaBakComponent implements OnInit {
  accessToken: string;
  // basePublicUrl = environment.basePublicUrl;
  basePublicUrl = '';
  applicationList: any;
  p;
  username: string;
  datearray: any = [];
  arr: any;
  characters: ApplicationList[];
  keyValue: any;
  loginError: boolean;
  errorMsg: any;
  IdsArray: any[];
  selectedRows: any;
  listOfIds: string;
  lang: string;
  display: string;
  display2: string;
  selected: boolean;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private met: MeetingService,
    private table: Ng2SmartTableComponent
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.spinner.show();
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/public/checklist");

    this.accessToken = localStorage.getItem("AccessToken");
    this.username = localStorage.getItem("username");
    // console.log("username at public page", this.username);
    if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

    $(document).ready(function () {
      $(".dropdown").hover(function () {
        var dropdownMenu = $(this).children(".dropdown-menu");
        if (dropdownMenu.is(":visible")) {
          dropdownMenu.parent().toggleClass("open");
          
        }
      });
    });

    let elem = $('.ng2-smart-page-item');
    elem.on('click', function(){
      if($(this).children('span')){
        console.log($(this).children('span').text);
      }
    });

    let headers = {
      accept: "application/json",
      Authorization: this.accessToken,
    };

    this.http
      .get(this.basePublicUrl + "/public/viewApplicationList", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.applicationList = res;
          // console.log(this.applicationList);

          for (var index of this.applicationList) {
            this.arr = index.mesyuarat_permohanan_serahan_kawasan;

            if (this.arr != null) {
              this.datearray.push(this.arr.split(","));
            }
          }
        },
        (error) => {
          this.router.navigateByUrl("publicLogin");
          this.spinner.hide();
        }
      );

    this.tservice.getCharacters().subscribe((data: ApplicationList[]) => {
      this.characters = data;
      this.spinner.hide();
    });
  }

  backtotop() {
    window.scroll(0, 0);
  }

  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.accessToken,
    };

    let body = {};

   // console.log(header);
    this.http
      .post(this.basePublicUrl + "/public/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/publicLogin");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("username");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

  settings = {
    // selectMode: "multi",

    actions: {
      columnTitle: "KEMASKINI",
      position: "right",
      edit: false,
      // delete :true,
      delete: false,
      add: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit custom-font"></i>',
        },
      ],
    },
    columns: {
      no_siri_permohonan: {
        title: "1.NO SIRI PERMOHONAN",
      },
      tarikh_permohonan: {
        title: "2.TARIKH PERMOHONAN",
      },

      status_semakan_dokumen: {
        title: "3.STATUS SEMAKAN DOKUMEN",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return row.status_semakan_dokumen ? 'Lengkap' : 'Tidak Lengkap';
        },
      },
      mesyuarat_permohanan_serahan_kawasan: {
        title: "4.MESYUARAT JAWATANKUASA SERAHAN KAWASAN",
      },
      maklumat_lawatan_tapak_id: {
        title: "5.MAKLUMAT LAWATAN TAPAK",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          if (row.maklumat_lawatan_tapak_id !== null) {
            return (
              "<a  href=" +
              "/" +
              this.lang +
              "/public/maklumat/" +
              row.maklumat_lawatan_tapak_id +
              " >" +
              "Papar Maklumat" +
              "</a>"
            );
          } else {
            return "<p>-</p>";
          }
        },
      },
      status_Lawatan_Tapak: {
        title: " 6.STATUS LAWATAN TAPAK",
      },
      surat_penyerahan_kawasan: {
        title: "7.SURAT PENYERAHAN KAWASAN",
        type: "custom",
        renderComponent: ShowpdfComponent,
        valuePrepareFunction: (cell, row) => {
          this.met.value = row.no_siri_permohonan;
          this.met.getData = this.characters;
      },
      // surat_penyerahan_kawasan: {
      //   title: "Surat Penyerahan Kawasan",
        // type: "custom",
        // renderComponent: UploaddocumentComponent,
        // valuePrepareFunction: (cell, row) => {
        //   this.met.value = row.no_siri_permohonan;
        //   this.met.getData = this.characters;
        //   console.log(row.no_siri_permohonan+" "+this.characters);

      //   },
      // },
    }},
  };
  onUserRowSelect(event) {
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].application_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
    // console.log(this.listOfIds);
    // console.log(this.listOfIds.length);
    // console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
  }
  routeToNewApplication() {
    this.router.navigateByUrl("/public/checklistoption");
  }
  deleteSelected() {
    this.spinner.show();
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: this.accessToken,
      }),
      body: {
        app_id_list: this.listOfIds.substring(1, this.listOfIds.length - 1),
      },
    };
    // console.log(options);
    this.http
      .delete(
        this.basePublicUrl + "/public/deleteApplicationList",
        options
      )
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.spinner.hide();
        this.reloadComponent();
      });
  }
  reloadComponent() {
    this.backtotop();
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  onCustomEvent(event) {
    this.spinner.show();
    switch (event.action) {
      case "routeToDeleteApplication":
        // console.log(event.data);
        this.keyValue = event.data;
        // console.log(this.keyValue.application_id);

        const options = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: this.accessToken,
          }),
          body: {
            app_id_list: this.keyValue.application_id,
          },
        };

        this.http
          .delete(this.basePublicUrl + "/public/deleteApplicationList", options)
          .subscribe(
            (res) => {
              // console.log(res);
              this.spinner.hide();
              if (res["status"] == "success") {
                window.location.reload();
              }
            },
            (error) => {
              this.spinner.hide();
              this.loginError = true;
              this.errorMsg = error["error"]["message"];
            }
          );
        break;
      case "routeToUpdateApplicationForm":

        // console.log(event.data);
        this.keyValue = event.data;
        localStorage.setItem("date1", this.keyValue.tarikh_permohonan);
        this.spinner.hide();
        this.router.navigateByUrl(
          "public/showchecklist?id=" + this.keyValue.dokumen_senarai
        );
        break;
    }
  }
  closeModal() {
    this.display = "none";
  }
  opendeletemodal() {
    this.display2 = "block";
  }
  closeModalDelete() {
    this.display2 = "none";
  }
  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display = "block";

    }
    else if (this.IdsArray.length == 0) {
      this.display = "block";
    }
    else {
      this.opendeletemodal();

      
    }
   
  }
  cancel() {

    window.history.back();// <-- go back to previous location on cancel

  }
}

