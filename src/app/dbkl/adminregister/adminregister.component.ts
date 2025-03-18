import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { FormToggleService } from '../../services/toggle-form.service';
import { Subscription } from "rxjs";
import { FormType } from "../../models/form-type.enum";

@Component({
  selector: "app-adminregister",
  templateUrl: "./adminregister.component.html",
  styleUrls: ["./adminregister.component.scss"],
})
export class AdminregisterComponent implements OnInit {
  idCardNo;
  password;
  languageList;
  validation_messages = {
    idcardno: [{ type: "required", message: "Id card no is required!" }],
    password: [
      { type: "required", message: "Password is required!" },
      { type: "minlength", message: "Minimum 6 characters required" },
    ],
  };



  signupValidation = {
    username: [
      { type: "required", message: "Username is required" },

    ],
    id_card_no: [{ type: "required", message: "Id Card No is required" }],
    email: [
      { type: "required", message: "Email is required" },
      { type: "pattern", message: "Invalid email address" },
    ],
    passWord: [
      { type: "required", message: "Password is required" },
      { type: "minlength", message: "Minimum 6 characters required" },
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
  idcardno: any;
  Loginusername: any;
  Loginpassword: any;
  loginError1: boolean;
  errorMsg1: any;
  display1: string;
  display2: string;
  errorDisplay1: string;
  errorDisplay2: string;
  chek: boolean;
  msg: string;
  chk: boolean;
  lang: string;
  responsecode: string;
  sucessmsg: string;
  errmsg: string;
  success: string;
  successs: boolean;
  successs1: string;
  errorresponse: any;
  successs2: string;
  succsucessmsg: string;
  errmsgg: string;
  succsucessmsg2: string;
  sucmsg1: any;
  msgsucess: any;
  msgsucess1: string;
  forgotMessage1: string;
  status1: boolean = false;

  formTitle: string = "Log Masuk";
  showLoginForm: boolean = true;
  showRegisterForm: boolean = false;
  showForgotForm: boolean = false;
  showOtpForm: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private formToggleService: FormToggleService
  ) { }

  ngOnInit() {

    this.lang = localStorage.getItem("lang");
    if (
      localStorage.getItem("isdbkl") == "true" &&
      localStorage.getItem("dbkl_access_token") != ""
    ) {
      this.router.navigateByUrl("/dbkl/dbklmainpage");
    }
    window.scroll(0, 5);
    localStorage.setItem("path", "/dbkl/adminregister");

    // Initialize form groups
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

    this.publicsignupGroup = new FormGroup({
      username: new FormControl("", [
        Validators.required,
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
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
        ),
      ]),
      confPass: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,32}$"
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


    this.regPassError = false;
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.formToggleService.showForm$.subscribe((formType: FormType) => {
        console.log("Form Type: ", formType);
         // First reset all form visibility
         this.showLoginForm = false;
         this.showRegisterForm = false;
         this.showForgotForm = false;
         this.showOtpForm = false;
         
         switch (formType) {
          case FormType.LOGIN:
            this.showLoginForm = true;
            this.formTitle = "Log Masuk";
            break;
          case FormType.REGISTER:
            this.showRegisterForm = true;
            this.formTitle = "Daftar";
            break;
          case FormType.FORGOT_PASSWORD:
            this.showForgotForm = true;
            this.formTitle = "Lupa Kata Laluan";
            break;
          case FormType.OTP:
            this.showOtpForm = true;
            this.formTitle = "Sahkan OTP";
            break;
          default:
            this.showLoginForm = true; // Default to login
            break;
        }
      })
    );


    // DOM stuff
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


  // this.hideform();
  // this.FhideForm();

    // const forgotPassword = document.getElementById("fpassd");
    // const createAccount = document.getElementById("create_account");
    // const signInBtn1 = document.getElementById("signInn");
    // const signInBtn = document.getElementById("signIn");
    // const signUpBtn = document.getElementById("signUp");
    // const signUpBtn2 = document.getElementById("signUpp");
    // const fistForm = document.getElementById("form1");
    // const secondForm = document.getElementById("form2");
    // this.container = document.querySelector(".container1");

    // forgotPassword.addEventListener("click", () => {
    //   this.container.classList.add("right-panel-active");
    //   this.LhideForm();
    //   this.fshowForm();
    // });

    // signInBtn.addEventListener("click", () => {
    //   this.showloginForm();
    //   this.container.classList.remove("right-panel-active");
    // });

    // signInBtn1.addEventListener("click", () => {
    //   this.container.classList.remove("right-panel-active");
    // });

    // signUpBtn.addEventListener("click", () => {
    //   this.container.classList.add("right-panel-active");
    //   this.FhideForm();
    //   this.LshowForm();
    // });

    // signUpBtn2.addEventListener("click", () => {
    //   this.container.classList.add("right-panel-active");
    // });
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
      nama_pengguna: this.Loginusername,
      password: this.Loginpassword,
    };
    let headers = {
      "Content-Type": "application/json",
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/login", body, { headers: headers })
      .subscribe(
        (res) => {
          localStorage.setItem("isUser", "dbkl");
          if (res["status"] === "success") {
            // console.log("hyy", res);

            this.spinner.hide();
            this.router.navigateByUrl("dbkl/dbklmainpage");
            this.accessToken = res["access_token"];
            localStorage.setItem("isdbkl", "true");
            localStorage.setItem("AccessToken", this.accessToken);
            localStorage.setItem("dbkl_access_token", this.accessToken);
            localStorage.setItem("user_type", res["user_type"]);
            localStorage.setItem("roleforuser", res["role"]);
            localStorage.setItem("nama_pengguna", res["user"]);
            localStorage.setItem("zon", res["zon"]);
            localStorage.setItem("parlimen", res["parlimen"]);
            localStorage.setItem("user", res["user"]);
            this.authService.login(res["role"]).subscribe((res) => {
              if (res.success) {
              }
            });
            localStorage.setItem("ifagain", "true");
          }
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];

          if (this.errorMsg == "invalid_cred") {

            if (this.lang == "en") {

              this.errorMsg = "Invalid credentials! Please try again";
            }
            else {
              this.errorMsg = "ID Pengguna atau Kata Laluan tidak sah";
            }
          }
          else {
            if (this.lang == "en")
              this.errorMsg = "Some issue in login ! Please try again.";

            else
              this.errorMsg = "Beberapa masalah semasa log masuk! Sila cuba lagi.";
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
      let headers = {
        "Content-Type": "application/json",
        accept: "application/json",
      };

      if (this.publicsignupGroup.invalid) {
        // document.getElementById("form_user").style.borderBottomColor = "red";
        // document.getElementById("id_card_no").style.borderBottomColor = "red";
        // document.getElementById("form_email").style.borderBottomColor = "red";
        // document.getElementById("form_password").style.borderBottomColor = "red";
        // document.getElementById("form_password2").style.borderBottomColor = "red";

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
            this.PassErrorMessage = validation.message;
          }
        }
      } else {
        this.spinner.show();
        // console.log(
        //   this.idcardno +
        //     " " +
        //     this.passWord +
        //     " " +
        //     this.email +
        //     " " +
        //     this.username
        // );

        let body = {
          name: this.idcardno,
          password: this.passWord,
          email: this.email,
          nama_pengguna: this.username,
        };
        // console.log("sign up data", body);
        document
          .getElementById("create_account")
          .setAttribute("data-toggle", "modal");
        document
          .getElementById("create_account")
          .setAttribute("data-target", "#myModal");
        // this.container.classList.remove("right-panel-active");

        localStorage.setItem("nama_pengguna", this.username);

        this.http
          .post(this.basePublicUrl + "/dbkl/registerDbklUser", body, {
            headers: headers,
          })
          .subscribe(
            (res) => {
              if (res["status"] === "success") {
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
              this.loginError = true;
              this.errorMsg1 = error["error"]["message"];
              // console.log(this.errorMsg1);
              if (this.errorMsg1 == "user_exists") {

                if (this.lang == "en") {

                  this.errorMsg1 = "Username taken already! Please try with another username.";
                }
                else {
                  this.errorMsg1 = "Nama pengguna sudah diambil! Sila cuba dengan nama pengguna lain.";
                }
              }
              else if (this.errorMsg1 == "email_exists") {

                if (this.lang == "en") {

                  this.errorMsg1 = "E-mail already exist! Please Try with another user.";
                }
                else {
                  this.errorMsg1 = "E-mel telah didaftarkan";
                }
              }
              else {
                if (this.lang == "en")
                  this.errorMsg = "Some issue in registraion! Please try again.";

                else
                  this.errorMsg = "Beberapa masalah dalam pendaftaran! Sila cuba lagi.";
              }
            }







          );
        // this.hideloginForm();
        // this.showform();
      }
    } else {
      this.check();
    }
  }

