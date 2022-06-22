import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { CountdownComponent } from "ngx-countdown/countdown.component";
import * as $ from "jquery";

@Component({
  selector: "app-public-login",
  templateUrl: "./public-login.component.html",
  styleUrls: ["./public-login.component.css"],
})
export class PublicLoginComponent implements OnInit {
  @ViewChild("cd", { static: false }) private countdown: CountdownComponent;

  idCardNo;
  password;
  validation_messages = {
    idcardno: [{ type: "required", message: "Id card no is required!" }],
    password: [
      { type: "required", message: "Password is required!" },
      { type: "minlength", message: "Minimum 8 characters required" },
    ],
  };

  signupValidation = {
    username: [
      { type: "required", message: "Username is required" },
      { type: "pattern", message: "Invalid username" },
    ],
    id_card_no: [{ type: "required", message: "Id Card No is required" }],
    email: [
      { type: "required", message: "Email is required" },
      { type: "pattern", message: "Invalid email address" },
    ],
    passWord: [
      { type: "required", message: "Password is required" },
      { type: "minlength", message: "Minimum 8 characters required" },
    ],
    confPass: [{ type: "requirted", message: "This field is required" }],
  };

  publicLoginGroup;
  publicsignupGroup;
  otpGroup;
  forgotGroup;
  basePublicUrl = environment.basePublicUrl;
  accessToken: string;
  loginError: boolean;
  errorMsg: any;
  forgotEmail: any;
  forgotId: any;

