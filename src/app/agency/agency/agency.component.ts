import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-agency",
  templateUrl: "./agency.component.html",
  styleUrls: ["./agency.component.css"],
})
export class AgencyComponent implements OnInit {
  npId;
  agencyGroup: any;
  isError: boolean;
  npError: boolean;
  npErrorMessage: any;
  data1: any = "";
  data2: any = "";
  dataarry: any;
  display = "none";
  validation_messages = {
    npId: [{ type: "required", message: "NP ID is required" }],
  };
  isError1: boolean;
  baseUrl = environment.basePublicUrl;
  isnew: boolean;
  kontraktor: any = [];
  selecteditem: any;
  submitted1: boolean;
  showSpinner: any;
  accesstoken: string;
  lang: string;
  agencyvalidator: FormGroup;
  submitted: boolean;
  errormsg: string;
  isError2: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit(): void {
    this.lang = localStorage.getItem("lang");
    console.log(this.lang);
    
    localStorage.setItem("path", "agency");

    if (
      localStorage.getItem("isAgency") == "true" &&
      localStorage.getItem("npid") != ""
    ) {
      this.router.navigateByUrl("/agency/job-feedback");
    }

    this.accesstoken = localStorage.getItem("egency_token");
    this.showSpinner = true;
    let headers = {
      accept: "application/json",
    };
    this.http
      .get(environment.basePublicUrl + "/agensi/getContractorList", {
        headers: headers,
      })
      .subscribe((data) => {
        // console.log(data);
        this.kontraktor = data;
        this.showSpinner = false;
      });
    window.scroll(0, 0);
    this.isnew = false;
    this.agencyvalidator = new FormGroup({
      kontract: new FormControl("", [Validators.required]),
      noinvoice: new FormControl("", [Validators.required]),
    });
    this.agencyGroup = new FormGroup({
      npId: new FormControl("", [Validators.required]),
    });

    const signInBtn1 = document.getElementById("signInn");
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const signUpBtn2 = document.getElementById("signUpp");
    const container = document.querySelector(".container1");
    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      // console.log("hi")
    });
    signInBtn1.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      // console.log("hi")
    });
    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
    signUpBtn2.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
  }
  get f1() {
    return this.agencyGroup.controls;
  }
  login() {
    this.submitted1 = true;
    if (this.agencyGroup.invalid) {
      return;
    }

    this.spinner.show();
    localStorage.setItem("npid", this.npId.toUpperCase());
    this.http
      .get(this.baseUrl + "/agensi/getAgensi/" + this.npId.toUpperCase())
      .subscribe(
        (res) => {
          localStorage.setItem("isUser", "agensi");
          if (res) {
            // console.log(res);
            this.spinner.hide();
            this.npErrorMessage = "";
            localStorage.setItem("egency_token", res[0].access_token);
            localStorage.setItem("serielno", res[0].no_kad_pengenalan);
            localStorage.setItem("parlimen", res[0].parlimen);
            localStorage.setItem("lokasi", res[0].lokasi);
            localStorage.setItem("name", res[0].nama_pegawai_merinyu);
            localStorage.setItem("status", res[0].status_tindakan);
            // console.log("response found",res);
            localStorage.setItem("agencyDetails", JSON.stringify(res));
            localStorage.setItem("isAgency", "true");
            this.router.navigateByUrl("/agency/job-feedback");
            localStorage.setItem("ifagain", "true");
          } else {
            this.isError = true;
          }
        },



        (error) => {
          //console.log(".....", error['error']['message']);
          this.npError = true;
          this.npErrorMessage = error["error"]["message"];


          this.spinner.hide();

          if (this.npErrorMessage == "invalid_agency_id") {

            if (this.lang == "en") {

              this.npErrorMessage = "Agensi id invalid!";
            }
            else {
              this.npErrorMessage = "Agensi id tidak sah!";
            }
          }
        }
      );
  }


  get f2() {
    return this.agencyvalidator.controls;
  }
  createInvoice() {
    this.submitted = true;
    if (this.agencyvalidator.invalid) {
      return;
    }
    this.spinner.show();
    this.accesstoken = localStorage.getItem("egency_token");
    localStorage.setItem("data1", this.selecteditem);
    localStorage.setItem("data2", this.data2);

    this.http
      .post(this.baseUrl + "/agensi/getInvoice", {
        invoice_no: this.data2,
        contractor: this.selecteditem,
      })
      .subscribe(
        (data) => {
          localStorage.setItem('islogin', 'true');
          this.dataarry = JSON.stringify(data);
          localStorage.setItem("invoicedata", this.dataarry);

          this.router.navigateByUrl("/agency/updateinvoice");

          this.spinner.hide();
          this.openModal();

        },

        (error) => {
          this.spinner.hide();
          this.openModal();
          this.isError2 = error["error"]["message"];
          if (this.isError2 == "invalid_invoice_id") {
            if (this.lang == "en") {
              this.errormsg = "Invoice id invalid!";
            }
            else {
              this.errormsg = "Id invois tidak sah!";
            }
          }

        }
      );
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  backtotop() {
    window.scroll(0, 0);
  }
  getKontraktors(e) {
    this.selecteditem = e.target.value;
    // console.log(this.selecteditem);
  }

 
}
