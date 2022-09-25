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
import { environment } from "src/environments/environment";
import esri = __esri;
import { loadModules } from "esri-loader";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import esriRequest from "@arcgis/core/request";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import FeatureTable from "@arcgis/core/widgets/FeatureTable";
import * as watchUtils from "@arcgis/core/core/watchUtils";

import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import Field from "@arcgis/core/layers/support/Field";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";

declare var assetDir: string;
declare var mapLayers: any[];
declare var parlimenURL: string;
declare var cleaningServiceInfo: any[];
declare var collectionServiceInfo: any[];

@Component({
  selector: 'app-cleanshedule',
  templateUrl: './cleanshedule.component.html',
  styleUrls: ['./cleanshedule.component.css']
})
export class CleansheduleComponent implements OnInit {
  cleaningServiceInfo = cleaningServiceInfo;

  collectionServiceInfo = collectionServiceInfo;

  parliamens = mapLayers;

  public href: string = "";
  url: string = "asdf";

  // selected options
  selectedParliament: any;
  selectedfeaturelayer: any;
  selectedStreet: any;
  selectedResidential: any;
  selectedArea: any;

  show = false;
  // select options
  residential: any = [];
  streets: any = [];
  area: any = [];

  //layers in map
  loadedLayers: any = [];

  // symbols
  housingSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/rumah.png', width: '24px', height: '24px' })
  housingsSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/rumahs.png', width: '24px', height: '24px' }) // selected
  centerSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/pusat.png', width: '24px', height: '24px' })
  centersSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/pusats.png', width: '24px', height: '24px' })
  busSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/Bus.png', width: '24px', height: '24px' })
  taxiSymbol = new PictureMarkerSymbol({ url: assetDir + 'icons/Taxi.png', width: '24px', height: '24px' })

  clearResult = true;
  map: any;
  view: any;
  featureTable: any;
  parlimenLayer: any;
  ftFeature: any = [];
  id: any;
  selectedFeature: any;
  graphics: any = [];
  showTable = true;
  accessToken: string;
  // router = Router;
  /*
  constructor(
    private http: HttpClient,
    private router: Router
  ) { } // make variable private so that it would be accessible through out the component
*/

  fixLayer (l: { features: { attributes: any; geometry: any; }[]; fields: any; }) {
    let features = l.features.map((item: { attributes: any; geometry: any; }) => ({
      attributes: item.attributes,
      geometry: { ...item.geometry, type: 'polygon' }
    }))
  //  console.log(features[0].geometry)
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
    //console.log(out)
    return out
  }

  getParlimenLayer () {
    const u = parlimenURL + '/query' // 'http://g-aset.dbkl.gov.my/gasset1/rest/services/Data_JPrB_2019a/FeatureServer/5/query'
    let sls = new SimpleLineSymbol({
      color: "orange",
      width: "3px",
      style: "short-dot"
    })
    let parlimenRenderer = new SimpleRenderer({
      symbol: sls
    })
    /*
    const featureLayer = new FeatureLayer({
      url: u,
      outFields: ['*']
    });
    featureLayer.renderer = parlimenRenderer
    */
    const query = {
      f: 'json',
      where: '1=1',
      returnDistinctValues: false,
      returnGeometry: true,
      outFields: '*'
    }
    let that = this
    esriRequest(u, {
      responseType: "json",
      query: query
    }).then(function (response) {
      // The requested data
      let p = response.data
   //   console.log(p);
      that.parlimenLayer = new FeatureLayer(that.fixLayer(p))
      that.parlimenLayer.renderer = parlimenRenderer
      that.initMap()
    }).catch(function (error) {
    //  console.log(error)
      alert('Ralat mendapatkan data sempadan Parlimen')
      that.hideSpinner()
    });


  }

