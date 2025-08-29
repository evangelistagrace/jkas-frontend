import { HttpClient } from "@angular/common/http";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import esriRequest from "@arcgis/core/request";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Point from "@arcgis/core/geometry/Point";
import Field from "@arcgis/core/layers/support/Field";


import * as L from "leaflet";
import { loadModules } from "esri-loader";
import esri = __esri;
import * as jsonUtils from "esri/geometry/support/jsonUtils";

declare var parlimenURL: string;

// import { timeStamp } from "console";
@Component({
  selector: "app-mtbcomplaint-daily-job-info1",
  templateUrl: "./mtbcomplaint-daily-job-info1.component.html",
  styleUrls: ["./mtbcomplaint-daily-job-info1.component.css"],
})
export class MtbcomplaintDailyJobInfo1Component implements OnInit {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  mapCenter = [101.6869, 3.139];
  basemapType = "osm";
  mapZoomLevel = 12;

  // See app.component.html

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 12;
  private _center: Array<number> = [101.6869, 3.139];
  private _basemap = "osm";
  private _loaded = false;
  private _view: esri.MapView = null;

  parlimenLayer: any;
  Point: any;
  Graphic: any;
  TextSymbol: any;
  aftersort: any = [];
  lang: string;
  userrole: string;
  isAdminType: string;
  username: string;
  mtbid: string;
  getMtb: any;
  mtbids: void;
  mtbis: string;

  get mapLoaded (): boolean {
    return this._loaded;
  }

  @Input()
  set zoom (zoom: number) {
    this._zoom = zoom;
  }

  get zoom (): number {
    return this._zoom;
  }

  @Input()
  set center (center: Array<number>) {
    this._center = center;
  }

  get center (): Array<number> {
    return this._center;
  }

  @Input()
  set basemap (basemap: string) {
    this._basemap = basemap;
  }

  get basemap (): string {
    return this._basemap;
  }

