import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { TableService } from "src/app/table/table.service";
import { user } from "src/app/table/usermanage";
import { usermanagement } from "src/app/table/usermanagment";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-usermanagment",
  templateUrl: "./usermanagment.component.html",
  styleUrls: ["./usermanagment.component.css"],
})
export class UsermanagmentComponent implements OnInit {
  errorMsg: any;
  loginError: boolean;
  basePublicUrl = environment.basePublicUrl;
  data: Object;
  is2nd: boolean;
  is1st: boolean;
  data1: usermanagement[];
  accessToken: any;
  listOfIds: string;
  IdsArray: any = [];
  selectedRows: any;
  keyValue: any;
  display: string;
  user_role: string;
  display1: string;
  display2: string;
  display3: string;
  selected: boolean;
  anncdata: any;
  lang: string;
  dsucessmsg: string;
  derrmsg: string;
  display6: string;
  errorDisplay1: string;
  display5: string;
  publicsignupGroup: any;
  username: any;
  name: any;
  email: any;
  password: any;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  c4: boolean;
  isAdminType: string;
  AccessToken: string;
  username1: any;
  doc: any;

  settings = {
    selectMode: "multi",
    actions: {
      columnTitle: "Tindakan",
      position: "right",
      edit: false,
      delete: false,
      add: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit"></i>',
        },
      ],
    },
    columns: {
      nama_pengguna: {
        title: "Nama Pengguna"
      },
      id_pengguna: {
        title: "ID Pengguna",
      },
      kata_laluan: {
        title: "Kata Laluan"
      },
      peranan: {
        title: "Peranan",
      },
      catatan: {
        title: "Catatan",
      },
    },
  };


  constructor(
    private http: HttpClient,
    private tservice: TableService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.doc = document.getElementsByClassName('ng-pristine');
    //console.log(this.doc);


    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.user_role = localStorage.getItem("ROLE");
    this.user_role = this.user_role.toLowerCase();
    if (this.user_role === "superadmin") {
      this.is1st = true;
      this.is2nd = false;
      this.display1 = "block";
      this.closeModal();
    } else {
      $("#inlineRadio2").attr("disabled", true);
      $("#inlineRadio1").attr("disabled", true);
      this.display1 = "none";

      this.openModal();
    }
    localStorage.setItem("path", "/dbkl/usermanagement");

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };
    this.spinner.show();
    this.http
      .get(this.basePublicUrl + "/dbkl/getInventoriPengguna", {
        headers: headers,
      })
      .subscribe(
        (res: user[]) => {
          this.data = res;
          // console.log("hy", res);
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );

    this.http
      .get(this.basePublicUrl + "/dbkl/getLogPengguna", { headers: headers })
      .subscribe(
        (res: usermanagement[]) => {
          this.spinner.hide();
          // console.log(res);
          this.data1 = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }



  // id_pengguna: "ORANG1234"
  // inventori_pengguna_id: 3
  // kata_laluan: "$2b$04$mHGVGc2u20Zky0yI8/6DSuCedb50lfWsxALCurQWcXZYXn4VQk2fK"
  // nama_pengguna: "ORANG 1234"
  // peranan: "Orang"


  onUserRowSelect(event) {
    this.selected = true;
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].inventori_pengguna_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
    // console.log(this.listOfIds);
    // console.log(this.listOfIds.length);
    // console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
  }

  deleteSelected() {
    let authorization = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: authorization,
      }),
      body: {
        id_pengguna_list: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    this.spinner.show();
    // console.log(options);
    this.http
      .delete(
        environment.basePublicUrl + "/dbkl/deleteInventoriPengguna",
        options
      )
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.spinner.hide();
        this.anncdata = s["message"];

        if (this.anncdata == "inventori_pengguna_deleted") {

          if (this.lang == "en") {

            this.dsucessmsg = "Inventroi Pengguna list deleted Successfully!";
          }
          else {
            this.dsucessmsg = "Senarai pengguna Inventroi berjaya dihapuskan!";
          }
        }
        this.deletemodal();
      },
        (error) => {
          this.anncdata = error["message"];
          //  console.log(error)
          this.errordeletemodal();
          if (this.anncdata == "inventori_pengguna_not_deleted") {

            if (this.lang == "en") {

              this.derrmsg = "Inventroi Pengguna  list could not be updated! Please refer console logs for further details.";
            }
            else {
              this.derrmsg = "Senarai Pengguna Inventroi tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }

        });

  }


  addUser() {
    if ((this.name == undefined) || (this.name.trim() == "")) {
      return this.c1 = true;
    }
    if ((this.username == undefined) || (this.username.trim() == "")) {
      this.c1 = false;
      return this.c2 = true;
    }
    if ((this.email == undefined) || (this.email.trim() == "")) {
      this.c2 = false;
      return this.c3 = true;
    }
    if ((this.password == undefined) || (this.password.trim() == "")) {
      this.c3 = false;
      return this.c4 = true;
    }

    this.c1 = false;
    this.c2 = false;
    this.c3 = false;
    this.c4 = false;

    this.spinner.show();
    let key = localStorage.getItem("dbkl_access_token");
    this.closeUserModal();
    let body = {
      name: this.name,
      nama_pengguna: this.username1,
      email: this.email,
      password: this.password
    }


    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    //console.log(body);

    this.http
      .post(environment.basePublicUrl + "/dbkl/adminUserAdd", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log(res);

          this.spinner.hide();

          if (res['message'] == 'user_added') {
            if (this.lang == "en") {

              this.dsucessmsg = "User Added Successfully!";
            }
            else {
              this.dsucessmsg = "Pengguna Berjaya Ditambahkan !";
            }
          }
          this.deletemodal();
          //  window.location.reload();

        },
        (error) => {

          this.spinner.hide();
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];



        });



  }

  deleteChecked() {
    if (this.selected == true) {
      this.deleteSelected();
    }
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  onCustomEvent(event) {
    switch (event.action) {
      case "routeToUpdateApplicationForm":
        // console.log(event.data);
        this.keyValue = event.data;
        this.router.navigateByUrl(
          "dbkl/edituserinventory?id=" + this.keyValue.id_pengguna
        );
        break;
    }
  }

  backtotop() {
    window.scroll(0, 0);
  }
  openModal() {
    this.display = "block";
  }
  closeModal() {
    this.display = "none";

  }

  openModalDelete() {
    if (this.listOfIds == undefined) {
      this.openmodal3();
      return;
    }
    else if (this.IdsArray.length == 0) {
      this.openmodal3();
      return;
    }
    this.display2 = "block";
  }
  closeModalDelete() {
    this.display2 = "none";
  }
  openmodal3() {
    this.display3 = "block"
  }
  closemodal3() {
    this.display3 = "none"
  }


  settings1 = {
    // selectMode: "multi",
    actions: false,
    // actions: {
    //   position: 'right',
    //   edit: false,
    //   add: false,
    //   new: false,
    //   delete:false,
    //   custom: [{ name: 'edit', title: '<i class="fa fa-edit"></i>' }],
    // },
    columns: {
      id_pengguna: {
        title: "ID Pengguna",
      },
      tarikh: {
        title: "Tarikh",
      },
      role: {
        title: "Peranan",
      },
      aktiviti: {
        title: "Aktiviti",
      },
    },
  };
  radioChanged(e) {
    if (this.user_role == "superadmin" ||
      this.user_role == "Pentadbir"
    ) {
      this.is1st = true;
      this.is2nd = false;
    } else {
      $("#inlineRadio2").attr("disabled", true);
      $("#inlineRadio1").attr("disabled", true);
    }
  }
  radioChanged1(e) {
    if (this.user_role == "superadmin" || this.user_role == "Pentadbir") {
      this.is1st = false;
      this.is2nd = true;
    } else {
      $("#inlineRadio2").attr("disabled", true);
      $("#inlineRadio1").attr("disabled", true);
    }
  }
  deletemodal() {
    this.display6 = "block";
  }
  errordeletemodal() {
    this.errorDisplay1 = "block";
  }
  onCloseSuccessModal1() {
    window.location.reload();
  }
  closeErrorModal1() {
    this.errorDisplay1 = "none";
  }

  onCloseSuccessModal() {
    this.display5 = "none";
    window.location.reload();
  }
  openSuccessModal() {
    this.display5 = "block";
  }

  closeUserModal() {
    this.display5 = "none";
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
