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
// import * as L from "leaflet";
import { environment } from "src/environments/environment";
import esri = __esri;
import { loadModules } from "esri-loader";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
@Component({
  selector: "app-merinyuanalysis",
  templateUrl: "./merinyuanalysis.component.html",
  styleUrls: ["./merinyuanalysis.component.css"],
})
export class MerinyuanalysisComponent implements OnInit {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  mapCenter = [101.6869, 3.139];
  basemapType = "osm";
  mapZoomLevel = 12;
  dates: any = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  // See app.component.html
  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 11;
  private _center: Array<number> = [101.6869, 3.139];
  private _basemap = "osm";
  private _loaded = false;
  private _view: esri.MapView = null;
  mtb_khalid: any = [];
  data: any = [];
  loginError: boolean;
  errorMsg: any;
  zone: any;
  mtkss: any;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  public href: string = "";
  url: string = "asdf";
  Point: any;
  Graphic: any;
  TextSymbol: any;
  clicked: boolean;
  cordinates: any = [];
  cordinates2: any = [];
  cordinates1: any = [];
  errorMessage: any;
  mtbsarray: any = [];
  dataValue: any = [];
  zonone: any;
  tarikh: any;
  isAdminType: string;
  username: string;
  showInvalid: boolean;

  get mapLoaded(): boolean {
    return this._loaded;
  }
  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }
  get zoom(): number {
    return this._zoom;
  }
  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }
  get center(): Array<number> {
    return this._center;
  }
  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }
  get basemap(): string {
    return this._basemap;
  }
  map: L.Map;
  zons: any = ["Utara", "Tengah", "Selatan"];
  years: any =["2020","2021","2022","2023"];
  getmtk: any;
  Mtkusers: any = [];
  month: any;
  year: any;
  DataToshow: any = [];
  datearray: any = [];
  mtbs: any = [];
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router

  ) { } // make variable private so that it would be accessible through out the component

  async initializeMap() {
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
        GeoJSONLayer
      ] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "dojo/parser",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/symbols/TextSymbol",
        "esri/geometry/Point",
        "esri/layers/GeoJSONLayer"
      ]);
      this.Point = Point;
      this.Graphic = Graphic;
      // this.GraphiscLayer = GraphicsLayer
      this.TextSymbol = TextSymbol;
      // const url = "https://gist.githubusercontent.com/heiswayi/81a169ab39dcf749c31a/raw/b2b3685f5205aee7c35f0b543201907660fac55e/malaysia.geojson";

      const template1 = {
        title: "Earthquake Info",
        content: "Magnitude {mag} {type} hit {place} on {time}",
        fieldInfos: [
          {
            fieldName: 'time',
            format: {
              dateFormat: 'short-date-short-time'
            }
          }
        ]
      };

      const renderer = {
        type: "simple",
        field: "mag",
        symbol: {
          type: "simple-marker",
          color: "orange",
          outline: {
            color: "white"
          }
        },
        visualVariables: [{
          type: "size",
          field: "mag",
          stops: [{
            value: 2.5,
            size: "4px"
          },
          {
            value: 8,
            size: "40px"
          }
          ]
        }]
      };

      const geojsonLayer = new GeoJSONLayer({
        url: "",
        copyright: "USGS Earthquakes",
        popupTemplate: template1,
        renderer: renderer //optional
      });
      // Configure the Map

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
        // layers: [geojsonLayer]
      };

      const template = {
        title: "Earthquake Info",
        content: "Magnitude {mag} {type} hit {place} on {time}",
        fieldInfos: [
          {
            fieldName: 'time',
            format: {
              dateFormat: 'short-date-short-time'
            }
          }
        ]
      };


      const map: esri.Map = new EsriMap(mapProperties);
      const citiesLayer = new FeatureLayer({
        url: "https://iwastekl.dbkl.gov.my/klgissvr/rest/services/Support_Layer_iwaste_MIL1/MapServer/3",

      });
      map.add(citiesLayer);
      if(this.data.length!=0){
     // console.log("...........................................................")
      if (this.clicked == true && this.zone == "Zon Tengah") {
        for (let i = 0; i < this.cordinates[this.mtbsarray[0]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[0]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[0]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "green",
            size: "10px", // Orange
            outline: {
              color: "green", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }
        for (let i = 0; i < this.cordinates[this.mtbsarray[1]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[1]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[1]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "blue",
            size: "10px", // Orange
            outline: {
              color: "blue", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[2]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",

            longitude: this.cordinates[this.mtbsarray[2]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[2]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "gray",
            size: "10px", // Orange
            outline: {
              color: "gray", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[3]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[3]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[3]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "red",
            size: "10px", // Orange
            outline: {
              color: "red", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }


        for (let i = 0; i < this.cordinates[this.mtbsarray[4]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[4]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[4]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "black",
            size: "10px", // Orange
            outline: {
              color: "black", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }


      }
      else if (this.clicked == true && this.zone == "Zon Selatan") {
        for (let i = 0; i < this.cordinates[this.mtbsarray[0]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[0]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[0]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "blue",
            size: "10px", // Orange
            outline: {
              color: "blue", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);

          for (let i = 0; i < this.cordinates[this.mtbsarray[1]][0].length; i++) {
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            const point = {
              //Create a point
              type: "point",
              longitude: this.cordinates[this.mtbsarray[1]][0][i].longitude,
              latitude: this.cordinates[this.mtbsarray[1]][0][i].latitude,
            };
            const simpleMarkerSymbol = {
              type: "simple-marker",
              color: "aqua",
              size: "10px", // Orange
              outline: {
                color: "aqua", // White
                width: -6,
              },
            };
            const pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });
            graphicsLayer.add(pointGraphic);
          }
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[2]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[2]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[2]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "orange",
            size: "10px", // Orange
            outline: {
              color: "orange", // White

              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[3]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[3]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[3]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "olive",
            size: "10px", // Orange
            outline: {
              color: "olive", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }


        for (let i = 0; i < this.cordinates[this.mtbsarray[4]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[4]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[4]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "green",
            size: "10px", // Orange
            outline: {
              color: "green", // White
              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }


      }
      else if (this.zone == "Zon Utara") {
        this.zonone = this.mtbsarray[0]
        for (let i = 0; i < this.cordinates[this.mtbsarray[0]][0].length; i++) {
         // console.log(this.cordinates[this.mtbsarray[0]][0][i].longitude)
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[0]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[0]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "cyan",
            size: "10px", // Orange  
            outline: {
              color: "cyan", // White

              width: -6,
            },
          };
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);

          for (let i = 0; i < this.cordinates[this.mtbsarray[1]][0].length; i++) {
            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            const point = {
              //Create a point
              type: "point",
              longitude: this.cordinates[this.mtbsarray[1]][0][i].longitude,
              latitude: this.cordinates[this.mtbsarray[1]][0][i].latitude,
            };
            const simpleMarkerSymbol = {
              type: "simple-marker",
              color: "red",
              size: "10px", // Orange
              outline: {
                color: "red", // White
                width: -6,
              },
            };
            const pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });
            graphicsLayer.add(pointGraphic);
          }
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[2]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",

            longitude: this.cordinates[this.mtbsarray[2]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[2]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "purple",
            size: "7px", // Orange
            outline: {
              color: "purple", // White

              width: -6,
            },
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }

        for (let i = 0; i < this.cordinates[this.mtbsarray[3]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[3]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[3]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "coral",
            size: "10px", // Orange
            outline: {
              color: "coral", // White
              width: -6,
            },
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }


        for (let i = 0; i < this.cordinates[this.mtbsarray[4]][0].length; i++) {
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          const point = {
            //Create a point
            type: "point",
            longitude: this.cordinates[this.mtbsarray[4]][0][i].longitude,
            latitude: this.cordinates[this.mtbsarray[4]][0][i].latitude,
          };
          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: "yellow",
            size: "10px", // Orange
            outline: {
              color: "yellow", // White
              width: -6,
            },
          };

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });
          graphicsLayer.add(pointGraphic);
        }
      }
    }
      // for (let i = 0; i < this.cordinates1.length; i++) {
      //   const graphicsLayer = new GraphicsLayer();
      //   map.add(graphicsLayer);
      //   const point = {
      //     //Create a point
      //     type: "point",
      //     longitude: this.cordinates1[i].longitude,
      //     latitude: this.cordinates1[i].latitude,
      //   };
      //   const simpleMarkerSymbol = {
      //     type: "simple-marker",
      //     color: "green",
      //     size: "10px", // Orange
      //     outline: {
      //       color: "green", // White
      //       width: -6,

      //     },
      //   };
      //   const pointGraphic = new Graphic({
      //     geometry: point,
      //     symbol: simpleMarkerSymbol,
      //   });
      //   graphicsLayer.add(pointGraphic);
      // }

      // for (let i = 0; i < this.cordinates2.length; i++) {
      //   const graphicsLayer = new GraphicsLayer();
      //   map.add(graphicsLayer);
      //   const point = {
      //     //Create a point
      //     type: "point",
      //     longitude: this.cordinates2[i].longitude,
      //     latitude: this.cordinates2[i].latitude,
      //   };
      //   const simpleMarkerSymbol = {
      //     type: "simple-marker",
      //     color: "black",
      //     size: "10px", // Orange
      //     outline: {
      //       color: "black", // White
      //       width: -6,

      //     },
      //   };
      //   const pointGraphic = new Graphic({
      //     geometry: point,
      //     symbol: simpleMarkerSymbol,
      //   });
      //   graphicsLayer.add(pointGraphic);
      // }

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
      // console.log("EsriLoader: ", error);
    }
  }
  ngOnInit() {
    this.showInvalid=false;
    this.mtkss="Tiada";
    this.href = this.router.url;
    localStorage.setItem("path", "/dbkl/merinyuanalysis");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    // localStorage.setItem("path", "mymap1");
    this.initializeMap().then((mapView) => {
      // The map has been initialized
      // console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }
  // options = {
  //   layers: [
  //     L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //       maxZoom: 18,
  //       attribution: "",
  //     }),
  //   ],
  //   zoom: 12,
  //   center: L.latLng(3.139, 101.6869),
  // };
  // onMapReady(map: L.Map) {getMTknames
  //   this.map = map;
  // }
  backtotop() {
    window.scroll(0, 0);
  }
  getMTknames(event) {
    this.mtbsarray = [];
    this.check1 = false;
    this.zone = event.target.value;
    this.spinner.show();
    this.getmtk = event.target.value;
    let body = {
      zon: this.getmtk,
    };
    let headers = {
      "Content-Type": "application/json",
    };
    this.http
      .post(environment.basePublicUrl + "/dbkl/getNamaMTK", body, {
        headers: headers,
      })
      .subscribe((data) => {
        // console.log(data);
        this.spinner.hide();
        this.Mtkusers = data;
        // console.log(this.Mtkusers);
        this.mtkss = this.Mtkusers[0];
      });
  }
  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }
  getmonth(event) {
    this.month = event.target.value;
    this.check3 = false;
  }
  getyear(event) {
    this.check2 = false;
    this.year = event.target.value;
  }
  getData() {
    if (this.getmtk == undefined) {
      this.check1 = true;
      return;
    }
    if (this.month == undefined) {
      this.check3 = true;
      return;
    }
    if (this.year == undefined) {
      this.check2 = true;
      return;
    }
//    this.spinner.show();
    // console.log(this.year);
    let body = {
      bulan: this.month,
      tahun: this.year,
      zon: this.getmtk,
      nama_mtk: this.mtkss,
    };

    let headers = {
      "Content-Type": "application/json",
    };
    this.http
      .post(environment.basePublicUrl + "/dbkl/getMonthlyPerformance", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.dataValue = res;
          for (let i = 0; i < this.dataValue.mtb_list.length; i++) {
            this.mtbsarray.push(this.dataValue.mtb_list[i])
          }
  console.log("responce",res);
//  this.tarikh=this.dataValue.tarikh;
  console.log("tarikhhaa",this.tarikh);
          this.data = this.dataValue['monthly_data'];
          console.log("month",this.data.length);
          if (this.data.length == 0) {
            this.showInvalid=true;
            return;
          
          }
          //console.log(this.mtbsarray)
          // console.log(this.data)
          // this.tarikh=this.data.tarikh;
          // console.log(this.tarikh)
          this.clicked = true;
         this.getCordinate();

        },
        (error) => {
          //this.spinner.hide();
          this.loginError = true;
        }
      );
  }

  getCordinate() {
    let body = {
      id_mtk: this.mtkss,
      zon: this.getmtk
    };
//console.log(body);

    let headers = {
      "Content-Type": "application/json",
    };
    this.http
      .post(
        environment.basePublicUrl + "/dbkl/fetchMapCoordinates",
        body,
        { headers: headers }
      )
      .subscribe((cordinate) => {


       // console.log(JSON.stringify(cordinate));

        this.cordinates = cordinate;
        this.spinner.hide();
        // console.log(this.cordinates.this.mtbsarray[0][0][0].latitude);
     //   console.log(this.cordinates[this.mtbsarray[0]][0][0].latitude);

        this.initializeMap();
      },
        (error) => {
          this.spinner.hide();
          this.errorMessage = error["error"]["message"];
         // console.log(this.errorMessage);

          this.loginError = true;
        }

      );
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
      .post(environment.basePublicUrl + "/dbkl/logout", body, { headers: header })
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