  username: any;
  id_card: any;
  email: any;
  passWord: any;
  confPass: any;
  passWordError: boolean;
  otp: boolean = false;
  islogin: boolean = true;
  regError: boolean;
  regSuccess: boolean;
  regMessage: any;
  otpCode: any;
  otpsent: boolean;
  id_card_no: any;
  display: string;
  errorDisplay: string;
  errorMessage: any;
  forgotMessage: any;
  forgotDisplay: string;
  container;
  userErrorMessage: string;
  userError: boolean;
  regMailError: boolean;
  mailErrorMessage: string;
  regIdError: boolean;
  idErrorMessage: string;
  regPassError: boolean;
  PassErrorMessage: string;
  submitted: boolean;
  submitted1: boolean;
  submitted2: boolean;
  submitted3: boolean;
  keyvalue: any;
  error_count = 0;
  config: any;
  Message: string;
  chek: boolean;
  msg: string;
  lock_flag: boolean = false;
  loginError1: boolean;
  lang: string;
  split1: string;
  split: any;
  sucessmsg: string;
  errmsgg: string;
  sucmsg1: string;
  resetsucessmsg: any;
  otpsentmsg: any;
  sucessmsgotp: string;
  forgotMessage1: string;
  status: boolean;
  status1: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "publicLogin");
    window.scroll(0, 5);
    this.regPassError = false;
    this.publicLoginGroup = new FormGroup({
      idcardno: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
        ),
        Validators.minLength(8),
      ]),
    });

    $(function () {
      $('body').removeClass('fade-out');
    });

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    
    $(".toggle-password1").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    $(".toggle-password2").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    this.hideform();
    this.FhideForm();

    this.publicsignupGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
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

    this.otpGroup = new FormGroup({
      otp: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{6}$"),
      ]),
    });

    this.forgotGroup = new FormGroup({
      email: new FormControl("", [
        Validators.pattern(
          "^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"
        ),
      ]),
      forgotId: new FormControl("", [Validators.pattern("[A-za-z0-9]{6,}")]),
    });

    const forgotPassword = document.getElementById("fpassd");
    // const createAccount = document.getElementById("create_account");
    const signInBtn1 = document.getElementById("signInn");
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const signUpBtn2 = document.getElementById("signUpp");
    const fistForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    this.container = document.querySelector(".container1");

    forgotPassword.addEventListener("click", () => {
      this.container.classList.add("right-panel-active");
      this.LhideForm();
      this.fshowForm();
    });

    signInBtn.addEventListener("click", () => {
      this.showloginForm();
      this.container.classList.remove("right-panel-active");
    });

    signInBtn1.addEventListener("click", () => {
      this.container.classList.remove("right-panel-active");
    });

    signUpBtn.addEventListener("click", () => {
      this.container.classList.add("right-panel-active");
      this.FhideForm();
      this.LshowForm();
    });

    signUpBtn2.addEventListener("click", () => {
      this.container.classList.add("right-panel-active");
    });
  }

  hideform() {
    document.getElementById("otp_form").style.display = "none";
  }

  showform() {
    document.getElementById("otp_form").style.display = "flex";
  }

  hideloginForm() {
    document.getElementById("loginform").style.display = "none";
  }

  showloginForm() {
    document.getElementById("loginform").style.display = "flex";
  }

  FhideForm() {
    document.getElementById("forgot_password").style.display = "none";
  }

  fshowForm() {
    document.getElementById("forgot_password").style.display = "flex";
  }

  LhideForm() {
    document.getElementById("signing").style.display = "none";
  }

  LshowForm() {
    document.getElementById("signing").style.display = "flex";
  }
  get f() {
    return this.publicLoginGroup.controls;
  }
  login() {
    this.submitted = true;
    if (this.publicLoginGroup.invalid) {
      return;
    }
    this.spinner.show();
    // console.log("login called");
    let body = {
      id_card_no: this.idCardNo.toUpperCase(),
      password: this.password,
      lock_flag: this.lock_flag,
    };

   // console.log(body);

    let headers = {
      "Content-Type": "application/json",
    };

    this.http
      .post(this.basePublicUrl + "/public/login", body, { headers: headers })
      .subscribe(
        (res) => {
          localStorage.setItem("isUser", "public");
          if (res["status"] === "success") {
            this.spinner.hide();

            this.accessToken = res["access_token"];
            localStorage.setItem("AccessToken", this.accessToken);
            localStorage.setItem("username", res["user"]);
            localStorage.setItem("nama_pengguna", res["user"]);
            localStorage.setItem("public_access_token", this.accessToken);
            localStorage.setItem("ifagain", "true");
            this.router.navigateByUrl("/publicpage");
          }
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
          this.split = this.errorMsg.substring(15, this.errorMsg.lenght);
          this.split1 = this.errorMsg.substring(0, 14);

          if (this.errorMsg == "invalid_cred") {

            if (this.lang == "en") {

              this.errorMsg = "Invalid credentials! Please try again";
            }
            else {
              this.errorMsg = "ID Pengguna atau Kata Laluan tidak sah";
            }
          }

          else if (this.split1 == "account_locked") {

            if (this.lang == "en") {

              this.errorMsg = "Your account is locked! Please wait for another 130 seconds.";
            }
            else {
              this.errorMsg = "Akaun anda dikunci! Tunggu 130 saat lagi.";
            }
          }



          if (error["status"] == "401" || error["status"] == "403") {
            this.error_count = this.error_count + 1;
          }
          if (this.error_count == 3) {
            // document.getElementById("homeLogo").style.pointerEvents = "none";
            // document.getElementById("homeLink").style.pointerEvents = "none";
            // document.getElementById("loginLink").style.pointerEvents = "none";
            // document.getElementById("signupLink").style.pointerEvents = "none";
            // this.countdown.begin();
            // this.config = { leftTime: "180", demand: false, notify: false };
            // document.getElementById("overlay").style.display = "block";
            this.lock_flag = true
            this.error_count = this.error_count - 4;
            // setTimeout(() => {
            //   document.getElementById("overlay").style.display = "none";
            //   window.location.reload();
            // }, 180000);
          }
          else {
            this.lock_flag = false;
          }
        }
      );
  }

  get f3() {
    return this.publicsignupGroup.controls;
  }
  signup() {
    this.submitted3 = true;
    if (this.passWord == this.confPass) {
      this.PassErrorMessage = "";
      this.id_card_no = this.id_card;
      this.chek = false;

      let headers = {
        "Content-Type": "application/json",
        accept: "application/json",
      };

      if (this.publicsignupGroup.invalid) {
        for (let validation of this.signupValidation.username) {
          if (
            this.publicsignupGroup.get("username").hasError(validation.type)
          ) {

            // document.getElementById('form_user').setAttribute("placeholder",validation.message);
            document.getElementById("form_user").style.borderBottomColor =
              "red";
            this.userError = true;
            this.userErrorMessage = validation.message;
          }

        }

        for (let validation of this.signupValidation.email) {
          if (this.publicsignupGroup.get("email").hasError(validation.type)) {
            document.getElementById("form_email").style.borderBottomColor =
              "red";
            this.regMailError = true;
            this.mailErrorMessage = validation.message;
          }
        }

        for (let validation of this.signupValidation.id_card_no) {
          if (this.publicsignupGroup.get("id_card").hasError(validation.type)) {
            document.getElementById("id_card_no").style.borderBottomColor =
              "red";
            this.regIdError = true;
            this.idErrorMessage = validation.message;
          }
        }

        for (let validation of this.signupValidation.passWord) {
          if (
            this.publicsignupGroup.get("passWord").hasError(validation.type)
          ) {
            document.getElementById("form_password").style.borderBottomColor =
              "red";
            this.regPassError = true;
            this.chek = false;
            this.PassErrorMessage = validation.message;
          }
        }
      } else {
        this.spinner.show();
        localStorage.setItem("id", this.id_card.toUpperCase());
        localStorage.setItem("pass", this.passWord);
        let body = {
          name: this.username.toUpperCase(),
          id_card_no: this.id_card.toUpperCase(),
          email: this.email,
          password: this.passWord,
        };
      //  console.log("sign up data", body);
        document
          .getElementById("create_account")
          .setAttribute("data-toggle", "modal");
        document
          .getElementById("create_account")
          .setAttribute("data-target", "#myModal");
        // this.container.classList.remove("right-panel-active");

        this.http
          .post(this.basePublicUrl + "/public/triggerRegistration", body, {
            headers: headers,
          })
          .subscribe(
            (res) => {
              if (res["status"] == "success") {
                this.regSuccess = true;
                this.regMessage = res["message"];
                this.spinner.hide();
                this.publicsignupGroup.reset();
                this.container.classList.remove("right-panel-active");
                this.hideloginForm();
                this.showform();
              }
            },
            (error) => {
              this.spinner.hide();
              this.loginError1 = true;
              this.errorMsg = error["error"]["message"];
           //   console.log(this.errorMsg);
              if (this.errorMsg == "user_exists") {

                if (this.lang == "en") {

                  this.errorMsg = "Username taken already! Please try with another username.";
                }
                else {
                  this.errorMsg = "Nama pengguna sudah diambil! Sila cuba dengan nama pengguna lain.";
                }
              }
              else if (this.errorMsg == "email_exists") {

                if (this.lang == "en") {

                  this.errorMsg = "E-mail already exist! Please Try with another user.";
                }
                else {
                  this.errorMsg = "E-mel telah digunakan! Sila guna E-mel lain.";
                }
              }
            }
          );

      }
    } else {

      // this.regPassError = true;
      // this.PassErrorMessage = "Passwords do not match!";
      // this.regPassError = false;
      // this.PassErrorMessage = "Passwords  match!";
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
  // End

  // New Redirect to checklist after registration
  loginRedirect() {
    let id = localStorage.getItem("id");
    let passd = localStorage.getItem("pass");
    this.spinner.show();
    let body = {
      id_card_no: id,
      password: passd,
      lock_flag: true
    };
    let headers = {
      "Content-Type": "application/json",
    };
    localStorage.removeItem("id");
    localStorage.removeItem("pass");
    this.http
      .post(this.basePublicUrl + "/public/login", body, { headers: headers })
      .subscribe(
        (res) => {
          if (res["status"] === "success") {
            this.spinner.hide();
            this.router.navigateByUrl("/public/checklist");
            this.accessToken = res["access_token"];
            localStorage.setItem("AccessToken", this.accessToken);
            localStorage.setItem("nama_pengguna", res["user"]);
            localStorage.setItem("username", res["user"]);
          }
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  // End

  confirmPass() {
    this.passWordError = false;
    // console.log("confirm called");
    document.getElementById("form_password2").style.borderColor = "black";
    if (this.passWord != this.confPass) {
      document.getElementById("form_password2").style.borderBottomColor = "red";
      this.regPassError = true;

      this.PassErrorMessage = "Passwords do not match!";
    } else {
      this.regPassError = false;
      this.chek = false;
    }
  }
  get f1() {
    return this.forgotGroup.controls;
  }

  forgotPassword() {
    this.submitted1 = true;
    if (this.forgotGroup.invalid) {
      return;
    } else if (this.forgotId == undefined && this.forgotEmail == undefined) {
      this.forgotMessage = "Please enter idcard or email";
      return;
    } else if (this.forgotId != undefined && this.forgotEmail == undefined) {
      this.keyvalue = this.forgotId;
    } else if (this.forgotId == undefined && this.forgotEmail != undefined) {
      this.keyvalue = this.forgotEmail;
    } else if (this.forgotId == " " && this.forgotEmail == " ") {
      this.forgotMessage = "Please enter idcard or email";
      return;
    } else if (this.forgotId != undefined && this.forgotEmail != undefined) {
      this.keyvalue = this.forgotEmail;
    }

    this.spinner.show();

    let body = {
      id_card_no: this.keyvalue,
      lang: this.lang,

    };
    let headers = {
      "Content-Type": "application/json",
    };
    //console.log(body);


    this.http
      .post(this.basePublicUrl + "/public/forgotPassword", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
       //   console.log(res);
          if (res["status"] === "success") {
            this.forgotMessage = res["message"];
            this.openForgotModal();
            this.resetsucessmsg = res["status"] === "success";

            if (this.forgotMessage == "reset_pwd_mail_sent") {
              if (this.lang == "en") {
                this.sucmsg1 = "Reset password link sent successfully.";
              }
              else {
                this.sucmsg1 = "Tetapkan semula pautan kata laluan yang berjaya dihantar.";
              }
            }
          }
        },
        (error) => {
          this.forgotMessage1 = error["error"]["message"];

          // console.log(this.forgotMessage);

          this.spinner.hide();
          if (this.forgotMessage1 == "user_not_found") {
            this.status1 = true;
            this.forgotMessage = undefined;
            if (this.lang == "en") {
              this.errmsgg = "No such user exits!";
            }
            else {
              this.errmsgg = "Tidak ada pengguna yang keluar!";
            }
          }
          this.spinner.hide();
        }

      );
  }
  get f2() {
    return this.otpGroup.controls;
  }
  validateOTP() {
    this.submitted2 = true;
    if (this.otpGroup.invalid) {
      return;
    }
    this.spinner.show();
    let data = {
      otp: this.otpCode,
      id_card_no: this.id_card_no,
    };
    let headers = {
      "Content-Type": "application/json",
    };
    this.http
      .post(this.basePublicUrl + "/public/completeRegistration", data, {
        headers: headers,
      })



      .subscribe(
        (res) => {
          if (res["status"] == "success" && res["message"] == "user_added") {
            this.spinner.hide();
            this.openSuccessModal();

            this.otpsentmsg = res["status"] == "success";

            if (this.lang == "en") {
              this.sucessmsg = "User successfully registered!";
            }
            else {
              this.sucessmsg = "Pengguna berjaya didaftarkan!";
            }
          }
          //   else  if (this.otpsentmsg == "otp_sent") {

          //     if (this.lang == "en") {

          //       this.sucessmsgotp = "OTP sent successfully!";
          //     }
          //     else {
          //       this.sucessmsgotp = "OTP berjaya dihantar!";
          //     }




          // }
        },
        (error) => {
          this.errorMessage = error["error"]["message"];
          this.spinner.hide();
          this.openErrorModal();

          if (this.errorMessage == "otp_invalid") {

            if (this.lang == "en") {

              this.errorMsg = "OTP could not be validated.Please enter correct OTP.";
            }
            else {
              this.errorMsg = "OTP tidak dapat disahkan. Sila masukkan OTP yang betul.";
            }
          } else if (this.errorMessage == "user_not_added") {

            if (this.lang == "en") {

              this.errorMsg = "User could not be registered! Please refer console logs for further details.";
            }
            else {
              this.errorMsg = "Pengguna tidak dapat didaftarkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }

          }
        }
      );
  }



  backtotop() {
    window.scroll(0, 0);
  }

  openSuccessModal() {
    this.display = "flex";
  }

  openErrorModal() {
    this.errorDisplay = "flex";
  }

  closeSuccessModal() {
    this.display = "none";
    this.loginRedirect();

    // window.location.reload();
  }

  closeErrorModal() {
    this.display = "none";
    window.location.reload();
  }

  openForgotModal() {
    this.forgotDisplay = "flex";
  }

  closeForgotModal() {
    this.forgotDisplay = "none";
    window.location.reload();
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

  getEmail() {
    if (this.email) {
      this.regMailError = false;
      document.getElementById("form_email").style.borderBottomColor = "#bfbfbf";
    }
  }

  getPassword() {
    if (this.passWord) {
      this.regPassError = false;
      document.getElementById("form_password").style.borderBottomColor = "#bfbfbf";
    }
  }



}
