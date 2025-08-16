import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  Component,
  Inject,
  LOCALE_ID,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import * as $ from "jquery";
import { OwlOptions } from "ngx-owl-carousel-o";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { ViewportScroller } from "@angular/common";
import { take } from "rxjs/operators";
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

@Component({
  selector: "app-public",
  templateUrl: "./public.component.html",
  styleUrls: ["./public.component.scss"],
})
export class PublicComponent {
  languageList = [{ code: "ms", label: "Malay" }];

  isAnnouncement: boolean;
  username: string;
  token: string;
  basePublicUrl = environment.basePublicUrl;
  SERVER_URL: any = environment.basePublicUrl;
  baseUrl = environment.basePublicUrl;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: true,
    autoHeight: true,
    autoWidth: false,
    items: 2,
  };
  customOptions1: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: true,
    autoHeight: true,
    autoWidth: false,
  };
  data: any;
  errorMsg: any;
  loginError: boolean;
  selectedIndex: any;
  manual_path: any;
  data1: any;
  data2: object;
  imagesArray: any = [];

  imagepath: any;
  isSticky: boolean = false;
  lang: string;
  value: any;
  is1st: any;
  i: any;
  maualbody: any;
  manualbody: any;
  data3: Object;
  dataget1: Object;
  dataget: Object;
  manual1: string;
  manual2: any;
  path1: any;
  path2: any;
  imagelink: any;
  images = [
    "assets/img/2.jpg",
    "assets/img/3.jpg",
    "assets/img/4.jpg",
    "assets/img/5.jpg",
    "assets/img/6.jpg",
    "assets/img/7.jpg",
    "assets/img/8.jpg",
    "assets/img/9.jpg",
    "assets/img/10.jpg",
  ];
  @ViewChild("bgVideo") videoPlayer: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) protected localeId: string,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngAfterViewInit() {
    const video: HTMLVideoElement = this.videoPlayer.nativeElement;

    // Set initial properties
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    // Function to handle play attempt
    const attemptPlay = () => {
      video.play().catch((error) => {
        console.log("Video play error: ", error);

        // For Firefox, try playing on user interaction
        document.addEventListener(
          "click",
          () => {
            video.play().catch((e) => console.log("Play on click failed:", e));
          },
          { once: true }
        );
      });
    };

    // Try playing when metadata is loaded
    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadedmetadata", () => {
        attemptPlay();
      });
    }

    // Handle initial fragment if present
    this.route.fragment.pipe(take(1)).subscribe((fragment) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });

    $(".dropdown-submenu > a").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).next(".dropdown-menu").toggle();
    });

    // Initialize Swiper
    this.initSwiper();
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          try {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          } catch (err) {
            console.log("Error scrolling to element:", err);
          }
        }, 100);
      }
    });

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getJumlahKawasanPerkhidmatan", {
        headers: headers,
      })
      .subscribe((res) => {
        this.dataget = res;
        this.spinner.hide();
      });

    this.http
      .get(this.basePublicUrl + "/dbkl/getJumlahPermis", {
        headers: headers,
      })
      .subscribe((res) => {
        this.dataget1 = res;
        this.spinner.hide();
      });

    this.http
      .get(this.basePublicUrl + "/dbkl/getJumlahPembersihanAwam", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data2 = res;
        this.spinner.hide();
      });

    this.http
      .get(this.basePublicUrl + "/dbkl/getJumlahKutipanSampah", {
        headers: headers,
      })
      .subscribe((res) => {
        this.data3 = res;
        this.spinner.hide();
      });

    var is1st = 0;
    $(document).on("click", "#somebutton", function () {
      //console.log("yoo");
      //console.log(is1st);
      if ($(".module_holder")[0]) {
      } else {
        $(".closeannounce").hide();
        $("#cta").append(
          '<div class="module_holder" ><div class="module_item" ><img style="margin-left: 38%;width: 376px;margin-top: -65px;" src="../assets/img/notice.jpeg" alt="Sweep Stakes"></div> <button class="btn bg-transparent btn-large" style="cursor: pointer; background-color:none;border: 2px solid #fff; font-weight: 500;  font-size: 18px; letter-spacing: 1px;display: inline-block;transition: 0.5s;  margin-top: 51px; margin-left: 48%;" i18n="@@close">TUTUP</button></div>'
        );
      }
    });

    $(document).on("click", ".module_holder", function () {
      //console.log("append");

      $(".module_holder").remove();
    });

    $(document).on("click", "#closebutton", function () {
      //console.log("append");

      $(".module_holder").remove();
      $(".closeannounce").show();
    });

    //     $(".look_for").on('click',function () {
    // alert("clicked");

    //       $("#cta").append('<div class="module_holder"><div class="module_item"><img src="https://t4.ftcdn.net/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg" alt="Sweep Stakes"><br>sendSMS</div></div>');
    //     });
    this.lang = localStorage.getItem("lang");
    this.fetchImages();
    let url = document.location.protocol + "//" + document.location.hostname;
    // console.log(url);

    // if (localStorage.getItem("lang") == "en") {
    //   window.location.href = url + "/en/publicen";
    // }

    if (
      localStorage.getItem("lang") == "" ||
      localStorage.getItem("lang") != "en"
    ) {
      localStorage.setItem("lang", "ms");
    }
    window.scroll(0, 0);
    let nav = localStorage.getItem("idv");
    // console.log(nav);
    localStorage.removeItem("idv");
    if (nav == "services") {
      this.manual();
    } else if (nav == "portfolio") {
      this.gallery();
    } else if (nav == "home") {
      window.location.reload();
      localStorage.removeItem("idv");
    } else if (nav == "pricing") {
      document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });

      document.getElementById("pricing").className = "active";
      document.getElementById("home").className = "deactive";

      localStorage.removeItem("idv");
    } else if (nav == "annoucements") {
      // console.log("hii");

      this.announcement();
    }

    localStorage.setItem("path", "public");
    $(document).ready(function () {
      $("li").click(function () {
        $("li.active").removeClass("active");
        $(this).addClass("active");
      });
    });

    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("AccessToken");

    this.http
      .post(this.basePublicUrl + "/public/getAnnouncement/" + this.lang, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data = res;
        },
        (error) => {
          this.errorMsg = error["error"]["message"];
        }
      );

    this.http
      .post(this.basePublicUrl + "/public/getManual/" + this.lang, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.data1 = res;
          // console.log(this.data1);
          // this.manualbody = this.data1[0].manual_body;
          // for(let i=0;i<=this.data1[i].length-1;i++){
          //   if(this.data1[i].manual_body.includes(',')){
          //    this.maualbody=this.data1[i].manual_body.split(',');
          //    console.log(this.maualbody);
          //    for(let i=0;i<this.maualbody.length-1;i++){
          //      let m2=this.manual[i].split('/');
          //      this.manualbody.push(m2[m2.length-1]);
          //    }}
          //   else{
          //     this.manualbody = this.data1[0].manual_body;
          //   }

          // }
          for (let index of this.data1) {
            if (index["manual_path"].includes(",")) {
              // console.log("split pdf");
              var splitted = index["manual_path"].split(",");
              // console.log(splitted[0] + '\u000a' + splitted[1]);
              var newPdf = splitted[0] + "\u000a" + splitted[1];
              this.path1 = splitted[0];

              this.path2 = splitted[1];
              // console.log( this.path1 + " " + this.path2);
              index["manual_path"] = newPdf;
            }
          }

          for (let index of this.data1) {
            if (index["manual_body"].includes(",")) {
              //    console.log("split now");
              var splitted = index["manual_body"].split(",");
              //   console.log(splitted[0] + '\u000a' + splitted[1]);
              var newManual = splitted[0] + "\u000a" + splitted[1];
              this.manual1 = splitted[0];

              this.manual2 = splitted[1];
              //  console.log( this.manual1 + " " + this.manual2);
              index["manual_body"] = newManual;
            }
          }
        },
        (error) => {
          this.errorMsg = error["error"]["message"];
        }
      );
    //       window.onscroll = function() {myFunction()};

    // var header = document.getElementById("myHeader");
    // var sticky = header.offsetTop;

    // function myFunction() {
    //   if (window.pageYOffset > sticky) {
    //     header.classList.add("sticky");
    //   } else {
    //     header.classList.remove("sticky");
    //   }
    // }
  }

  showDiv(index, imgurl) {
    document.getElementById("cta").scrollIntoView({ behavior: "smooth" });
    console.log("img", imgurl);
    this.selectedIndex = index;
    this.imagelink =
      environment.basePublicUrl + "/jkas_resourses/free/images/" + imgurl;
    this.isAnnouncement = true;
  }

  closeAnnouncement() {
    this.isAnnouncement = false;
    document
      .getElementById("annoucements")
      .scrollIntoView({ behavior: "smooth" });
  }

  showDiv2() {
    document.getElementById("ann2").style.display = "block";
    document.getElementById("ann3").style.display = "none";
    document.getElementById("ann1").style.display = "none";
  }

  showDiv3() {
    document.getElementById("ann3").style.display = "block";
    document.getElementById("ann1").style.display = "none";
    document.getElementById("ann2").style.display = "none";
  }
  home() {
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    document.getElementById("home").className = "active";
    document.getElementById("announce").className = "nav-item  ";
    document.getElementById("manuals").className = "nav-item  ";
    document.getElementById("gallery").className = "nav-item  ";
    document.getElementById("profile").className = "nav-item  ";
    document.getElementById("user").className = "nav-item dropdown ";
    document.getElementById("contactus").className = "nav-item  ";
  }
  backtotop() {
    window.scroll(0, 0);
    this.home();
  }

  menu() {
    document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });

    // document.getElementById('pricing').className = 'active';
  }

  announcement() {
    document
      .getElementById("annoucements")
      .scrollIntoView({ behavior: "smooth" });
    // document.getElementById('home').className = '';
    document.getElementById("annoucements").className = "active";
  }

  manual() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
    // document.getElementById('home').className = '';
    // document.getElementById('announce').className = '';
    document.getElementById("manuals").className = "active";
  }

  gallery() {
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
    document.getElementById("gallery").className = "active";
  }

  profile() {
    document.getElementById("team").scrollIntoView({ behavior: "smooth" });
    document.getElementById("profile").className = "active";
  }

  contact() {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
    document.getElementById("contactus").className = "active";
  }

  gotoLogin() {
    if (this.token) {
      this.router.navigateByUrl("/publicpage");
    } else {
      this.router.navigateByUrl("/publicLogin");
    }
  }
  gotoServiceLogin() {
    if (this.token) {
      this.router.navigateByUrl("/public/sevices");
    } else {
      this.router.navigateByUrl("/public/serviceLogin");
    }
  }
  agency() {
    // console.log("agency called");
  }
  appendpath(path) {
    window.open(this.SERVER_URL + "/jkas_resourses/free/pdfs/" + path);
  }
  fetchImages() {
    this.http
      .get(environment.basePublicUrl + "/public/getGalleryPhoto")
      .subscribe((images) => {
        // console.log(images);
        this.imagesArray = images;
        this.imagepath = this.baseUrl + this.imagesArray.photo_path;
        //console.log(this.imagepath)
        this.spinner.hide();
      });
  }
  dbklurl() {
    window.location.href =
      this.basePublicUrl + "/jkas_resourses/free/pdfs/PROGRAM1C1R.pdf";
    //  this.router.navigateByUrl(this.SERVER_URL +"/jkas_resourses/free/pdfs/PROGRAM1C1R.pdf");
  }
  manualurl() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    // window.open(this.basePublicUrl+"/jkas_resourses/free/pdfs/CARTAALIRSERAHANKAWASAN.pdf");
    //this.router.navigateByUrl(this.SERVER_URL +"/jkas_resourses/free/pdfs/PROGRAM1C1R.pdf");
  }
  close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  manualurl2() {
    window.open(
      this.SERVER_URL + "/jkas_resourses/free/pdfs/JKASManualPengguna.pdf"
    );
  }
  secondmanual() {
    window.open(
      this.SERVER_URL + "/jkas_resourses/free/pdfs/ManualPengguna.pdf"
    );
  }
  firstmanual() {
    window.open(
      this.SERVER_URL + "/jkas_resourses/free/pdfs/CARTAALIRSERAHANKAWASAN.pdf"
    );
  }

  initSwiper() {
    // Initialize all Swiper elements
    const swiperEls = document.querySelectorAll("swiper-container");

    // Wait for DOM to be ready
    setTimeout(() => {
      swiperEls.forEach((swiperEl) => {
        // @ts-ignore - Using Swiper element API
        swiperEl.initialize();
      });

      // Remove PureCounter initialization from here - it's now handled by the statistics component
    }, 100);
  }
}
