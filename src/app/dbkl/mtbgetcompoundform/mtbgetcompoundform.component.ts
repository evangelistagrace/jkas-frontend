import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-mtbgetcompoundform",
  templateUrl: "./mtbgetcompoundform.component.html",
  styleUrls: ["./mtbgetcompoundform.component.css"],
})
export class MtbgetcompoundformComponent implements OnInit {
  undang_pelesenan_penjaja: boolean = false;
  undang_kecil_permungutan: boolean = false;
  akta_jalan: boolean = false;
  undang_kecil_pelesenan: boolean = false;
  undang_kecil_larangan_meludah: boolean = false;
  errorMsg: any;
  loginError: boolean;
  data: any;
  basePublicUrl = environment.basePublicUrl;
  no_notis_bas: string;
  butir_butir_kesalahan: string;
  id_mtb: string;
  company_no: string;
  lokasi_kompaun: string;
  kepada: string;
  parlimen: string;
  tempat: string;
  waktu: string;
  tarikh: string;
  alamat: any;
  compounddata: Object;
  date: string;
  date1: string;
  id_mtb1: string;
  parlimen1: string;
  display: string;
  display1: string;
  uuk35: boolean = false;
  uuk34: boolean = false;
  uuk33: boolean = false;
  sek47_1a: boolean = false;
  sek47_1c: boolean = false;
  sek47_1d:boolean = false;
  sek47_1e: boolean = false;
  sek47_1g: boolean = false;
  sek47_2b: boolean = false;
  sek47_2a: boolean = false;
  uuk8: boolean = false;
  uuk9: boolean = false;
  uuk3: boolean = false;
  uuk5_c: boolean = false;
  uuk5_b: boolean = false;
  uuk5_a:boolean = false;
  sek46_1g: boolean = false;
  sek46_1f: boolean = false;
  sek46_1e: boolean = false;
  sek46_1d: boolean = false;
  sek46_1c: boolean = false;
  sek46_1b: boolean = false;
  isAdminType: string;
  username: string;
  userrole: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    this.spinner.show();
    this.no_notis_bas = this.route.snapshot.queryParamMap.get("value4");
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id_mtb1 = this.route.snapshot.queryParamMap.get("value2");
    this.parlimen1 = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/mtbgetcompoundform?value=" +
        this.date +
        "&value2=" +
        this.id_mtb1 +
        "&value3=" +
        this.parlimen1 +
        "&value4=" +
        this.no_notis_bas
    );
    let key = localStorage.getItem("AccessToken");
    let header = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {};
    this.http
      .post(
        this.basePublicUrl + "/dbkl/getCompoundForm/" + this.no_notis_bas,
        body,
        { headers: header }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res[0];
          this.compounddata = res;
        //  console.log(this.data);


          this.alamat = this.data.alamat;
          // console.log(this.alamat);
          this.butir_butir_kesalahan = this.data.butir_butir_kesalahan;
          this.company_no = this.data.company_no;
          this.id_mtb = this.data.id_mtb;
          this.kepada = this.data.kepada;
          this.lokasi_kompaun = this.data.lokasi_kompaun;
          this.no_notis_bas = this.data.no_notis_bas;
          this.parlimen = this.data.parlimen;
          this.tarikh = this.data.tarikh;
          this.tempat = this.data.tempat;
          this.waktu = this.data.waktu;
          this.sek47_1a= this.sek47_1a;
          this.sek47_1c= this.sek47_1c;
          this.sek47_1d=this.sek47_1d;
          this.sek47_1e= this.sek47_1e;
          this.sek47_1g= this.sek47_1g;
          this.sek47_2a= this.sek47_2a;
          this.sek47_2b= this.sek47_2b;
          this.uuk8= this.uuk8;
          this.uuk9= this.uuk9;
          this.uuk3= this.uuk3;
          this.sek46_1b=this.sek46_1b,
          this.sek46_1c= this.sek46_1c,
          this.sek46_1d= this.sek46_1d,
          this.sek46_1e= this.sek46_1e,
          this.sek46_1f= this.sek46_1f,
          this.sek46_1g= this.sek46_1g,
          this.uuk5_a= this.uuk5_a,
          this.uuk5_b= this.uuk5_b,
          this.uuk5_c=this.uuk5_c,
          this.uuk33=this.uuk33,
          this.uuk34=this.uuk34,
          this.uuk35= this.uuk35
        },
        (error) => {
          this.loginError = true;
          // console.log(error);
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  
  public onSaveUsernameChanged1(value: boolean) {
    this.sek47_1a = value;
  }
  public onSaveUsernameChanged2(value: boolean) {
    this.sek47_1c = value;
  }
  public onSaveUsernameChanged3(value: boolean) {
    this.sek47_1d = value;
  }
  public onSaveUsernameChanged4(value: boolean) {
    this.sek47_1e = value;
  }
  public onSaveUsernameChanged5(value: boolean) {
    this.sek47_1g = value;
  }
  public onSaveUsernameChanged6(value: boolean) {
    this.sek47_2a = value;
  }
  public onSaveUsernameChanged7(value: boolean) {
    this.sek47_2b = value;
  }
  public onSaveUsernameChanged8(value: boolean) {
    this.uuk8 = value;
  }
  public onSaveUsernameChanged9(value: boolean) {
    this.uuk9 = value;
  }
  public onSaveUsernameChanged10(value: boolean) {
    this.uuk3 = value;
  }
  public onSaveUsernameChanged11(value: boolean) {
    this.sek46_1b = value;
  }
  public onSaveUsernameChanged12(value: boolean) {
    this.sek46_1c = value;
  }
  public onSaveUsernameChanged13(value: boolean) {
    this.sek46_1d = value;
  }
  public onSaveUsernameChanged14(value: boolean) {
    this.sek46_1e = value;
  }
  public onSaveUsernameChanged15(value: boolean) {
    this.sek46_1f = value;
  }
  public onSaveUsernameChanged16(value: boolean) {
    this.sek46_1g = value;
  }
  public onSaveUsernameChanged17(value: boolean) {
    this.uuk5_a = value;
  }
  public onSaveUsernameChanged18(value: boolean) {
    this.uuk5_b = value;
  }
  public onSaveUsernameChanged19(value: boolean) {
    this.uuk5_c = value;
  }
  public onSaveUsernameChanged20(value: boolean) {
    this.uuk33 = value;
  }
  public onSaveUsernameChanged21(value: boolean) {
    this.uuk34 = value;
  }
  public onSaveUsernameChanged22(value: boolean) {
    this.uuk35 = value;
  }

  displaySuccess:string = 'none';
  closeSuccessModal() {
    this.displaySuccess = 'none';
  }
  submitUpdate() {
    //alert('Kompaun berjaya dikemaskini.');
    this.displaySuccess = 'block';
  }

  backtotop() {
    window.scroll(0, 0);
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    // this.router.navigateByUrl("dbkl/claim-review");
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    // this.router.navigateByUrl("dbkl/dbklmainpage");
  }
  logout(){
    localStorage.removeItem("dbkl_access_token");
    localStorage.setItem("isdbkl", "false");
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    // console.log(key);
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + key,
    };
    let body = {};

    this.http
      .post(this. basePublicUrl+ "/dbkl/logout", body, { headers: header })
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
          // console.log("error is", error["error"]);
        }
      );
  }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