  initMap () {
    let map = new Map({ basemap: 'topo' })

    const featureLayer = this.parlimenLayer
    if (!featureLayer) {
    //  console.log('parlimenlayer error')
      alert('Ralat mendapatkan data Parlimen')
      return
    }

    let view = new MapView({
      map: map,
      container: "mapDiv",
      center: [101.7099022, 3.1574851], // klcc 3.1574851,101.7099022
      zoom: 12
    });
    view.when(() => {
      this.tableSetup(featureLayer)
    })
    let scaleBar = new ScaleBar({
      view: view
    });
    // Add widget to the bottom left corner of the view
    view.ui.add(scaleBar, {
      position: "bottom-left"
    });
    let search = new Search({
      view: view
    });
    view.ui.add(search, {
      position: "top-right"
    });
    let basemapGallery = new BasemapGallery({
      view: view
    });
    let galleryExpand = new Expand({
      expandIconClass: "esri-icon-collection", // "esri-icon-basemap", // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      expandTooltip: "Basemaps List", // optional, defaults to "Expand" for English locale
      view: view,
      content: basemapGallery,
      label: 'Basemap'
    });
    view.ui.add(galleryExpand,
      { position: "top-right", index: 2 }
    );

    // view.ui.add("topbar2", "top-right");

    // this.setupMeasureTool()

    let that = this
    map.add(featureLayer);

    view.whenLayerView(featureLayer).then(function (layerView: any) {
      layerView.watch("updating", function (value: any) {
        if (!value) {
          that.hideSpinner()
        }
      })
    })
      .catch(function (e) {
     //   console.log('error' + e)
        that.hideSpinner()
      })

    this.map = map
    this.view = view
  }