  // Check password
  check() {
    this.loginError = false;

    if ((this.passWord != this.confPass) && (this.passWord != undefined)) {
      this.chek = true;
      this.msg = "Password doesn't match";
    } else {
      this.chek = false;
    }
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
      this.chk = true;
      this.forgotMessage = "Please enter Username or email";
      return;
    } else if (this.forgotId != undefined && this.forgotEmail == undefined) {
      this.keyvalue = this.forgotId;
    } else if (this.forgotId == undefined && this.forgotEmail != undefined) {
      this.keyvalue = this.forgotEmail;
    } else if (this.forgotId == " " && this.forgotEmail == " ") {
      this.chk = true;
      this.forgotMessage = "Please enter Username or email";
      return;
    } else if (this.forgotId != undefined && this.forgotEmail != undefined) {
      this.keyvalue = this.forgotEmail;
    }
    //console.log(this.forgotMessage);
    this.spinner.show();

    let body = {
      nama_pengguna: this.keyvalue,
      lang: this.lang,
    };
    let headers = {
      "Content-Type": "application/json",
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/forgotPassword", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log(res);
          if (res["status"] == "success") {
            this.spinner.hide();
            this.forgotMessage = res["message"];
            this.openForgotModal();
            this.openModal1();
            // this.msgsucess=res["status"] == "success";

            // if(this.msgsucess =="reset_pwd_mail_sent"){
            if (this.lang == "en") {
              this.sucmsg1 = "Reset password link sent successfully.";
            }
            else {
              this.sucmsg1 = "Tetapkan semula pautan kata laluan berjaya dihantar ke id surat berdaftar.";
            }
          }

        },
        (error) => {
          this.forgotMessage1 = error["error"]["message"];
          this.spinner.hide();
          this.openErrorModal1();

          if (this.forgotMessage1 == "user_not_found") {
            this.status1 = true;
            this.chk = false;

            if (this.lang == "en") {
              this.errmsgg = "No such user exits!";
            }
            else {
              this.errmsgg = "Tidak ada pengguna yang keluar!";
            }
          }

        }


      );
  }
  onCloseHandled() {
    this.router.navigateByUrl("/dbkl/adminregister");
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
    let body = {
      otp: this.otpCode,
      nama_pengguna: localStorage.getItem("nama_pengguna"),
    };
    // console.log(localStorage.getItem("nama_pengguna"));
    // console.log(this.otpCode);

    let headers = {
      "Content-Type": "application/json",
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/completeRegistration", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {

          this.spinner.hide();
          if (res["message"] == "user_added") {
            if (this.lang == "en") {
              this.successs1 = "User successfully registered!";
            }


            else {
              this.successs1 = "Pengguna berjaya didaftarkan!";
            }
          }
          this.openSuccessModal();


        },
        (error) => {
          this.errorMessage = error["error"]["message"];
          this.spinner.hide();
          this.openErrorModal();


          if (this.errorMessage == "user_not_added") {
            if (this.lang == "en") {
              this.errmsg = "User could not be registered! Please refer console logs for further details.";
            }
            else {
              this.errmsg = "Pengguna tidak dapat didaftarkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          } else if (this.errorMessage == "otp_invalid") {

            if (this.lang == "en") {

              this.errorMsg = "OTP could not be validated.Please enter correct OTP.";
            }
            else {
              this.errorMsg = "OTP tidak dapat disahkan. Sila masukkan OTP yang betul.";
            }
          }
        }
      );
  }
  openModal() {
    this.display = "block";
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }

  openModal1() {
    this.display1 = "block";
  }
  openErrorModal1() {
    this.errorDisplay1 = "block";
  }

  backtotop() {
    window.scroll(0, 0);
  }

  openSuccessModal() {
    this.display = "block";
  }

  closeSuccessModal() {
    this.display = "none";
    window.location.reload();
  }

  closeErrorModal() {
    this.errorDisplay1 = "none";
  }

  openForgotModal() {
    this.forgotDisplay = "block";
  }

  closeForgotModal() {
    this.forgotDisplay = "none";
    window.location.reload();
  }

  getUsername() {
    // console.log(this.username);
    this.userError = false;
    if (this.publicsignupGroup.get("username")) {
      // document.getElementById("form_user").style.borderBottomColor = "black";
    }
  }

  getIdCard() {
    if (this.id_card) {
      this.regIdError = false;
      // document.getElementById("id_card_no").style.borderBottomColor = "black";
    }
  }

  getEmail() {
    if (this.email) {
      this.regMailError = false;
      // document.getElementById("form_email").style.borderBottomColor = "black";
    }
  }

  getPassword() {
    if (this.passWord) {
      this.regPassError = false;
      // document.getElementById("form_password").style.borderBottomColor ="black";
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onForgotPassword() {
    this.formToggleService.showForm(FormType.FORGOT_PASSWORD);
  }

  onRegister() {
    this.formToggleService.showForm(FormType.REGISTER);
  }

  onLogin() {
    this.formToggleService.showForm(FormType.LOGIN);
  }
}
