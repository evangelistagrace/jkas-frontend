import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize dropdown submenus
    $(".dropdown-submenu > a").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).next(".dropdown-menu").toggle();
    });

    // Handle active class for nav items
    $(document).ready(() => {
      $("li").click(function () {
        $("li.active").removeClass("active");
        $(this).addClass("active");
      });
    });
  }

  // Add navigation methods if needed
  scrollToSection(fragment: string): void {
    this.router.navigate([], {
      fragment: fragment,
      queryParamsHandling: "preserve",
    });
  }
}