  setupMeasureTool () {
    let activeWidget: any;
    let that = this
    let db = document.getElementById("distanceButton")
    if (db) {
      db.addEventListener("click", function () {
        setActiveWidget(null);
        if (!this.classList.contains("active")) {
          setActiveWidget("distance");
        } else {
          setActiveButton(null);
        }
      });
    }

    let ab = document.getElementById("areaButton")
    if (ab) {
      ab.addEventListener("click", function () {
        setActiveWidget(null);
        if (ab && !ab.classList.contains("active")) {
          setActiveWidget("area");
        } else {
          setActiveButton(null);
        }
      });
    }

    function setActiveWidget (type: any) {
      switch (type) {
        case "distance":
          activeWidget = new DistanceMeasurement2D({
            view: that.view
          });
          // skip the initial 'new measurement' button
          activeWidget.viewModel.start();
          that.view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case "area":
          activeWidget = new AreaMeasurement2D({
            view: that.view
          });
          // skip the initial 'new measurement' button
          activeWidget.viewModel.start();
          that.view.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("areaButton"));
          break;
        case null:
          if (activeWidget) {
            that.view.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    function setActiveButton (selectedButton: HTMLElement | null) {
      // focus the view to activate keyboard shortcuts for sketching
      that.view.focus();
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }

  }

  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router

  ) { } // make variable private so that it would be accessible through out the component

  async initializeMap () {
    try {

    } catch (error) {
      // console.log("EsriLoader: ", error);    

    }

    // var basemapGallery = new this.BasemapGallery({
    //   view: this._view
    // });
    // this._view.ui.add(basemapGallery, {
    //   position: "top-right"
    // });
    //     }),


  }

  ngOnInit () {
    this.accessToken = localStorage.getItem("AccessToken");
 if (!this.accessToken) {
      this.router.navigateByUrl("/publicLogin");
    }

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    // this.href = this.router.url;
    localStorage.setItem("path", "/public/collectionshedule");
    this.getParlimenLayer()
    /*
    this.initializeMap().then(() => {
      this.mapLoadedEvent.emit(true);
    });
    */
  }

  serviceChange () {
   // console.log('serviceChange: ' + this.selectedParliament)
   // console.log('serviceChange: ' + this.selectedfeaturelayer)
    if (this.selectedfeaturelayer && this.selectedParliament) {
      this.updateStreet()
    }
  }

  parliamentChange () {
   // console.log('parliamentChange: ' + this.selectedParliament)
   // console.log('parliamentChange: ' + this.selectedfeaturelayer)
    if (this.selectedfeaturelayer && this.selectedParliament) {
      this.updateStreet()
    }
  }

  updateStreet () {
    let url = this.selectedParliament + '/' + this.selectedfeaturelayer + '/query'
    const query = {
      f: 'json',
      where: '1=1',
      returnDistinctValues: true,
      returnGeometry: false,
      orderByFields: 'NAMA_JALAN',
      // returnCountOnly
      outFields: 'NAMA_JALAN' // '*' //'AssetName'
    }
    let that = this
    esriRequest(url, {
      responseType: "json",
      query: query
    }).then(function (response) {
      // The requested data
      that.streets = response.data.features.map((item: { attributes: { NAMA_JALAN: any; }; }) => item.attributes.NAMA_JALAN)
     // console.log(that.streets)
      that.updateResidential()
    }).catch(function (error) {
     // console.log(error)
      alert('Ralat mendapatkan data Nama Jalan')
    });
  }

  updateArea () {
    let url = this.selectedParliament + '/' + this.selectedfeaturelayer + '/query'
    let area = 'NAMA_KAWASAN'
    if (this.selectedfeaturelayer === 2) {
      area = 'NAMA_PREMIS'
    }
    const query = {
      f: 'json',
      where: '1=1',
      returnDistinctValues: true,
      returnGeometry: false,
      orderByFields: area,
      // returnCountOnly
      outFields: area // '*' //'AssetName'
    }
    let that = this
    esriRequest(url, {
      responseType: "json",
      query: query
    }).then(function (response) {
      // The requested data
      that.area = response.data.features.map(((item: { attributes: { [x: string]: any; }; }) => item.attributes[area]));
    //  console.log(that.area);
    }).catch(function (error) {
     // console.log(error)
      alert('Ralat mendapatkan data Nama Jalan')
    });
  }

  updateResidential () {
    let url = this.selectedParliament + '/' + this.selectedfeaturelayer + '/query'
    const query = {
      f: 'json',
      where: '1=1',
      returnDistinctValues: true,
      returnGeometry: false,
      orderByFields: 'NAMA_TAMAN',
      // returnCountOnly
      outFields: 'NAMA_TAMAN' // '*' //'AssetName'
    }
    let that = this
    esriRequest(url, {
      responseType: "json",
      query: query
    }).then(function (response) {
      // The requested data
      that.residential = response.data.features.map((item: { attributes: { NAMA_TAMAN: any; }; }) => item.attributes.NAMA_TAMAN)
  //    console.log(that.residential)
      that.updateArea()
    }).catch(function (error) {
    //  console.log(error)
      alert('Ralat mendapatkan data Nama Jalan')
    });
  }

  backtotop () {
    window.scroll(0, 0);
  }

  featurelayer () {
    this.spinner.show();
    this.spinner.hide();
  }

  clearLayer () {
  //  console.log('cealring layers')
    // this.map.removeAll() this will remove parlimen layer as well
    for (let l = 0; l < this.loadedLayers.length; ++l) {
      this.map.remove(this.loadedLayers[l])
    }
  }

  definitionExpression () {
    const q = ['1=1']
    if (this.selectedStreet) {
      q.push("NAMA_JALAN = '" + this.selectedStreet + "'")
    }
    if (this.selectedResidential) {
      q.push("NAMA_TAMAN = '" + this.selectedResidential + "'")
    }
    if (this.selectedArea) {
      if (this.selectedfeaturelayer === 2) {
        q.push("NAMA_PREMIS = '" + this.selectedArea + "'")
      } else {
        q.push("NAMA_KAWASAN = '" + this.selectedArea + "'")
      }
    }
    if (q.length > 1) {
      return q.join(' AND ')
    }
    return q[0]
  }

  loadLayer () {
    if (!this.selectedParliament) {
      alert('Sila Pilih Parlimen')
      return
    }
    if (this.selectedfeaturelayer === null) {
      alert('Sila Pilih Perkhidmatan')
      return
    }
    this.showSpinner()
  //  console.log('Parlimen: ' + this.selectedParliament)
  //  console.log('Layer: ' + this.selectedfeaturelayer)
    let fieldInfos: any = []
    if (this.clearResult) {
      this.clearLayer()
    }
    const featureLayer = new FeatureLayer({
      url: this.selectedParliament + '/' + this.selectedfeaturelayer,
      definitionExpression: this.definitionExpression(),
      outFields: ['*']
    });

    if (this.selectedfeaturelayer === 2) {
      fieldInfos = [
        {
          fieldName: "NAMA_JALAN",
          label: "NAMA JALAN"
        },
        {
          fieldName: "NAMA_TAMAN",
          label: "NAMA TAMAN"
        },
        {
          fieldName: "NAMA_PREMIS",
          label: "NAMA KAWASAN"
        },
        {
          fieldName: "KATEGORI",
          label: "KATEGORI"
        },
        {
          fieldName: "KEKERAPAN_KUTIPAN_SISA_DOMESTIK",
          label: "SISA DOMESTIK"
        },
        {
          fieldName: "KEKERAPAN_KUTIPAN_SAMPAH_PUKAL",
          label: "SAMPAH PUKAL"
        },
      ]

      featureLayer.popupTemplate = new PopupTemplate({
        title: "ID: {OBJECTID}",
        content: [
          {
            type: "fields",
            fieldInfos: fieldInfos
          }
        ]
      })
      featureLayer.renderer = new SimpleRenderer({
        symbol: this.housingSymbol
      })
    } else if (this.selectedfeaturelayer === 3) {

      fieldInfos = [
        {
          fieldName: "NAMA_JALAN",
          label: "NAMA JALAN"
        },
        {
          fieldName: "NAMA_TAMAN",
          label: "NAMA TAMAN"
        },
        {
          fieldName: "NAMA_KAWASAN",
          label: "NAMA KAWASAN"
        },
        {
          fieldName: "KATEGORI",
          label: "KATEGORI"
        },
        {
          fieldName: "KEKERAPAN_KUTIPAN_SISA_DOMESTIK",
          label: "SISA DOMESTIK"
        },
        {
          fieldName: "KEKERAPAN_KUTIPAN_SAMPAH_PUKAL",
          label: "SAMPAH PUKAL"
        },
      ]

      featureLayer.popupTemplate = new PopupTemplate({
        title: "ID: {OBJECTID}",
        content: [
          {
            type: "fields",
            fieldInfos: fieldInfos
          }
        ]
      })
      featureLayer.renderer = new SimpleRenderer({
        symbol: this.centerSymbol
      })
    } else {
      if (this.selectedfeaturelayer === 0) {
        featureLayer.renderer = new SimpleRenderer({
          symbol: this.busSymbol
        })
      }
      if (this.selectedfeaturelayer === 1) {
        featureLayer.renderer = new SimpleRenderer({
          symbol: this.taxiSymbol
        })
      }
      let service = this.cleaningServiceInfo.find(item => item.layer === this.selectedfeaturelayer)
      if (service) {
        fieldInfos = [
          {
            fieldName: "NAMA_JALAN",
            label: "NAMA JALAN"
          },
          {
            fieldName: "NAMA_TAMAN",
            label: "NAMA TAMAN"
          },
          {
            fieldName: "NAMA_KAWASAN",
            label: "NAMA KAWASAN"
          },
          {
            fieldName: "KATEGORI",
            label: "KATEGORI"
          }
        ]
        for (let f = 0; f < service.fields.length; ++f) {
          fieldInfos.push({
            label: service.fields[f].label,
            fieldName: service.fields[f].name
          })
        }

        featureLayer.popupTemplate = new PopupTemplate({
          title: "ID: {OBJECTID}",
          content: [
            {
              type: "fields", fieldInfos: fieldInfos
            }
          ]
        })

      }
    }

    this.map.add(featureLayer);
    this.loadedLayers.push(featureLayer)
    const that = this
    // that.featureTable.fieldConfigs = []
    // that.featureTable.layer = null
    that.featureTable.visible = false

    this.view.whenLayerView(featureLayer).then(function (layerView: any) {

      featureLayer.queryExtent().then(function (results) {
        // go to the extent of the results satisfying the query
        //TODO: check extend value
      //  console.log('setting extend')
       // console.log(results.extent)
        that.view.goTo(results.extent);
      });

      if (that.featureTable) { // exist, update
        console.error('updaing feature table')
        that.featureTable.clearHighlights()
        that.featureTable.clearSelection()
        that.featureTable.fieldConfigs = [
          {
            name: "OBJECTID",
            label: "ID",
            direction: "asc",
            editable: false
          }
        ].concat(fieldInfos.map((item: { fieldName: any; label: any; }) => ({ name: item.fieldName, label: item.label })))
        that.featureTable.layer = featureLayer
        that.featureTable.visible = true
      } else {
        //this.tableSetup(featureLayer)
       // console.log('no feature table')
      }

      layerView.watch("updating", function (value: any) {
        if (!value) {
          // wait for the layer view to finish updating
          // query all the features available for drawing.
          that.hideSpinner()
          layerView
            .queryFeatures({
              // geometry: view.extent,
              returnGeometry: true,
              orderByFields: ["OBJECTID"]
            })
            .then(function (results: any) {
              that.graphics = results.features;
              console.error('graphics obtains')
            //  console.log(that.graphics)
            })
            .catch(function (error: any) {
              console.error("query failed: ", error);
            });
        }
      })
    }).catch(function (error: any) {
     // console.log('error loading layer')
     // console.log(error)
      alert('Ralat mendapatkan data')
    });

  }

  hideSpinner () {
    this.spinner.hide();
  }

  showSpinner () {
    this.spinner.show();
  }

  showTableChange2 (event: MatButtonToggleChange) {
  //  console.log('showTableChange2')
    const mapContainer = document.getElementById("mapDiv");
    const tableContainer2 = document.getElementById("tableContainer2");

    if (!mapContainer) { console.log('mapContainer'); return; }
    if (!tableContainer2) { console.log('tableContainer2'); return; }
  //  console.log('pass')
  //  console.log(mapContainer.style.display)
    if (event.value === 'map') {
  //    console.log('removing table')
      mapContainer.style.display = ""
      tableContainer2.style.display = "none"
    }
    else if (event.value === 'table') {
  //    console.log('show table')
      mapContainer.style.display = "none"
      tableContainer2.style.height = "100%"
      tableContainer2.style.display = ""
    } else {
   //   console.log('show both')
      mapContainer.style.display = ""
      tableContainer2.style.height = "50%"
      tableContainer2.style.display = ""
    }
 //   console.log(mapContainer.style.display)
  }

  showTableChange (event: MatSlideToggleChange) {
  //  console.log('toggle', event.checked);
   // console.log('showTableChange')
    const appContainer = document.getElementById("appContainer");
    const tableContainer2 = document.getElementById("tableContainer2");
    const tableDiv = document.getElementById("tableDiv");
    const checkboxEle = document.getElementById("checkboxId");
    const labelText = document.getElementById("labelText");

    if (!checkboxEle) { console.log('checkboxEle'); return; }
    if (!appContainer) { console.log('appContainer'); return; }
    if (!labelText) { console.log('labelText'); return; }
    if (!tableContainer2) { console.log('tableContainer2'); return; }
 //   console.log('pass')
    if (!event.checked) {
  //    console.log('removing table')
      // appContainer.removeChild(tableContainer2);
      tableContainer2.style.display = "none"
      labelText.innerHTML =
        "Show Feature Table";
    } else {
  //    console.log('adding table')
      // appContainer.appendChild(tableContainer2);
      tableContainer2.style.display = "block"
      labelText.innerHTML =
        "Hide Feature Table";
    }

  }

  tableSetup (featureLayer: FeatureLayer) {
  //  console.log('tablesetuo')
  //  console.log(featureLayer)
    const appContainer = document.getElementById("appContainer");
    const tableContainer2 = document.getElementById("tableContainer2");
    const tableDiv = document.getElementById("tableDiv");
    const that = this
    // Create FeatureTable
    const featureTable = new FeatureTable({
      view: that.view, // make sure to pass in view in order for selection to work
      layer: featureLayer,
      // editingEnabled: true,
      fieldConfigs: [
        {
          name: "OBJECTID",
          label: "ID",
          direction: "asc"
        },
        {
          name: "KAWASANPAR",
          label: "Kawasan"
        },
        {
          name: "LUASEKAR",
          label: "Luas (ekar)"
        }
      ],
      container: tableDiv || document.createElement('div')
    });

    // Add toggle visibility slider
    // this.view.ui.add(document.getElementById("mainDiv"), "top-right");

    // Get reference to div elements
    const checkboxEle = document.getElementById("checkboxId");
    const labelText = document.getElementById("labelText");

    // Listen for when toggle is changed, call toggleFeatureTable function
    if (checkboxEle) {
      console.error('checkboxEle')
     // console.log(checkboxEle)
      checkboxEle.onchange = () => {
        toggleFeatureTable();
      };
    }

    function toggleFeatureTable () {
      // Check if the table is displayed, if so, toggle off. If not, display.
      if (!checkboxEle) return
      if (!appContainer) return
      if (!labelText) return
      if (!tableContainer2) return
      let b = <HTMLInputElement>checkboxEle
      if (!b.checked) {
      //  console.log('removing table')
        appContainer.removeChild(tableContainer2);
        labelText.innerHTML =
          "Show Feature Table";
      } else {
      //  console.log('adding table')
        appContainer.appendChild(tableContainer2);
        labelText.innerHTML =
          "Hide Feature Table";
      }
    }

    featureTable.on("selection-change", (changes) => {

      // If row is unselected in table, remove it from the features array
      changes.removed.forEach((item) => {
        /*
        const data = that.ftFeature.find((data: { feature: __esri.Graphic; }) => {
          return data.feature.attributes.OBJECTID === item.feature.attributes.OBJECTID;
        });
        */
        that.ftFeature = that.ftFeature.filter((data: { feature: { attributes: { OBJECTID: any; }; }; }) => data.feature.attributes.OBJECTID === item.feature.attributes.OBJECTID)
      });

      // If a row is selected, add to the features array
      changes.added.forEach((item) => {
        const feature = item.feature;
        that.ftFeature.push({
          feature: feature
        });

        // Listen for row selection in the feature table. If the popup is open and a row is selected that is not the same feature as opened popup, close the existing popup.
        if ((feature.attributes.OBJECTID !== that.id) && (that.view.popup.visible === true)) {
          featureTable.deselectRows(that.selectedFeature);
          that.view.popup.close();
        }
      });
      if (changes.added.length > 0) {
        let f = changes.added[0].feature.attributes.OBJECTID
      //  console.log('added oid ' + f)
      //  console.log(that.graphics)
        let g = that.graphics.find((item: { attributes: { OBJECTID: any; }; }) => item.attributes.OBJECTID === f)
        if (g) {
          that.view
            .goTo(
              {
                target: g.geometry,
                zoom: 18
              },
              {
                duration: 1000,
                easing: "in-out-expo"
              }
            )
            .catch((error: { name: string; }) => {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });


        }
      }

    //  console.log(changes.removed)
    //  console.log(changes.added)
    //  console.log(that.ftFeature)
    });

    // Watch for the popup's visible property. Once it is true, clear the current table selection and select the corresponding table row from the popup
    watchUtils.watch(that.view.popup.viewModel, "active", (graphic) => {
      that.selectedFeature = that.view.popup.selectedFeature;
      if ((that.selectedFeature !== null) && (that.view.popup.visible !== false)) {
        featureTable.clearSelection();
        featureTable.selectRows(that.view.popup.selectedFeature);
        that.id = that.selectedFeature.getObjectId();
      }
    });
    this.featureTable = featureTable
  }

  reset () {
    this.selectedfeaturelayer = ''
    this.selectedParliament = ''
    this.selectedStreet = ''
    this.selectedResidential = ''
    this.selectedArea = ''
    this.view.popup.close();
  }


  close () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  cancel() {
    window.history.back();// <-- go back to previous location on cancel
  }
}
