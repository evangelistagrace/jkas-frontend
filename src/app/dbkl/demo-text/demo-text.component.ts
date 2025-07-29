
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { latLng, tileLayer } from "leaflet";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import * as esri from 'esri-leaflet';
@Component({
  selector: "app-service-list",
  templateUrl: "./demo-text.component.html",
  styleUrls: ["./demo-text.component.css"],
})
export class DemoTextComponent implements OnInit {
  json1: Object;
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
  // options = {​
  //   layers: [
  //     L.tileLayer("http://{​s}​.tile.openstreetmap.org/{​z}​/{​x}​/{​y}​.png", {​
  //       maxZoom: 18,
  //       attribution: "",
  //     }​),
  //   ],
  //   zoom: 12,
  //   center: L.latLng(3.139, 101.6869),
  // }​;
  myarray: Object;
  subarray1: any = [];
  isUser: string;
  token: string;
  location: any = [];
  long: any;
  json;
  map: L.Map;
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.http.get("assets/data/Kuala_lumpur1.json").subscribe((res) => {
      this.json = res;
      L.geoJSON(this.json).addTo(this.map);
    })
  }
  ngOnInit(): void {
    this.map = L.map('map').setView([3.1390, 101.6869], 11);
    esri.basemapLayer("Streets").addTo(this.map);
    var parks = esri.featureLayer({
      url: "https://kluo.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/3",
      style: function () {
        return { color: "black", weight: 2 };
      }
    }).addTo(this.map);
  }
}





