import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  manual(v) {
    // console.log(v);
    localStorage.setItem("idv", v);

    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
  gallery(v) {
    localStorage.setItem("idv", v);
    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
  profile(v) {
    localStorage.setItem("idv", v);
    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
  home(v) {
    localStorage.setItem("idv", v);
    // console.log(v);
    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
  user(v) {
    localStorage.setItem("idv", v);
    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
  announcement(v) {
    localStorage.setItem("idv", v);
    location.href = "/" + localStorage.getItem("lang") + "/public";
    // this.router.navigateByUrl("/public");
  }
}
