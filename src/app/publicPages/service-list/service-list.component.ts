import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { latLng, tileLayer } from "leaflet";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-service-list",
  templateUrl: "./service-list.component.html",
  styleUrls: ["./service-list.component.css"],
})
export class ServiceListComponent implements OnInit {
  publicServiceGroup: any;
  username: string = "";
  baseUrl = environment.basePublicUrl;
  public_access_token: any;
  markers: L.Layer[] = [];
  parliamens = [
    "BATU",
    "KEPONG",
    "SEGAMBUT",
    "TITIWANGSA",
    "SETIAWANGSA",
    "WANGSA MAJU",
    "BUKIT BINTANG",
    "LEMBAH PANTAI",
    "BANDAR TUN RAZAK",
    "SEPUTEH",
    "CHERAS",
  ];
  json;
  json1;
  map;
  selectedGuest: any;
  selectedGuest1: any;
  subarray: any = [];
  FinalCordinates: string;
  CordiantesArr: any = [];
  subCordinates: string;
  greenIcon = L.icon({
    iconUrl: "../../../assets/img/marker.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    shadowSize: [20, 30],
  });

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
  myarray: Object;
  subarray1: any = [];
  isUser: string;
  long: any;
  location: any = [];
  home: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.http.get("assets/data/Kuala_lumpur1.json").subscribe((res) => {
      this.json = res;
      L.geoJSON(this.json).addTo(this.map);

      const leafletMarkers = L.layerGroup([
        L.marker([3.214, 101.6356], { icon: this.greenIcon }),
        L.marker([3.1917, 101.6734], { icon: this.greenIcon }),
        L.marker([3.1705, 101.6905], { icon: this.greenIcon }),
        L.marker([3.2038, 101.7367], { icon: this.greenIcon }),
        L.marker([3.183, 101.7462], { icon: this.greenIcon }),
        L.marker([3.177539, 101.664505], { icon: this.greenIcon }),
        L.marker([3.1068, 101.7259], { icon: this.greenIcon }),
        L.marker([3.092, 101.7211], { icon: this.greenIcon }),
        L.marker([3.1134, 101.68], { icon: this.greenIcon }),
        L.marker([3.21985, 101.6413], { icon: this.greenIcon }),
        L.marker([3.20215983, 101.67105934], { icon: this.greenIcon }),
      ]);
      leafletMarkers.addTo(this.map);
    });

    this.http.get("assets/data/mapdata.json").subscribe((data) => {
      // console.log(data);
      this.json1 = data;
    });
  }

  addMarker(latlng) {
    // console.log("my data" + latlng);
    var array = [];
    array.push(latlng.split(","));
    // console.log(array);
    var lat = array[0][0];
    var lng = array[0][1];

    const newMarker = L.marker([lat, lng], { icon: this.greenIcon })
      .bindPopup("Anil")
      .addTo(this.map);
    this.map.setView([lat, lng], 20);
    newMarker;
    newMarker.bindPopup("latitide" + lat + "" + "and " + "longitute" + lng, {
      closeButton: true,
    });
    newMarker.addTo(this.map);
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  getValue(event) {
    let v = event;

    for (let key of this.subarray1) {
      if (key.includes(v)) {
        // console.log(key);
        let loc = key.split("|");
        this.long = loc[1];
        // console.log(this.long);
      }
    }
    var latlang = [];
    // console.log(this.selectedGuest1);
    // latlang.push(this.selectedGuest1.split("|"));
    // this.FinalCordinates = JSON.stringify(latlang[0][1]);
    // // console.log(      this.FinalCordinates.substring(1, this.FinalCordinates.length - 1) );
    // this.subCordinates = this.FinalCordinates.substring(
    //   1,
    //   this.FinalCordinates.length - 1
    // );
    this.CordiantesArr.push(this.long.split(","));
    // console.log(this.CordiantesArr);
    const latitute = this.CordiantesArr[0][0];
    const longitute = this.CordiantesArr[0][1];
    // console.log("my latitute nd logitute" + latitute + longitute);
    this.addMarker(this.long);
  }

  ngOnInit() {
     if (!this.public_access_token) {
      this.router.navigateByUrl("/publicLogin");
    }

    $("#data1").prop("selectedIndex", 0);

    localStorage.setItem("path", "public/servicelist");
    this.selectedGuest = "";
    // this.selectedGuest1 = "";
    window.scroll(0, 0);
    this.username = localStorage.getItem("username");
    this.public_access_token = localStorage.getItem("public_access_token");
    this.isUser = localStorage.getItem("isUser");
    this.publicServiceGroup = new FormGroup({
      Domestik: new FormControl("", [Validators.required]),
      Pukal: new FormControl("", [Validators.required]),
    });
  }
  reset(lat, lng) {
    this.subarray = [];
    // this.map.panTo(new L.LatLng(lat, lng));
    this.map.setView([lat, lng], 12);
    this.selectedGuest = "";
    // this.selectedGuest1 = "";
    $("#data1").prop("selectedIndex", 0);
  }
  backtotop(){
    window.scroll(0, 0);
    this.home();
  }
  logout() {
    this.spinner.show();

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
        (error) => {}
      );
  }
  getParliament() {
    this.spinner.show();
    this.subarray1 = [];

    let body = {
      parlimen: this.selectedGuest,
    };

    this.http
      .post(environment.basePublicUrl + "/public/mapKawasanPerkhidmatan", body)
      .subscribe((data) => {
        this.spinner.hide();
        this.subarray = data;
        // console.log("my response is thiss" + JSON.stringify(this.subarray));
        var i = 0;
        var j = 0;
        var values;
        var lati;
        var long;
        var status1;
        var count = 0;
        for (i; i < this.subarray.length; i++) {
          for (let k = 0; k < this.subarray[j].lokasi.length; k++) {
            values = this.subarray[j].lokasi[k].Lokasi;
            lati = this.subarray[j].lokasi[k].latitude;
            long = this.subarray[j].lokasi[k].longitude;
            status1 = this.subarray[j].lokasi[k].status;
            this.location.push(values);
            this.subarray1.push(values + "," + "|" + lati + "," + long);
            count++;
            // console.log(count);
          }
          j++;
        }
      });
  }
}
