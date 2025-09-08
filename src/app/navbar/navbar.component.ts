import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, NavigationEnd, Event } from "@angular/router";
import * as $ from "jquery";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { FormToggleService } from '../services/toggle-form.service';
import { FormType } from "../models/form-type.enum";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentPath: string = "";
  isPublicPage: boolean = false;
  routerSubscription: Subscription;
  userRole: string = localStorage.getItem("roleforuser");
  // username: string = localStorage.getItem("username"); // Assuming username is stored in localStorage

  isAdminType = localStorage.getItem("isAdmin");
  username = localStorage.getItem("nama_pengguna");
  dbkl_access_token = localStorage.getItem("dbkl_access_token");

  // Navigation items structure for dynamic rendering
  navItems = [
    {
      label: "Utama",
      path: "/",
      fragment: null,
      showFor: ["public", "admin", "adminregister", "dbkldata"],
    },
    {
      label: "Log Masuk",
      onClick: () => { this.showForm(FormType.LOGIN); },
      showFor: ["adminregister"],
    },
    {
      label: "Daftar",
      onClick: () => { this.showForm(FormType.REGISTER); },
      showFor: ["adminregister"],
    },
    {
      label: "Pengguna",
      dropdown: true,
      showFor: ["public"],
      items: [
        {
          label: "Orang Awam",
          fragment: "orangAwam",
          showFor: ["public"],
        },
        {
          label: "Agensi",
          path: "/agency",
          showFor: ["public"],
        },
        {
          label: "JKAS DBKL",
          path: "/dbkl/adminregister",
          showFor: ["public"],
        },
      ],
    },
    // DBKL Admin navigation items
    {
      label: "Pentadbir",
      dropdown: true,
      showFor: ["dbkldata"],
      items: [
        {
          label: "Halaman Utama",
          path: "/dbkl/dbkldata",
          showFor: ["dbkldata"],
        },
        {
          label: "Pengurusan Pengguna",
          path: "/dbkl/usermanagement",
          showFor: ["dbkldata"],
        },
        {
          label: "Semakan Permohonan PSPPA",
          path: "/dbkl/applicationprocess",
          showFor: ["dbkldata"],
        },
        {
          label: "Pengurusan Inventori",
          path: "/dbkl/inventorymanage",
          showFor: ["dbkldata"],
        },
        {
          label: "E-Mesyuarat",
          path: "/dbkl/emeeting",
          showFor: ["dbkldata"],
        },
      ],
    },
    // User profile dropdown for dbkldata
    {
      label: this.username,
      dropdown: true,
      showFor: ["dbkldata"],
      items: [
        {
          label: "Profil",
          path: "/profileLog",
          showFor: ["dbkldata"],
        },
        {
          label: "Log Keluar",
          onClick: () => { this.logout(); },
          showFor: ["dbkldata"],
        },
      ],
    },
    {
      label: "Pengumuman",
      fragment: "pengumuman",
      showFor: ["public"],
    },
    {
      label: "Manual",
      dropdown: true,
      showFor: ["public"],
      items: [
        {
          label: "Panduan Permohonan",
          dropdown: true,
          showFor: ["public"],
          items: [
            {
              label: "Carta Aliran Proses",
              externalPath: "assets/pdfs/CARTAALIRSERAHANKAWASAN.pdf", // Using externalPath instead of path
              showFor: ["public"],
            },
            {
              label: "Senarai Semak Dokumen",
              externalPath: "assets/pdfs/ManualPengguna.pdf", // Using externalPath instead of path
              showFor: ["public"],
            },
          ],
        },
        {
          label: "Kawasan Perkhidmatan Kutipan",
          externalPath: "assets/pdfs/JKASManualPengguna.pdf", // Using externalPath instead of path
          showFor: ["public"],
        },
      ],
    },
    {
      label: "Galeri",
      fragment: "galeri",
      showFor: ["public"],
    },
    this.userRole === 'Superadmin' ? {
      label: "Admin",
      dropdown: true,
      showFor: ["public"],
      items: [
        {
          label: "Pengumuman",
          path: "/admin/announcements",
          showFor: ["public", "admin"],
        },
      ],
    } : null,
  ];

  constructor(
    private router: Router,
    private formToggleService: FormToggleService
  ) {}

  ngOnInit(): void {
    // Get the current path
    this.currentPath = this.router.url;
    this.updatePageType();

    // Subscribe to router events to update current path
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.url;
        this.updatePageType();
        // console.log("Navigation changed to: ", this.currentPath);
      });
  }

  ngAfterViewInit(): void {
    // Initialize dropdown submenus
    $(".dropdown-submenu > a").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).next(".dropdown-menu").toggle();
    });

    // Handle active class for nav items
    // $(document).ready(() => {
    //   $("li").click(function () {
    //     $("li.active").removeClass("active");
    //     $(this).addClass("active");
    //   });
    // });
  }

  // Add navigation methods if needed
  scrollToSection(fragment: string): void {
    this.router.navigate([], {
      fragment: fragment,
      queryParamsHandling: "preserve",
    });
  }

  // Handle onClick actions for navigation items
  handleNavItemClick(onClick: Function): void {
    if (typeof onClick === "function") {
      onClick();
    }
  }

  private updatePageType(): void {
    // console.log("Current path: ", this.currentPath);
    this.isPublicPage =
      this.currentPath.includes("/public") || this.currentPath === "/";
    // You can add more conditions here to determine other page types
  }

  isActive(
    path: string | null,
    fragment: string | null,
    externalPath?: string | null
  ): boolean {
    // External paths (PDFs) can never be "active" in the traditional sense
    if (externalPath) {
      return false;
    }

    if (path && this.currentPath.startsWith(path)) {
      // Special case for home page
      if (
        path === "/" &&
        (this.currentPath === "/" ||
          this.currentPath === "/public" ||
          this.currentPath === "")
      ) {
        return false;
      }

      return true;
    }

    if (fragment && this.currentPath.includes("#" + fragment)) {
      return true;
    }

    return false;
  }

  shouldShowNavItem(navItem: any): boolean {
    if (!navItem?.showFor) return true;

    if (this.isPublicPage && navItem.showFor.includes("public")) {
      return true;
    }

    if (
      this.currentPath.includes("/agency") &&
      navItem.showFor.includes("agency")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/dbkl") &&
      navItem.showFor.includes("admin")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/adminregister") &&
      navItem.showFor.includes("adminregister")
    ) {
      return true;
    }

    // Add support for dbkldata path
    if (
      this.currentPath.includes("/dbkldata") &&
      navItem.showFor.includes("dbkldata")
    ) {
      return true;
    }

    return false;
  }

  handlePdfClick(pdfPath: string): void {
    // You could log or track this if needed
    // console.log('Opening PDF: ', pdfPath);

    // Open PDF in new tab
    window.open(pdfPath, "_blank");
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  showForm(formType: FormType): void {
    this.formToggleService.showForm(formType);
  }

  // Add logout method
  logout(): void {
    // Implement logout logic similar to headerc component
    const token = localStorage.getItem("dbkl_access_token");
    if (token) {
      // Clear localStorage and redirect
      localStorage.clear();
      this.router.navigateByUrl("/dbkl/adminregister");
    }
  }
}
