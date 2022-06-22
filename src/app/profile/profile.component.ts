import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import * as $ from "jquery";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { agencyProfile } from "../table/agencyProfile";
import { dbklProfile } from "../table/dbklProfile";
import { Profile } from "../table/profile";
import { TableService } from "../table/table.service";
import { MustMatch } from "./helper";

@Component({
 
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  baseUrl = environment.basePublicUrl;
  accessToken: string;
  confPass:any
  submitted3:boolean;
  
  user_id: any;
  user_role: any;
  email: any;
  profiles: any = [];
  show: boolean;
  errorDisplay: string;
  display1: string;
  public_access_token: string;
  agensi_access_token: string;
  dbkl_access_token: string;
  password1:any;
  
  basePublicUrl = environment.basePublicUrl;
  agensi_id_card_no: string;
  agensi_role: string;
  dbkl_id_card_no: string;
  dbkl_role: string;
  dbkl_email: string;
  isUser: string;

  newPassword1: any;
  confirmPassword1: any;
  resetPasswordGroup: FormGroup;

  notMatched: boolean = false;
  submitted = false;
  display: string;
  username: string;
  npid: string;
  dbkl_username: string;
  id_card_no: string;
  nama_pengguna: any;
  publicsignupGroup: FormGroup;
  password: any;
  lang: string;
  errorMsg: string;
  loginError1: boolean;
  loginError: boolean;
  chek: boolean;
  msg: string;
  passWord: any;
  regPassError: boolean;
  regMailError: boolean;
  id_card: any;
  regIdError: boolean;
  userError: boolean;
  usernamee: any;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private tservice: TableService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.password != this.password1) {
      this.notMatched = true;
    } else {
      this.notMatched = false;
    }
  }

  ngOnInit() {
    $(document).ready(function () {
      $("body").on('click', '.toggle-password-1', function () {
          $(this).toggleClass("icofont-eye-blocked icofont-eye");
          var input = $('#txtPassowrdPublic');
          if (input.attr("type") === "password") {
              input.attr("type", "text");
          } else {
              input.attr("type", "password");
          }

      });

      $("body").on('click', '.toggle-password-2', function () {
          $(this).toggleClass("icofont-eye-blocked icofont-eye");
          var input = $('#txtPasswordInternal');
          if (input.attr("type") === "password") {
              input.attr("type", "text");
          } else {
              input.attr("type", "password");
          }

      });

      $("body").on('click', '.toggle-password-3', function () {
        $(this).toggleClass("icofont-eye-blocked icofont-eye");
        var input = $('#txtPasswordLogin');
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }

    });

      $(function () {
          $('body').removeClass('fade-out');
      });

  });
    this.accessToken = localStorage.getItem("AccessToken");
    this.publicsignupGroup = new FormGroup({
      username: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9]{4,32}$"),
      ]),
      id_card: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"
        ),
      ]),
      passWord: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
        ),
      ]),
      confPass: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
        ),
      ]),
    });

    // let headers = {
    //   accept: "application/json",
    //   Authorization: this.public_access_token,
    // };
    // this.show = true;
    // this.http
    //   .get(this.baseUrl + "/public/getPublicUSerInfo", {
    //     headers: headers,
    //   })
    //   .subscribe(
    //     (res) => {
    //       this.username=res[0].username;
    //       this.id_card_no=res[0].id_card_no;
    //       this.email = res[0].email;
    //       this.password= res[0].password;
    //     },
    //     (error) => {
    //       this.openErrorModal();
    //     }
    //   );
    localStorage.setItem("path", "/profileLog");
    this.resetPasswordGroup = this.formBuilder.group(
      {
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("newPassword", "confirmPassword"),
      }
    );

    // this.resetPasswordGroup = new FormGroup({
    //   newPassword: new FormControl("", [
    //     Validators.required,
    //     Validators.pattern("^[a-zA-Z][a-zA-Z0-9@#$%^&*]{7,32}$"),
    //   ]),
    //   confirmPassword:  ["",
    //     Validators.required,
    //     Validators.pattern("^[a-zA-Z][a-zA-Z0-9@#$%^&*]{7,32}$"),
    //   ]),
    //   {
    //         validator: MustMatch('password', 'confirmPassword')
    //     }
    // });

    this.public_access_token = localStorage.getItem("public_access_token");
    this.agensi_access_token = localStorage.getItem("egency_token");
    this.dbkl_access_token = localStorage.getItem("dbkl_access_token");
    this.isUser = localStorage.getItem("isUser");
    this.username = localStorage.getItem("nama_pengguna");
    this.usernamee = localStorage.getItem("nama_pengguna");
    this.npid = localStorage.getItem("npid");
    this.dbkl_username = localStorage.getItem("nama_pengguna");
    if (this.isUser == "public") {
      let headers = {
        accept: "application/json",
        Authorization: this.public_access_token,
      };
      this.spinner.show();
      this.show = true;
      this.http
        .get(this.baseUrl + "/public/getProfileInformation", {
          headers: headers,
        })
        .subscribe(
          (res) => {
            localStorage.setItem("user_id", res[0].id_card_no);
            localStorage.setItem("user_role", res[0].role);
            localStorage.setItem("email", res[0].email);
            this.user_id = localStorage.getItem("user_id");
            this.user_role = localStorage.getItem("user_role");
            this.email = localStorage.getItem("email");
            this.password=res[0].password;
            this.password1=res[0].password;
          //  console.log(res);
         //   console.log(this.password);
          },
          (error) => {
            this.spinner.hide();
            this.openErrorModal();
          }
        );
      this.spinner.hide();
      this.tservice.getProfile().subscribe((data: Profile[]) => {
        this.profiles = data;
        this.show = false;
        this.spinner.hide();
      });
    } else if (this.isUser == "agensi") {
      let headers = {
        accept: "application/json",
        Authorization: this.agensi_access_token,
      };
      this.show = true;
      this.spinner.show();
      this.http
        .get(this.baseUrl + "/agensi/getProfileInformation", {
          headers: headers,
        })
        .subscribe(
          (res) => {
            localStorage.setItem("agensi_id_card_no", res[0].id_card_no);
            localStorage.setItem("agensi_role", res[0].role);
            this.user_id = localStorage.getItem("agensi_id_card_no");
            this.user_role = localStorage.getItem("agensi_role");
        //    console.log(res);
            
          },
          (error) => {
            this.spinner.hide();
            this.openErrorModal();
          }
        );
      this.spinner.hide();
      this.tservice.getAgencyProfile().subscribe((data: agencyProfile[]) => {
        this.profiles = data;
        this.show = false;
        this.spinner.hide();
      });
    } else {
      let headers = {
        accept: "application/json",
        Authorization: this.dbkl_access_token,
      };
      this.spinner.show(); 
      this.show = true;
      this.http
        .get(this.baseUrl + "/dbkl/getProfileInformation", {
          headers: headers,
        })
        .subscribe(
          (res) => {
            localStorage.setItem("dbkl_id_card_no", res[0].id_card_no);
            localStorage.setItem("dbkl_role", res[0].role);
            localStorage.setItem("dbkl_email", res[0].email);
            localStorage.setItem("parlimen", res[0].parlimen);
            this.user_id = localStorage.getItem("dbkl_id_card_no");
            this.user_role = localStorage.getItem("dbkl_role");
            this.email = localStorage.getItem("dbkl_email");
            this.nama_pengguna = res[0].id_card_no;
         //   console.log("hyyyyyyy",res);
            
          },
          (error) => {
            this.spinner.hide();
            this.openErrorModal();
          }
        );

      this.spinner.hide();
      this.tservice.getdbklProfile().subscribe((data: dbklProfile[]) => {
        this.profiles = data;
        this.show = false;
        this.spinner.hide();
      });
    }
  }

  settings = {
    actions: false,
    custom: [
      {
        name: "",
        type: "html",
        title: '<i class="fa fa-edit custom-font"></i>',
      },
    ],
    columns: {
      time: {
        title: "Masa",
      },

      action: {
        title: "Tindakan",
      },
    },
  };
  get f() {
    return this.resetPasswordGroup.controls;
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  getPassword() {
    if (this.passWord) {
      this.regPassError = false;
      document.getElementById("form_password").style.borderBottomColor = "#bfbfbf";
    }
  }
  getEmail() {
    if (this.email) {
      this.regMailError = false;
      document.getElementById("form_email").style.borderBottomColor = "#bfbfbf";
    }
  }
  getUsername() {
    // console.log(this.username);

    if (this.publicsignupGroup.get("username")) {
      this.userError = false;
      document.getElementById("form_user").style.borderBottomColor = "#bfbfbf";
    }
  }

  getIdCard() {
    if (this.id_card) {
      this.regIdError = false;
      document.getElementById("id_card_no").style.borderBottomColor = "#bfbfbf";
    }
  }

  // Check password
  check() {
    this.loginError = false


    if (this.passWord != this.confPass) {
      this.chek = true;
      this.msg = "Password doesn't match"
    } else {
      this.chek = false;
    }
  }
  closeErrorModal() {
    if (this.isUser == "public") {
      this.errorDisplay = "none";
      this.router.navigateByUrl("/publicLogin");
      localStorage.clear();
    } else if (this.isUser == "agensi") {
      this.errorDisplay = "none";
      this.router.navigateByUrl("/agency");
      localStorage.clear();
    } else {
      this.errorDisplay = "none";
      this.router.navigateByUrl("/dbkl/adminregister");
      localStorage.clear();
    }
  }
  backtotop() {
    window.scroll(0, 0);
  }

  resetPassword() {
    if (this.isUser == "public") {
      this.spinner.show();
      let header = {
        accept: "application/json",
        Authorization: this.public_access_token,
      };
      let body = {
        new_password: this.confirmPassword1,
      };
      this.http
        .post(this.baseUrl + "/public/changePassword", body, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.openSuccessModal();
          },
          (error) => {
            this.spinner.hide();
            this.openErrorModal();
          }
        );
    } else if (this.isUser == "dbkl") {
      this.spinner.show();
      let header = {
        accept: "application/json",
        Authorization: this.dbkl_access_token,
      };
      let body = {
        new_password: this.confirmPassword1,
      };
      this.http
        .post(this.baseUrl + "/dbkl/changePassword", body, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.openSuccessModal();
          },
          (error) => {
            this.spinner.hide();
            this.openErrorModal();
          }
        );
    }
  }
  logout() {
    this.spinner.show();
    if (this.isUser == "public") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.public_access_token,
      };

      let body = {};
      this.http
        .post(this.baseUrl + "/public/logout", body, { headers: header })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/publicLogin");
            localStorage.clear();
            this.spinner.hide();
          },
          (error) => {
            this.openErrorModal();
          }
        );
    } else if (this.isUser == "dbkl") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.dbkl_access_token,
      };

      let body = {};
      this.http
        .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/dbkl/adminregister");
            localStorage.clear();
            this.spinner.hide();
          },
          (error) => {
            this.openErrorModal();
          }
        );
    } else if (this.isUser == "agensi") {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + this.agensi_access_token,
      };
      let body = {};
      this.http
        .post(environment.basePublicUrl + "/agensi/logout", body, {
          headers: header,
        })
        .subscribe(
          (res) => {
            this.router.navigateByUrl("/agency");
            localStorage.clear();
            this.spinner.hide();
          },
          (error) => {
            this.openErrorModal();
          }
        );
    }
  }
  openResetPassword() {
    if (this.isUser == "public") {
      this.display1 = "block";
    } else if (this.isUser == "dbkl") {
      this.display1 = "block";
    }
  }
  closeResetPassword() {
    this.submitted = true;
    if (this.resetPasswordGroup.invalid) {
      return;
    }
    if (this.isUser == "public") {
      this.display1 = "none";
      this.resetPassword();
      // this.router.navigateByUrl("/publicLogin");
      // localStorage.clear();
    } else if (this.isUser == "dbkl") {
      this.display1 = "none";
      this.resetPassword();
      // this.router.navigateByUrl("/dbkl/adminregister");
      // localStorage.clear();
    }
  }
  closeResetPasswordModal() {
    this.display1 = "none";
  }
  openSuccessModal() {
    this.display = "block";
  }
  closeSuccessModal() {
    this.display = "none";
    if (this.isUser == "public") {
      // this.router.navigateByUrl("");
    } else if (this.isUser == "dbkl") {
      // this.router.navigateByUrl("");
    }
  }
  get f3() {
    return this.publicsignupGroup.controls;
  }
  signupUpdate() {
      let headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: this.accessToken,
      };

        let body = {
          username: this.usernamee,
          email: this.email,
          password: this.password,
        };
        console.log(body);
        
    

        this.http
          .post(this.basePublicUrl + "/public/updatePublicUserInfo", body, {
            headers: headers,
          })
          .subscribe(
            (res) => {
             // console.log(res);
              window.location.reload();
            },
            (error) => {
              this.spinner.hide();
              this.loginError1 = true;
              this.errorMsg = error["error"]["message"];
             // console.log(this.errorMsg);
            }
          );

      }

}
