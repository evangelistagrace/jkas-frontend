import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router, NavigationEnd, Event } from "@angular/router";
import * as $ from "jquery";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { FormToggleService } from '../services/toggle-form.service';
import { FormType } from "../models/form-type.enum";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

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
  baseUrl = environment.basePublicUrl;

  // Navigation items structure for dynamic rendering
  navItems = [
    {
      label: "Utama",
      path: "/",
      fragment: null,
      showFor: ["public", "admin", "adminregister"],
    },
    {
      label: "Utama",
      path: "/dbkl/dbklmainpage",
      fragment: null,
      showFor: ["dbkl", "profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
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
      showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
      items: [
        {
          label: "Halaman Utama",
          path: "/dbkl/dbkldata",
          showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
        },
        {
          label: "Pengurusan Pengguna",
          path: "/dbkl/usermanagement",
          showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
        },
        {
          label: "Semakan Permohonan PSPPA",
          path: "/dbkl/applicationprocess",
          showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
        },
        {
          label: "Pengurusan Inventori",
          path: "/dbkl/inventorymanage",
          showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
        },
        {
          label: "E-Mesyuarat",
          path: "/dbkl/emeeting",
          showFor: ["dbkldata", "usermanagement", "applicationprocess", "inventorymanage", "emeeting"],
        },
      ],
    },
    // inventory menu
    {
      label: "Inventori Data",
      dropdown: true,
      showFor: ["inventorymap", "omplama", "ompbaru", "inactivearea"],
      items: [
        {
          label: "Halaman Utama",
          path: "/dbkl/inventorymap",
          showFor: ["inventorymap", "omplama", "ompbaru", "inactivearea"],
        },
        {
          label: "OMP Lama",
          path: "/dbkl/omplama",
          showFor: ["inventorymap", "omplama", "ompbaru", "inactivearea"],
        },
        {
          label: "OMP Baru",
          path: "/dbkl/ompbaru",
          showFor: ["inventorymap", "omplama", "ompbaru", "inactivearea"],
        },
        {
          label: "Kawasan Tidak Aktif (Pemotongan Bayaran)",
          path: "/dbkl/inactivearea",
          showFor: ["inventorymap", "omplama", "ompbaru", "inactivearea"],
        },
      ],
    },
    // MTB / MTK Form
    {
      label: "MTB",
      dropdown: true,
      showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
      items: [
        {
          label: "Paparan Peta",
          path: "/dbkl/mapview",
          showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
        },
        {
          label: "Borang",
          dropdown: true,
          showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
          items: [
            {
              label: "Borang Kerja",
              path: "/dbkl/mtbwork-form",
              showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
            },
            {
              label: "Borang Kompaun",
              path: "/dbkl/mtbcompoundform",
              showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
            },
          ],
        },
        {
          label: "Log Kerja",
          dropdown: true,
          showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
          items: [
            {
              label: "Kerja / Aduan Harian",
              path: "/dbkl/mtbwork-log",
              showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
            },
            {
              label: "Senarai Kompaun",
              path: "/dbkl/mtblistofcompound",
              showFor: ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"],
            },
          ],
        },
      ],
    },
    {
      label: "MTK",
      dropdown: true,
      showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
      items: [
        {
          label: "Pemantauan MTK",
          path: "/dbkl/mtkmapview",
          showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
        },
        {
          label: "Borang Kerja",
          path: "/dbkl/mtkworkform",
          showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
        },
        {
          label: "Borang Kompaun",
          path: "/dbkl/mtkcompoundform",
          showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
        },
        {
          label: "Kerja MTB",
          path: "/dbkl/inspectingofficers",
          showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
        },
        {
          label: "Kompaun MTB",
          path: "/dbkl/mtblistofcompound",
          showFor: ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers", "mtblistofcompound"],
        },
      ],
    },
    // chart and analysis
    {
      label: "Analisis & Laporan",
      dropdown: true,
      showFor: ["barchart", "merinyuanalysis", "compoundanalysis"],
      items: [
        {
          label: "Analisis Inventori",
          path: "/dbkl/barchart",
          showFor: ["barchart", "merinyuanalysis", "compoundanalysis"],
        },
        {
          label: "Analisis Merinyu",
          path: "/dbkl/merinyuanalysis",
          showFor: ["barchart", "merinyuanalysis", "compoundanalysis"],
        },
        {
          label: "Analisis Kompaun",
          path: "/dbkl/compoundanalysis",
          showFor: ["barchart", "merinyuanalysis", "compoundanalysis"],
        },
      ],
    },
    // User profile dropdown for dbkl
    {
      label: this.username,
      dropdown: true,
      showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
      items: [
        {
          label: "Profil",
          path: "/profileLog",
          showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
        },
        {
          label: "Tetapan",
          dropdown: true,
          showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
          roleCondition: () => this.userRole === 'Superadmin' || this.userRole === 'Admin',
          items: [
            {
              label: "Pengumuman",
              path: "/admin/announcements",
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
            },
            {
              label: "Manual",
              path: "/superadmin/manualupload",
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
            },
            {
              label: "Foto Galeri",
              path: "/superadmin/galeryphoto",
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
            },
          ],
        },
        {
          label: "Manual Pengguna Staf",
          dropdown: true,
          showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
          items: [
            {
              label: "DBKL",
              onClick: () => { this.dbkl(); },
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
              roleCondition: () => this.userRole === 'Superadmin' || this.userRole === 'Admin',
            },
            {
              label: "MTB",
              onClick: () => { this.mtb(); },
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
              roleCondition: () => this.userRole === 'MerinyuMTB',
            },
            {
              label: "MTK",
              onClick: () => { this.mtk(); },
              showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
              roleCondition: () => this.userRole === 'MerinyuMTK',
            },
          ],
        },
        {
          label: "Log Keluar",
          onClick: () => { this.logout(); },
          showFor: ["profileLog", "dbkl", "announcements", "manualupload", "galeryphoto"],
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
    private http: HttpClient,
    private router: Router,
    private formToggleService: FormToggleService,
    private spinner: NgxSpinnerService
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

    // Check role condition if it exists
    if (navItem.roleCondition && typeof navItem.roleCondition === 'function') {
      if (!navItem.roleCondition()) {
        return false;
      }
    }

    // Helper function to check if user has MTB/MTK access
    const hasMTBAccess = () => {
      return this.userRole === 'Superadmin' || 
             this.userRole === 'MerinyuMTB' || 
             this.userRole === 'Kewangan' || 
             this.userRole === 'Analisis,MerinyuMTB,MerinyuMTK';
    };

    const hasMTKAccess = () => {
      return this.userRole === 'Superadmin' || 
             this.userRole === 'MerinyuMTK' || 
             this.userRole === 'Kewangan' || 
             this.userRole === 'Analisis,MerinyuMTB,MerinyuMTK';
    };

    const hasAnalysisAccess = () => {
      return this.userRole === 'Superadmin' || 
             this.userRole === 'Analisis,MerinyuMTB,MerinyuMTK' ||
             this.userRole === 'Kewangan';
    };

    // Check for username dropdown (profile menu) - show for all DBKL users
    if (navItem.showFor.some(item => ["profileLog", "announcements", "manualupload", "galeryphoto"].includes(item))) {
      return this.currentPath.includes("/dbkl") ||
             this.currentPath.includes("/profileLog") ||
             this.currentPath.includes("/admin/announcements") ||
             this.currentPath.includes("/superadmin/manualupload") ||
             this.currentPath.includes("/superadmin/galeryphoto");
    }

    // Check for Analysis & Laporan path-based visibility with role validation
    if (navItem.showFor.some(item => ["barchart", "merinyuanalysis", "compoundanalysis"].includes(item))) {
      return hasAnalysisAccess() && (
        this.currentPath.includes("/barchart") ||
        this.currentPath.includes("/merinyuanalysis") ||
        this.currentPath.includes("/compoundanalysis")
      );
    }

    // Check for MTB path-based visibility with role validation
    if (navItem.showFor.some(item => ["mapview", "mtbworkform", "mtbcompoundform", "mtbworklog", "mtblistofcompound"].includes(item))) {
      return hasMTBAccess() && (
        this.currentPath.includes("/mapview") ||
        this.currentPath.includes("/mtbwork-form") ||
        this.currentPath.includes("/mtbcompoundform") ||
        this.currentPath.includes("/mtbwork-log") ||
        this.currentPath.includes("/mtblistofcompound") ||
        this.currentPath.includes("/mtkcompoundform") ||
        this.currentPath.includes("/mtkmapview") ||
        this.currentPath.includes("/mtkworkform") ||
        this.currentPath.includes("/inspectingofficers")
      );
    }

    // Check for MTK path-based visibility with role validation
    if (navItem.showFor.some(item => ["mtkmapview", "mtkworkform", "mtkcompoundform", "inspectingofficers"].includes(item))) {
      return hasMTKAccess() && (
        this.currentPath.includes("/mtkmapview") ||
        this.currentPath.includes("/mtkworkform") ||
        this.currentPath.includes("/inspectingofficers") ||
        this.currentPath.includes("/mtkcompoundform") ||
        this.currentPath.includes("/mtblistofcompound") ||
        this.currentPath.includes("/mapview") ||
        this.currentPath.includes("/mtbwork-form") ||
        this.currentPath.includes("/mtbwork-log")
      );
    }

    // Check for public path-based visibility
    if (this.isPublicPage && navItem.showFor.includes("public")) {
      return true;
    }

    // Check for agency path-based visibility
    if (
      this.currentPath.includes("/agency") &&
      navItem.showFor.includes("agency")
    ) {
      return true;
    }

    // Check for dbkl path-based visibility
    if (
      this.currentPath.includes("/dbkl") &&
      navItem.showFor.includes("dbkl")
    ) {
      return true;
    }

    // Check for adminregister path-based visibility
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

    // Add support for additional DBKL admin paths
    if (
      this.currentPath.includes("/usermanagement") &&
      navItem.showFor.includes("usermanagement")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/applicationprocess") &&
      navItem.showFor.includes("applicationprocess")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/inventorymanage") &&
      navItem.showFor.includes("inventorymanage")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/emeeting") &&
      navItem.showFor.includes("emeeting")
    ) {
      return true;
    }

    // Add support for inventory data paths
    if (
      this.currentPath.includes("/inventorymap") &&
      navItem.showFor.includes("inventorymap")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/omplama") &&
      navItem.showFor.includes("omplama")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/ompbaru") &&
      navItem.showFor.includes("ompbaru")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/inactivearea") &&
      navItem.showFor.includes("inactivearea")
    ) {
      return true;
    }

    // Add support for analysis paths
    if (
      this.currentPath.includes("/barchart") &&
      navItem.showFor.includes("barchart")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/merinyuanalysis") &&
      navItem.showFor.includes("merinyuanalysis")
    ) {
      return true;
    }

    if (
      this.currentPath.includes("/compoundanalysis") &&
      navItem.showFor.includes("compoundanalysis")
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

  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.dbkl_access_token,
    };

    let body = {};

    // if (this.userRole === 'Superadmin') {
      this.http
      .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.clear();
          this.spinner.hide();
        },
        (error) => {
          // this.openErrorModal();
        }
      );
  }

  // Add the manual functions referenced in the header component
  dbkl(): void {
    // Add implementation for DBKL manual
    window.open('path/to/dbkl/manual.pdf', '_blank');
  }

  mtb(): void {
    // Add implementation for MTB manual
    window.open('path/to/mtb/manual.pdf', '_blank');
  }

  mtk(): void {
    // Add implementation for MTK manual
    window.open('path/to/mtk/manual.pdf', '_blank');
  }
}
