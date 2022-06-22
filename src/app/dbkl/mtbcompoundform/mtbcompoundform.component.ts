import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-mtbcompoundform",
  templateUrl: "./mtbcompoundform.component.html",
  styleUrls: ["./mtbcompoundform.component.css"],
})
export class MtbcompoundformComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;

  no_notis_bas: any;
  lokasi_kompaun: any;
  parlimen: any;
  id_mtb: any;
  alamat: any;
  company_no: any;
  kepada: any;
  checkboxGroup: FormGroup;
  address1: any;
  address2: any;
  address3: any;
  butir_butir_kesalahan: any;
  tarikh: any;
  waktu: any;
  tempat: any;
  Error1: any;
  Error2: any;
  Error3: any;
  undang_kecil_permungutan: boolean = false;
  undang_pelesenan_penjaja: boolean = false;
  akta_jalan: boolean = false;
  undang_kecil_larangan_meludah: boolean = false;
  undang_kecil_pelesenan: boolean = false;
  submitted: boolean;
  display: string;
  router: any;
  display1: string;
  locations: Object;
  loginError: boolean;
  errorMsg: any;
  selectedParlimen: any;
  Parliament: any;
  IdPegawai: Object;
  lang: string;
  anncdata: any;
  sucessmsg: string;
  errssmsg: string;
  addSeksyen: any;
  is1st: boolean;
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

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.userrole = localStorage.getItem("roleforuser");
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.lang = localStorage.getItem("lang");
    let key = localStorage.getItem("dbkl_access_token");
    localStorage.setItem("path", "/dbkl/mtbcompoundform");
    
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.basePublicUrl + "/dbkl/getIdPegawai", { headers: headers })
      .subscribe(
        (res) => {
          this.IdPegawai = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );

    this.checkboxGroup = new FormGroup({
      no_notis_bas: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{4,10}$"),
      ]),
      kepada: new FormControl("", [Validators.required]),
      company_no: new FormControl("", [Validators.required]),
      alamat: new FormControl("", [Validators.required]),
      id_mtb: new FormControl("", [Validators.required]),
      parlimen: new FormControl("", [Validators.required]),
      // lokasi_kompaun: new FormControl("", [Validators.required]),
      butir_butir_kesalahan: new FormControl("", [Validators.required]),
      tarikh: new FormControl("", [Validators.required]),
      waktu: new FormControl("", [Validators.required]),
      tempat: new FormControl("", [Validators.required]),
    });
    this.is1st = false;
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


  addbutton(){
    this.is1st = true;
  }

  get f() {
    return this.checkboxGroup.controls;
  }

  compoundsubmit() {
    this.submitted = true;
    // console.log("my response");
    if (this.checkboxGroup.invalid) {
      return;
    }
    this.spinner.show();
    this.alamat = this.address1;
    this.butir_butir_kesalahan = this.Error1;

    let body = {
      no_notis_bas: this.no_notis_bas,
      kepada: this.kepada,
      company_no: this.company_no,
      alamat: this.alamat,
      id_mtb: this.id_mtb,
      parlimen: this.parlimen,
      // lokasi_kompaun: this.lokasi_kompaun,
      sek47_1a: this.sek47_1a,
      sek47_1c: this.sek47_1c,
      sek47_1d: this.sek47_1d,
      sek47_1e: this.sek47_1e,
      sek47_1g: this.sek47_1g,
      sek47_2a: this.sek47_2a,
      sek47_2b: this.sek47_2b,
      uuk8: this.uuk8,
      uuk9: this.uuk9,
      uuk3: this.uuk3,
      sek46_1b: this.sek46_1b,
      sek46_1c: this.sek46_1c,
      sek46_1d: this.sek46_1d,
      sek46_1e: this.sek46_1e,
      sek46_1f: this.sek46_1f,
      sek46_1g: this.sek46_1g,
      uuk5_a: this.uuk5_a,
      uuk5_b: this.uuk5_b,
      uuk5_c: this.uuk5_c,
      uuk33:this.uuk33,
      uuk34:this.uuk34,
      uuk35: this.uuk35,
      butir_butir_kesalahan: this.butir_butir_kesalahan,
      tarikh: this.tarikh,
      waktu: this.waktu,
      tempat: this.tempat,
      addSeksyen:'',
    };
    // console.log("body", body);

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("dbkl_access_token"),
    };

    this.http
      .post(environment.basePublicUrl + "/dbkl/addMTBCompoundForm", body, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.anncdata=data["message"] ;
         // console.log(this.anncdata);
          if (this.anncdata == "compound_form_added") {
    
            if (this.lang == "en") {
  
              this.sucessmsg = "Compound Form added successfully!";
            }
            else {
              this.sucessmsg = "Borang Kompaun berjaya ditambahkan!";
            }
          this.openModal();
            }  // console.log(data);
        },
        (error) => {
          this.spinner.hide();
          this.anncdata=error["message"] ;
          
          if (this.anncdata == "compound_form_not_added") {
    
            if (this.lang == "en") {
  
              this.errssmsg = "Compound Form could not be added! Please refer console logs for further details.";
            }
            else {
              this.errssmsg = "Borang Kompaun tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          this.openModal1();
        }
      }
      );
  }

  backtotop() {
    window.scroll(0, 0);
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    window.location.reload();
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    
  }
  selectChangeHandler(event: any) {
    this.selectedParlimen = event.target.value;
    this.Parliament = this.selectedParlimen;
    this.spinner.show();

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.basePublicUrl + "/dbkl/getLokasi/" + this.Parliament, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.locations = res;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
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
          // console.log("error is", error["error"]);
        }
      );
  }

}