  basePublicUrl = environment.basePublicUrl;
  data: any = [];
  loginError: boolean;
  errorMsg: any;
  parliamen: any;
  id: any;
  date: any;
  p: any;
  selectedParlimen: any;
  parliamen1: Object;
  parliament: Object;
  check: boolean;
  check1: boolean;
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
  ];
  greenIcon = L.icon({
    iconUrl: "../../../assets/img/marker.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon1 = L.icon({
    iconUrl: "../../../assets/img/imageedit_1_9206634111.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon2 = L.icon({
    iconUrl: "../../../assets/img/black_tick.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon3 = L.icon({
    iconUrl: "../../../assets/img/MicrosoftTeams-image.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon4 = L.icon({
    iconUrl: "../../../assets/img/green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon5 = L.icon({
    iconUrl: "../../../assets/img/blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon6 = L.icon({
    iconUrl: "../../../assets/img/yellow.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [35, 35],
    shadowSize: [20, 30],
  });

  greenIcon7 = L.icon({
    iconUrl: "../../../assets/img/green1.png",
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
  graphicsLayer: any;
  workPointDone = false;
  path: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
   
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
   // console.log(this.id);
    
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    localStorage.setItem(
      "path",
      "/dbkl/mtbmap?value=" +
      this.date +
      "&value2=" +
      this.id +
      "&value3=" +
      this.parliamen
    );
    // this.spinner.show();
    this.getDailyWorkInfo();

    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = {
      officer_name: this.id,
    };
    this.http
      .post(this.basePublicUrl + "/dbkl/getMTB" ,body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.getMtb=res[0];
        //  console.log(this.getMtb);
          },        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }

  addWorkPoints () {
    if (this.workPointDone) {
     // console.log('added already')
      return
    }
    if (!this.data) {
     // console.log('No data')
      return
    }

    if (this.data.length === 0) {
     // console.log('array 0')
      return
    }
    if (!this.graphicsLayer) {
     // console.log('no gl')
      return
    }

    for (let c = 0; c < this.data.length; ++c) {
      var p = this.data[c].lokasi_siasatan.split(',')
      if (p.length !== 2) {
      //  console.log('lokasi_siasatan error')
        break
      }
      const x = Number(p[1])
      const y = Number(p[0])
      /*
      const point = {
        type: "point", // autocasts as new Point()
        x: x,
        y: y,
      };
      */
      const point = new Point({
        x: x,
        y: y,
      })

      const markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      const textSymbol = {
        type: "text", // autocasts as new TextSymbol()
        color: "#7A003C",
        text: "\ue675", //"\ue61d", // esri-icon-map-pin
        font: {
          // autocasts as new Font()
          size: 20,
          family: "CalciteWebCoreIcons" // Esri Icon Font
        }
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol //markerSymbol
      });

      this.graphicsLayer.add(pointGraphic);
    }
    this.workPointDone = true
  }
  fixLayer (l: { features: { attributes: any; geometry: any; }[]; fields: any; }) {
    let features = l.features.map((item: { attributes: any; geometry: any; }) => ({
      attributes: item.attributes,
      geometry: { ...item.geometry, type: 'polygon' }
    }))
    //console.log(features[0].geometry)
    const fields = [
      new Field({
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }), new Field({
        name: "KAWASANPAR",
        alias: "Description",
        type: "string"
      }), new Field({
        name: "LUASEKAR",
        alias: "LUASEKAR",
        type: "double"
      })
    ];

    let out = {
      title: 'PARLIMEN',
      source: features,
      fields: fields,
      objectIdField: "OBJECTID"
    }
  //  console.log(out)
    return out
  }

  async getParlimenLayer () {
    const u = parlimenURL + '/query'
    let sls = new SimpleLineSymbol({
      color: "orange",
      width: "3px",
      style: "short-dot"
    })
    let parlimenRenderer = new SimpleRenderer({
      symbol: sls
    })
    const query = {
      f: 'json',
      where: '1=1',
      returnDistinctValues: false,
      returnGeometry: true,
      outFields: '*'
    }
    let that = this
    try {
      var response = await esriRequest(u, {
        responseType: "json",
        query: query
      })
      let p = response.data
   //   console.log(p);
      that.parlimenLayer = new FeatureLayer(that.fixLayer(p))
      that.parlimenLayer.renderer = parlimenRenderer

    } catch (error) {
     // console.log(error)
      alert('Ralat mendapatkan data sempadan Parlimen')
    }
  }

  async initMap () {
    await this.getParlimenLayer()
    let map = new Map({ basemap: 'topo' })
    this._view = new MapView({
      map: map,
      container: "mapViewNode",
      center: [101.7099022, 3.1574851], // klcc 3.1574851,101.7099022
      zoom: 12
    });
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    this.graphicsLayer = graphicsLayer
    await this._view.when();
    let scaleBar = new ScaleBar({
      view: this._view
    });
    // Add widget to the bottom left corner of the view
    this._view.ui.add(scaleBar, {
      position: "bottom-left"
    });

    let search = new Search({
      view: this._view
    });
    this._view.ui.add(search,
      { position: "top-right" }
    );

    let basemapGallery = new BasemapGallery({
      view: this._view
    });
    let galleryExpand = new Expand({
      expandIconClass: "esri-icon-collection", // "esri-icon-basemap", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      expandTooltip: "Basemaps List", // optional, defaults to "Expand" for English locale
      view: this._view,
      content: basemapGallery,
      label: 'Basemap'
    });
    this._view.ui.add(galleryExpand,
      { position: "top-right", index: 2 }
    );

    this.addWorkPoints()
    return this._view;
  }

  async initializeMap () {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [
        EsriMap,
        EsriMapView,
        FeatureLayer,
        parser,
        Graphic,
        GraphicsLayer,
        TextSymbol,
        Point,
      ] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "dojo/parser",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/symbols/TextSymbol",
        "esri/geometry/Point",
      ]);
      console.error('loadmodule success')
    //  console.log(this.data)
      this.Point = Point;
      this.Graphic = Graphic;
      this.TextSymbol = TextSymbol;

      let map = new EsriMap({ basemap: 'topo' })
      this._view = new EsriMapView({
        map: map,
        container: "mapViewNode",
        center: [101.7099022, 3.1574851], // klcc 3.1574851,101.7099022
        zoom: 12
      });
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      this.graphicsLayer = graphicsLayer
      await this._view.when();
      this.addWorkPoints()
      return this._view;
    } catch (error) {
      // console.log("EsriLoader: ", error);
    }
  }

  async initializeMap1 () {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [
        EsriMap,
        EsriMapView,
        FeatureLayer,
        parser,
        Graphic,
        GraphicsLayer,
        TextSymbol,
        Point,
      ] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "dojo/parser",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/symbols/TextSymbol",
        "esri/geometry/Point",
      ]);
      console.error('loadmodule2 success')
     // console.log(this.data)
      this.Point = Point;
      this.Graphic = Graphic;
      // this.GraphiscLayer = GraphicsLayer
      this.TextSymbol = TextSymbol;
      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);
      const citiesLayer = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Segambut_MIL1/MapServer",
      });
      map.add(citiesLayer);
      const citiesLayer1 = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Batu_MIL1/MapServer",
      });
      map.add(citiesLayer1);
      const citiesLayer2 = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Kepong_MIL1/MapServer",
      });
      map.add(citiesLayer2);
      const citiesLayer3 = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Seputeh_MIL1/MapServer",
      });
      map.add(citiesLayer2);
      const citiesLayer4 = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Bukit_Bintang_MIL1/MapServer",
      });
      map.add(citiesLayer4);

      // for multiple feaure layer
      // const citiesLayer1 = new FeatureLayer({
      //   url: "http://g-aset.dbkl.gov.my/gasset1/rest/services/ZAC/SEGAMBUT/MapServer/0"
      // });
      // map.add(citiesLayer1);
      // const citiesLayer2 = new FeatureLayer({
      //   url: "http://g-aset.dbkl.gov.my/gasset1/rest/services/ZAC/SEGAMBUT/MapServer/1"
      // });
      // map.add(citiesLayer2);
      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
      };

      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;
    } catch (error) {
    //  console.log("EsriLoader: ", error);
    }
  }

  ngOnInit () {
    this.mtbis=localStorage.getItem("mtbids");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    this.date = this.route.snapshot.queryParamMap.get("value");
    this.id = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value3");
    this.lang = localStorage.getItem("lang");
   // console.log("hghggvg",this.id);
    
    localStorage.setItem(
      "path",
      "/dbkl/mtbmap?value=" +
      this.date +
      "&value2=" +
      this.id +
      "&value3=" +
      this.parliamen
    );

    // let key = localStorage.getItem("AccessToken");
    // let headers = {
    //   "Content-Type": "application/json",
    //   Authorization: key,
    // };
    // let body = {
    //   officer_name: this.id,

    // };
    // this.http
    //   .post(this.basePublicUrl + "/dbkl/getMTB" ,body, {
    //     headers: headers,
    //   })
    //   .subscribe(
    //     (res) => {
    //       this.spinner.hide();
    //       this.getMtb=res[0];
    //       console.log(this.getMtb);
    //     localStorage.setItem("mtbids",this.getMtb)
    //     },
    //     (error) => {
    //       this.loginError = true;
    //       this.errorMsg = error["error"]["message"];
    //     }
    //   );
    this.initMap().then((mapView) => {
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
    /*
    this.initializeMap().then((mapView) => {
      // The map has been initialized
      // console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
    */

    window.scroll(0, 0);
    $(document).ready(function () {
      $("#jkas2").hide();
      $("#mapView").hide();
    });
    $(document).ready(function () {
      $("input[name$='inlineRadioOptions']").click(function () {
        var test = $(this).val();

        $(".desc").hide();
        $("#jkas" + test).show();
      });
    });
    
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
      rujukan: {
        title: "NO RUJUKAN/ADUAN",
        type: "html",
        valuePrepareFunction: (cell, row) => {
          return (
            "<a href=\"dbkl/complaintinvestigation?inquiryId=" + row.id + "\">" + row.rujukan + "</a>"
          );
        },
      },
      lokasi_aduan: {
        title: "LOKASI KERJA HARIAN/ADUAN",
      }
    },
  };

  ngOnDestroy () {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
    // "Segambut",
    // "Titiwangsa",
    // "Wangsa Maju",
    // "Batu",
    // "Kepong",
    // "Cheras",
    // "Bukit Bintang",
    // "Seputeh",
    // "Setiwangsa",
    // "Bandar Tun Razak"
  }
  selectChangeHandler (event: any) {
    this.selectedParlimen = event.target.value;
    this.check = false;

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
  onMapReady (map: L.Map) {
    this.map = map;
  }
  backtotop () {
    window.scroll(0, 0);
  }
  onReset () {
    // window.location.reload();
    $('input[type="checkbox"]:checked').prop("checked", false);
    // this.map.setView([3.139, 101.6869], 12);
    this.selectservices = [];
    this.parliament = [];
    this.serviceesname = [];
    this.initializeMap1();
    $("#select").prop("selectedIndex", 0);
    $("#select1").prop("selectedIndex", 0);
    // $(".vehicle").prop("checked", false); // Unchecks it
    this.check = false;
    this.check1 = false;
  }

  selectedvalue (event) {
    // event.target.value;
    // this.selectservices.push(event.target.value);
    // for(let i=0;i<this.selectservices.length;i++){
    //   if(this.selectservices[i]== event.target.value){
    //     this.selectservices.splice(i,1);
    //   }
    // }
    // console.log(this.selectservices);
    // let obj = {
    //   "order": env.target.value
    // }

    // if (env.target.checked) {
    //   // Pushing the object into array
    //   this.selectservices.push(obj);

    // } else {
    //   let removeIndex = this.selectservices.findIndex(itm => itm.order === env.target.value);

    //   if (removeIndex !== -1)
    //     this.selectservices.splice(removeIndex, 1);
    // }

    //Duplicates the obj if we uncheck it
    //How to remove the value from array if we uncheck it
    // console.log(this.selectservices);
    var rowId = event.target.value;
    var checked = event.target.checked;
    // console.log(checked)
    if (checked) {
      this.selectservices.push(rowId);
    } else {
      var index = this.selectservices.indexOf(rowId);
      this.selectservices.splice(index, 1);
    }

    //console.log(this.selectservices);
  }

  getLocation (event) {
    this.Location = event.target.value;
    this.check1 = false;
  }

  Search () {
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
    // console.log("this is the array" + this.selectservices.length);

    // for (let i = 0; i < this.selectservices.length; i++) {
    //   this.aftersort.push(this.selectservices[i].order);
    //   console.log("after sort" + this.aftersort)
    // }
    this.spinner.show();
    this.stringval = JSON.stringify(this.selectservices);
    this.service = this.stringval.substring(1, this.stringval.length - 1);
    this.afterreplace = this.service.replace(/"/g, "");

    // if (this.selectedParlimen == "Batu") {
    //   this._view.center = new this.Point(101.684, 3.2379);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Segambut") {
    //   this._view.center = new this.Point(101.6734, 3.1917);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Titiwangsa") {
    //   this._view.center = new this.Point(101.7077, 3.1774);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Wangsa Maju") {
    //   this._view.center = new this.Point(101.7367, 3.2038);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Kepong") {
    //   this._view.center = new this.Point(101.6356, 3.214);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Cheras") {
    //   this._view.center = new this.Point(101.7259, 3.1068);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Bukit Bintang") {
    //   this._view.center = new this.Point(101.7113, 3.1468);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Seputeh") {
    //   this._view.center = new this.Point(101.6815, 3.1134);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Setiwangsa") {
    //   this._view.center = new this.Point(101.7462, 3.183);
    //   this._view.zoom = 15;
    // } else if (this.selectedParlimen == "Bandar Tun Razak") {
    //   this._view.center = new this.Point(101.7211, 3.092);
    //   this._view.zoom = 15;
    // }

    //console.log(this.afterreplace);

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
    //console.log(body);

    this.http
      .post(
        environment.basePublicUrl + "/dbkl/getSapuanCucianCoordinates",
        body,
        { headers: headers }
      )
      .subscribe((data) => {
       // console.log(JSON.stringify(data));

        this.initializeMap1();
        this.latituteAndlongitute = data;

        this.initializeMap();
        this.spinner.hide();

        // for (let i = 0; i < this.selectservices.length; i++) {
        //   if (this.selectservices[i] == "Jalan") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].jalan.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].jalan[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].jalan[j].latitude,
        //           this.latituteAndlongitute[0].services[i].jalan[j].longitude,
        //         ],
        //         { icon: this.greenIcon3 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Sapuan Jejentas") {
        //     for (
        //       let j = 0;
        //       j <
        //       this.latituteAndlongitute[0].services[i].sapuan_jejentas.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].sapuan_jejentas[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].sapuan_jejentas[j]
        //             .latitude,
        //           this.latituteAndlongitute[0].services[i].sapuan_jejentas[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon5 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "TPKK") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].tpkk.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].tpkk[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].tpkk[j].latitude,
        //           this.latituteAndlongitute[0].services[i].tpkk[j].longitude,
        //         ],
        //         { icon: this.greenIcon6 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Longkang") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].longkang.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].longkang[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].longkang[j].latitude,
        //           this.latituteAndlongitute[0].services[i].longkang[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon1 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Cucian Jejentas") {
        //     for (
        //       let j = 0;
        //       j <
        //       this.latituteAndlongitute[0].services[i].cucian_jejentas.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].longkang[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].cucian_jejentas[j]
        //             .latitude,
        //           this.latituteAndlongitute[0].services[i].cucian_jejentas[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon4 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Siar Kaki") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].siar_kaki.length;
        //       j++
        //     ) {
        //       // console.log(this.latituteAndlongitute[0].services[i].siar_kaki[j].latitude)
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].siar_kaki[j]
        //             .latitude,
        //           this.latituteAndlongitute[0].services[i].siar_kaki[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon3 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Kaw Lapang") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].kaw_lapang.length;
        //       j++
        //     ) {
        //       console.log(
        //         this.latituteAndlongitute[0].services[i].kaw_lapang[j].latitude
        //       );
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].kaw_lapang[j]
        //             .latitude,
        //           this.latituteAndlongitute[0].services[i].kaw_lapang[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon6 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Stesen Bas") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].stesen_bas.length;
        //       j++
        //     ) {
        //       console.log(
        //         this.latituteAndlongitute[0].services[i].stesen_bas[j].latitude
        //       );
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].stesen_bas[j]
        //             .latitude,
        //           this.latituteAndlongitute[0].services[i].stesen_bas[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon7 }
        //       ).addTo(this.map);
        //     }
        //   } else if (this.selectservices[i] == "Longkang") {
        //     for (
        //       let j = 0;
        //       j < this.latituteAndlongitute[0].services[i].longkang.length;
        //       j++
        //     ) {
        //       console.log(
        //         this.latituteAndlongitute[0].services[i].longkang[j].latitude
        //       );
        //       L.marker(
        //         [
        //           this.latituteAndlongitute[0].services[i].longkang[j].latitude,
        //           this.latituteAndlongitute[0].services[i].longkang[j]
        //             .longitude,
        //         ],
        //         { icon: this.greenIcon2 }
        //       ).addTo(this.map);
        //     }
        //   }
        // }

        // for (let i = 0; i < this.latituteAndlongitute[0].services.length; i++) {
        //   this.serviceesname.push(this.latituteAndlongitute[0].services[i].service)
        //   // console.log(this.serviceesname)
        // }

        // for (let i = 0; i < this.latituteAndlongitute[0].sapuan_jejentas_coordinates.length; i++) {
        //   // console.log(this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude)

        //   const leafletMarkers = L.layerGroup([
        //     L.marker([this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].latitude, this.latituteAndlongitute[0].sapuan_jejentas_coordinates[i].longitude], { icon: this.greenIcon5 }),
        //     L.marker([this.latituteAndlongitute[1].jalan_coordinates[i].latitude, this.latituteAndlongitute[1].jalan_coordinates[i].longitude], { icon: this.greenIcon3 }),
        //     L.marker([this.latituteAndlongitute[2].tpkk_coordinates[i].latitude, this.latituteAndlongitute[2].tpkk_coordinates[i].longitude], { icon: this.greenIcon6 }),
        //     L.marker([this.latituteAndlongitute[3].longkang_coordinates[i].latitude, this.latituteAndlongitute[3].longkang_coordinates[i].longitude], { icon: this.greenIcon }),
        //     L.marker([this.latituteAndlongitute[4].cucian_jejentas_coordinates[i].latitude, this.latituteAndlongitute[4].cucian_jejentas_coordinates[i].longitude], { icon: this.greenIcon }),
        //     L.marker([this.latituteAndlongitute[5].siar_kaki_coordinates[i].latitude, this.latituteAndlongitute[5].siar_kaki_coordinates[i].longitude], { icon: this.greenIcon3 }),
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

  getDailyWorkInfo () {
    this.spinner.show();
    let body = {
      tarikh: this.date,
      officer_name: this.id,
    };

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
        (res:any) => {
          this.spinner.hide();
          this.data = res;
         // console.log(this.data);
          
          this.addWorkPoints();
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  cancel () {
    window.history.back();// <-- go back to previous location on cancel
  }
  logout () {
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
}
