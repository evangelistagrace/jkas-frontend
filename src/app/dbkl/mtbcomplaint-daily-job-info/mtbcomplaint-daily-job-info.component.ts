import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import * as L from "leaflet";

@Component({
  selector: "app-mtbcomplaint-daily-job-info",
  templateUrl: "./mtbcomplaint-daily-job-info.component.html",
  styleUrls: ["./mtbcomplaint-daily-job-info.component.css"],
})
export class MtbcomplaintDailyJobInfoComponent implements OnInit {
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  parliamen: any;
  id: any;
  date: any;
  p: any;
  selectedParlimen: any;
  parliamen1: Object;
  parliament: Object;
  parliaments: any = [
    "Segambut",
    "Titiwangsa",
    "Wangsa Maju",
    "Batu",
    "Kepong",
    "Cheras",
    "Bukit Bintang",
    "Seputeh",
    "Setiwangsa",
    "Bandar Tun Razak",
    "Lembah Pantai",
  ];
  purpleicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/purple-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  blueicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/blue-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  blacktick = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/black-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  redtickicon = L.icon({
    // iconUrl: "../../../assets/img/MicrosoftTeams-image.png",
    iconUrl: "../../../assets/img/Colors_Tick/red-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greentickicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/greeen-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  orangeicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/orange-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  yellowtickicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/yellow-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  tealicon = L.icon({
    iconUrl: "../../../assets/img/Colors_Tick/teal-tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  map: L.Map;
  Selectedparliament: any = [];
  accessToken: string;
  Location: any;
  selectservices: any = [];
  stringval: string;
  service: string;
  afterreplace: string;
  latituteAndlongitute: any = [];
  sapuan_jejentas_latitute: any;
  serviceesname: any = [];
  marker: L.Marker<any>;
  marker1: L.Marker<any>;
  marker3: L.Marker<any>;
  marker4: L.Marker<any>;
  marker5: L.Marker<any>;
  mapview: boolean;
  lang: string;
  check: boolean;
  check1: boolean;
  userrole: string;
  isAdminType: string;
  username: string;
  userId: string;
  mtbidss: string;
  mtbnames: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/mtbdailyjobinfo?value=" +
        this.date +
        "&value2=" +
        this.id +
        "&value3=" +
        this.parliamen
    );
    this.spinner.show();
    
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.lang = localStorage.getItem("lang");
    this.userrole = localStorage.getItem("roleforuser");
    this.userId=localStorage.getItem("ff");
    this.mtbidss = this.route.snapshot.queryParamMap.get("value2");
    this.getDailyWorkInfo();
    $(document).ready(function () {
      $("#jkas2").hide();
    });
    $(document).ready(function () {
      $("input[name$='inlineRadioOptions']").click(function () {
        var test = $(this).val();

        $(".desc").hide();
        $("#jkas" + test).show();
      });
    });
    let body = {
      tarikh: this.date,
      id_mtb: this.id,
    };
     //console.log("booasdsa",body);

    let key = localStorage.getItem("AccessToken");
    // console.log("HII" + key);

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(
        this.basePublicUrl + "/dbkl/getDailyMTBInquiryInforByMTB",
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          //console.log(this.data);
          
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
      let body1 ={
        id_mtb: this.mtbidss,
      }
      let headers1 = {
        "Content-Type": "application/json",

        
      };
      this.http
        .post(
          this.basePublicUrl + "/dbkl/getMTBOfficer",
          body1,
          { headers: headers1 }
        )
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.mtbnames = res[0];
           // console.log("ggyyuyufyu",this.mtbnames);
            
          },
          (error) => {
            this.loginError = true;
            this.errorMsg = error["error"]["message"];
          }
        );
  }

  selectChangeHandler(event: any) {
    this.selectedParlimen = event.target.value;
    this.check=false;
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.basePublicUrl + "/dbkl/getLokasi/" + this.selectedParlimen, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.parliament = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "",
      }),
    ],
    zoom: 12,
    center: L.latLng(3.139, 101.6869),
  };
  onMapReady(map: L.Map) {
    this.map = map;
  }
  backtotop() {
    window.scroll(0, 0);
  }

  showmap() {
    this.mapview = true;
  }
  reintializemap() {
    document.getElementById("mapId").innerHTML =
      "<div id='map' style='width: 100%; height: 100%;'></div>";
    var osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      osmAttribution =
        'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
        ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      osmLayer = new L.TileLayer(osmUrl, {
        maxZoom: 18,
        attribution: osmAttribution,
      });
    this.map = new L.Map("map");
    this.map.setView(new L.LatLng(3.139, 101.6869), 12);
    this.map.addLayer(osmLayer);
  }
  onReset() {
    this.reintializemap();
    this.Location=undefined;
    this.selectedParlimen=undefined
    // window.location.reload();
    $('input[type="checkbox"]:checked').prop("checked", false);
    // $("#inlineRadio1").prop("checked", false);
    // $("#inlineRadio2").prop("checked", true);
    // $("#jkas2").hide();
    this.selectservices = [];

    this.parliament = [];

    // $("#jkas3").show();

    // this.mapview = false;
    // this.selectservices = [];
    $("#select").prop("selectedIndex", 0);
    $("#select1").prop("selectedIndex", 0);
    // $(".vehicle").prop("checked", false); // Unchecks it
  }
  settings = {
    actions: false,
    // selectMode: 'multi',
    // actions: {
    //   position: 'right',
    //   edit: false,
    //   add: false,
    //   new: false,
    //   custom: [{ name: 'routeToUpdateFeedback', title: `Edit ` }],
    // },
    columns: {
      masa: {
        title: "Masa",
      },
      lokasi_aduan: {
        title: "Lokasi Aduan",
      },
      lokasi_siasatan: {
        title: "Lokasi Siasatan",
      },
      borang_siasatan: {
        title: "Borang Siasatan",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=" +
            "/" +
            this.lang +
            "/dbkl/complaintinvestigation?value1=" +
            this.id +
            "&value2=" +
            row.masa +
            "&value3=" +
            this.date +
            "&alue5=" +
            this.parliamen +
            ">" +
            "BORANG KERJA DI LAPANGAN" +
            "</a>"
          );
        },
      },
    },
  };
  selectedvalue(event: any) {
    var rowId = event.target.value;
    var checked = event.target.checked;
    if (checked) {
      this.selectservices.push(rowId);
    } else {
      var index = this.selectservices.indexOf(rowId);
      this.selectservices.splice(index, 1);
    }
    // console.log(this.selectservices)
  }

  getLocation(event) {
    this.Location = event.target.value;
    this.check1 = false;
  }

  Search() {
    if (this.selectedParlimen == undefined && this.Location == undefined) {
      this.check = true;
      this.check1 = true;
      return;
    }
    if (this.selectedParlimen == undefined || this.selectedParlimen == "") {
      this.check = true;
      return;
    }
    if (
      this.Location == undefined ||
      this.Location == "" ||
      this.Location == null
    ) {
      this.check1 = true;
      return;
    }

    

    this.stringval = JSON.stringify(this.selectservices);
    this.service = this.stringval.substring(1, this.stringval.length - 1);
    this.afterreplace = this.service.replace(/"/g, "");
    // console.log(this.afterreplace);
    this.spinner.show();
    this.accessToken = localStorage.getItem("dbkl_access_token");
    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: this.accessToken,
    };

    let body = {
      parlimen: this.selectedParlimen,
      lokasi: this.Location,
      service_list: this.afterreplace,
    };
    // console.log(body);

    this.http
      .post(
        environment.basePublicUrl + "/dbkl/getSapuanCucianCoordinates",
        body,
        { headers: headers }
      )
      .subscribe((data) => {
        // console.log(JSON.stringify(data));
        this.latituteAndlongitute = data;
       
        
        
        this.reintializemap();
        this.spinner.hide();
        for (let i = 0; i < this.selectservices.length; i++) {
         
          
          if (this.selectservices[i] == "Jalan") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].jalan.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].jalan[j].latitude)
              this.marker = L.marker(
                [
                  this.latituteAndlongitute[0].services[i].jalan[j].latitude,
                  this.latituteAndlongitute[0].services[i].jalan[j].longitude,
                ],
                { icon: this.redtickicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Sapuan Jejentas") {
            for (
              let j = 0;
              j <
              this.latituteAndlongitute[0].services[i].sapuan_jejentas.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].sapuan_jejentas[j].latitude)
              this.marker1 = L.marker(
                [
                  this.latituteAndlongitute[0].services[i].sapuan_jejentas[j]
                    .latitude,
                  this.latituteAndlongitute[0].services[i].sapuan_jejentas[j]
                    .longitude,
                ],
                { icon: this.blueicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "TPKK") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].tpkk.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].tpkk[j].latitude)
              this.marker3 = L.marker(
                [
                  this.latituteAndlongitute[0].services[i].tpkk[j].latitude,
                  this.latituteAndlongitute[0].services[i].tpkk[j].longitude,
                ],
                { icon: this.yellowtickicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Kaw Lapang") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].kaw_lapang.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].longkang[j].latitude)
              this.marker4 = L.marker(
                [
                  this.latituteAndlongitute[0].services[i].kaw_lapang[j].latitude,
                  this.latituteAndlongitute[0].services[i].kaw_lapang[j]
                    .longitude,
                ],
                { icon: this.greentickicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Cucian Jejentas") {
            for (
              let j = 0;
              j <
              this.latituteAndlongitute[0].services[i].cucian_jejentas.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].longkang[j].latitude)
              this.marker5 = L.marker(
                [
                  this.latituteAndlongitute[0].services[i].cucian_jejentas[j]
                    .latitude,
                  this.latituteAndlongitute[0].services[i].cucian_jejentas[j]
                    .longitude,
                ],
                { icon: this.orangeicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Siar Kaki") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].siar_kaki.length;
              j++
            ) {
              // console.log(this.latituteAndlongitute[0].services[i].siar_kaki[j].latitude)
              L.marker(
                [
                  this.latituteAndlongitute[0].services[i].siar_kaki[j]
                    .latitude,
                  this.latituteAndlongitute[0].services[i].siar_kaki[j]
                    .longitude,
                ],
                { icon: this.purpleicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Siar Kaki Berbumbung") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].siar_kaki_berbumbung.length;
              j++
            ) {
              // console.log(                this.latituteAndlongitute[0].services[i].kaw_lapang[j].latitude  );
              L.marker(
                [
                  this.latituteAndlongitute[0].services[i].siar_kaki_berbumbung[j]
                    .latitude,
                  this.latituteAndlongitute[0].services[i].siar_kaki_berbumbung[j]
                    .longitude,
                ],
                { icon: this.redtickicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Stesen Bas") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].stesen_bas.length;
              j++
            ) {
              // console.log( this.latituteAndlongitute[0].services[i].stesen_bas[j].latitude         );
              L.marker(
                [
                  this.latituteAndlongitute[0].services[i].stesen_bas[j]
                    .latitude,
                  this.latituteAndlongitute[0].services[i].stesen_bas[j]
                    .longitude,
                ],
                { icon: this.tealicon }
              ).addTo(this.map);
            }
          } else if (this.selectservices[i] == "Longkang") {
            for (
              let j = 0;
              j < this.latituteAndlongitute[0].services[i].longkang.length;
              j++
            ) {
              //  console.log(        this.latituteAndlongitute[0].services[i].longkang[j].latitude         );
              L.marker(
                [
                  this.latituteAndlongitute[0].services[i].longkang[j].latitude,
                  this.latituteAndlongitute[0].services[i].longkang[j]
                    .longitude,
                ],
                { icon: this.blacktick }
              ).addTo(this.map);
            }
          }
        }

        // for (let i = 0; i < this.latituteAndlongitute[0].services.length; i++) {
        //   this.serviceesname.push(this.latituteAndlongitute[0].services[i].service)
        //   // console.log(this.serviceesname)
        // }

        // for (let i = 0; i < this.latituteAndlongitute[0].sapuan_jejentas_coordinates.length; i++) {
        //   // console.log(this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude)

        //   const leafletMarkers = L.layerGroup([
        //     L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon5 }),
        //     L.marker([this.latituteAndlongitute[1].jalan_coordinates[i].latitude, this.latituteAndlongitute[1].jalan_coordinates[i].longitude], { icon: this.redtickicon }),
        //     L.marker([this.latituteAndlongitute[2].tpkk_coordinates[i].latitude, this.latituteAndlongitute[2].tpkk_coordinates[i].longitude], { icon: this.greenIcon6 }),
        //     L.marker([this.latituteAndlongitute[3].longkang_coordinates[i].latitude, this.latituteAndlongitute[3].longkang_coordinates[i].longitude], { icon: this.greenIcon }),
        //     L.marker([this.latituteAndlongitute[4].cucian_jejentas_coordinates[i].latitude, this.latituteAndlongitute[4].cucian_jejentas_coordinates[i].longitude], { icon: this.greenIcon }),
        //     L.marker([this.latituteAndlongitute[5].siar_kaki_coordinates[i].latitude, this.latituteAndlongitute[5].siar_kaki_coordinates[i].longitude], { icon: this.redtickicon }),
        //     L.marker([this.latituteAndlongitute[6].kaw_lapang_coordinates[i].latitude, this.latituteAndlongitute[6].kaw_lapang_coordinates[i].longitude], { icon: this.greenIcon }),
        //     L.marker([this.latituteAndlongitute[7].stesen_bas_coordinates[i].latitude, this.latituteAndlongitute[7].stesen_bas_coordinates[i].longitude], { icon: this.greenIcon7 }),
        //     L.marker([this.latituteAndlongitute[8].longkang_coordinates[i].latitude, this.latituteAndlongitute[8].longkang_coordinates[i].longitude], { icon: this.greenIcon2 }),
        //     // L.marker([3.21985, 101.6413], { icon: this.greenIcon }),
        //     // L.marker([3.20215983, 101.67105934], { icon: this.greenIcon }),
        //   ]);
        //   leafletMarkers.addTo(this.map);

        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[1].jalan_coordinates[i].latitude, this.latituteAndlongitute[1].jalan_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);
        //   // L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon }).addTo(this.map);

        // }
      });
  }
  
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
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

          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  getDailyWorkInfo () {
    this.spinner.show();
    let body = {
      tarikh: this.date,
      officer_name: this.userId,
    };
    //console.log(body);
    

    let key = localStorage.getItem("AccessToken");

    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/getDailyMTBInquiryInforByMTK", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
        //  console.log(this.data);
          
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
}
