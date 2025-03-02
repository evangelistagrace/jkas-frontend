import {
  Component,
  ElementRef,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from "@angular/core";
import { ChartDataSets } from "chart.js";

import { ChartOptions, ChartType } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Color, Label } from "ng2-charts";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { forkJoin } from "rxjs";
import { DateRange } from "src/app/models/announcement.model";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"],
})
export class BarChartComponent implements OnInit {
  Array1: any = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
  baseURL = environment.basePublicUrl;
  DataSets: any = [];
  val = 2;
  Loginusername: any = "ANALISIS1234";
  Loginpassword: any = "ANALISIS1234";
  parliamens = [
    "SEGAMBUT",
    "TITIWANGSA",
    "WANGSA MAJU",
    "SETIAWANGSA",
    "BATU",
    "LEMBAH PANTAI",
    "KEPONG",
    "CHERAS",
    "BUKIT BINTANG",
    "SEPUTEH",
    "BANDAR TUN RAZAK",
  ];

  catago = [
    "PERUMAHAN",
    "PERUMAHAN_TIDAK",
    "[this.secondCata]",
    "KOMERSIAL_TIDAK",
    "PUSAT_TONG_YA",
    "PUSAT_TONG_TIDAK",
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "JUMLAH PERKHIDMATAN",
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "end",
        font: {
          size: 20,
        },
      },
    },
  };

  public barChartLabels: Label[] = ["", "", "", "", "", "", "", "", "", "", ""];
  public barChartType: ChartType = "bar";
  public barChartLegend = false;
  public barChartPlugins = [ChartDataLabels];

  public barChartColors: Color[] = [
    { backgroundColor: "hsl(214deg 65% 62%)" },
    { backgroundColor: "hsl(95deg 42% 68%)" },
    { backgroundColor: "hsl(0deg 0% 66%)" },
    { backgroundColor: "hsl(207deg 63% 84%)" },
    { backgroundColor: "hsl(79deg 57% 88%)" },
    { backgroundColor: "hsl(30deg 4% 79%)" },
  ];

  public barChartData: ChartDataSets[] = [
    // { data: this.Array1, label: "Series A", stack: "a" },
    // {
    //   data: [28, 48, 40, 19, 86, 27, 90, 35, 86, 27, 90],
    //   label: "Series B",
    //   stack: "a",
    // },
    // {
    //   data: [28, 48, 41, 19, 86, 27, 90, 23, 86, 27, 90],
    //   label: "Series B",
    //   stack: "a",
    // },
    // { data: [20, 59, 80, 81, 40, 55, 40, 56, 86, 27, 90], stack: "b" },
    // { data: [28, 48, 30, 19, 85, 27, 90, 36, 86, 27, 90], stack: "b" },
    // { data: [28, 44, 35, 19, 86, 27, 67, 35, 86, 27, 90], stack: "b" },
  ];
  accessToken: any;
  getaccess: string;
  selectedGuest1: any;
  selectedGuest: any;
  featureLayers: any = [];
  toggle1: boolean;
  toggle2: boolean;
  show: boolean;
  data: string;
  jsondata: any = [];
  katagoriname: string = "PERUMAHAN_YA";
  show1: boolean;
  catagoriList: any = [];
  stringval: string;
  jsonval: any = [];
  firstCata: any;
  secondcata: any;
  thirdcata: any;
  firstCata1: string;
  catagorylength: any;
  secondCata: string;
  secondCata1: string;
  thirdcata1: string;
  notfound: boolean;
  isAdminType: string;
  topLayers: any = [];
  parliment: any = {};
  username: string;
  parliaments = [];
  categories = [];
  selectedParliament: any;
  selectedCategory: any;
  filterForm: FormGroup;
  dateRange: DateRange = { startDate: null, endDate: null };
  rangeDates: Date[] = [];
  stateOptions: any[];
  isBarChart: boolean = true;
  colorList = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
    // generate 5 more different colors in the same theme
    "rgba(255, 130, 180, 0.2)", // Light pink
    "rgba(191, 85, 236, 0.2)", // Light purple
    "rgba(72, 202, 142, 0.2)", // Light green
    "rgba(0, 184, 255, 0.2)", // Light blue
    "rgba(240, 154, 80, 0.2)", // Light orange
  ];
  borderColorList = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
    // generate 5 more colors in the same theme
    "rgb(255, 130, 180)", // Light pink
    "rgb(191, 85, 236)", // Light purple
    "rgb(72, 202, 142)", // Light green
    "rgb(0, 184, 255)", // Light blue
    "rgb(240, 154, 80)", // Light orange
  ];

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      rangeDates: [null]
    });
  }

  ngOnInit() {
    window.scroll(0, 5);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    // this.accessToken = localStorage.getItem("AccessToken");
    this.notfound = true;
    localStorage.setItem("path", "/dbkl/barchart");
    // this.show = true;
    // this.data = localStorage.getItem('chartdata');
    // this.jsondata = JSON.parse(this.data);
    // console.log(this.jsondata)
    this.toggle2 = true;
    this.stateOptions = [
      { label: 'Bar', value: true },
      { label: 'Pie', value: false },
    ];
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .post(this.baseURL + "/dbkl/getLapisanFitur", { headers: headers })
      .subscribe((data) => {
        this.show = false;
        this.http
          .get(
            "https://g-aset.dbkl.gov.my/gasset1/rest/services/CERAPAN_WGS/JKAS_GASET/MapServer?f=json"
          )
          .subscribe((data) => {
            let buildLovsPromise = new Promise((resolve, reject) => {
              this.topLayers = data["layers"];
              for (let i = 0; i < data["layers"].length; i++) {
                if (data["layers"][i]["parentLayerId"] === -1) {
                  // console.log('adding ' + data['layers'][i]['name']);
                  this.parliment[data["layers"][i]["name"]] =
                    data["layers"][i]["subLayerIds"];
                  this.parliaments.push({
                    name: data["layers"][i]["name"],
                    code: data["layers"][i]["id"],
                  });
                } else {
                  let name = data["layers"][i]["name"].replaceAll("_", " ");
                  let exists = false;
                  for (let k = 0; k < this.featureLayers.length; k++) {
                    if (
                      this.featureLayers[k] === name &&
                      this.categories[k]["name"] === name
                    ) {
                      exists = true;
                      break;
                    }
                  }
                  if (!exists) {
                    this.featureLayers.push(name);
                    this.categories.push({
                      name: name,
                      code: data["layers"][i]["name"],
                    });
                  }
                }
              }
              resolve(true);
            });

            buildLovsPromise.then(() => {
              let random = Math.floor(
                Math.random() * this.featureLayers.length - 1
              );
              console.log("featureLayers: ", this.featureLayers);
              console.log("categories: ", this.categories);
              console.log("parliaments: ", this.parliaments);
              this.selectedCategory = {
                name: this.featureLayers[0],
                code: this.categories[0].code,
              };
              // this.selectedGuest1 = this.featureLayers[random];
              // this.selectfeatureLayer();
              this.drawChart(this.selectedCategory.code);
              this.spinner.hide();
            });
          });
      }),
      (error) => {
        this.spinner.hide();
        this.show = false;
        window.alert("Internal server error try again");
      };
  }

  launch_toast() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 5000);
  }

  launch_toast1() {
    var x = document.getElementById("toast1");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 5000);
  }

  selectfeatureLayer() {
    let selected = this.selectedGuest1.replaceAll(" ", "_");
    let defaultSelected = "PUSAT_TONG";
    let observableBatch = [];
    let observableBatch2 = [];
    for (let i = 0; i < this.topLayers.length; i++) {
      if (this.topLayers[i]["name"] === selected) {
        let url =
          "https://g-aset.dbkl.gov.my/gasset1/rest/services/CERAPAN_WGS/JKAS_GASET/MapServer/" +
          this.topLayers[i]["id"] +
          "/query?where=1%3D1&outFields=PARLIMEN,NAMA_JALAN,NAMA_TAMAN,NAMA_KAWASAN,KATEGORI,SERVIS_PERKHIDMATAN_JKAS&returnGeometry=false&returnTrueCurves=false&f=json";
        observableBatch.push(this.http.get(url));
      }
    }

    const colorList = [
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 205, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(201, 203, 207, 0.2)",
    ];
    const borderColorList = [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
      "rgb(201, 203, 207)",
    ];
    this.spinner.show();
    forkJoin(observableBatch).subscribe((value) => {
      console.log("finish...");
      this.barChartLabels = [];
      this.barChartData = [];
      let data = [];
      let color = [];
      let borderColor = [];
      for (let i = 0; i < value.length; i++) {
        let val = value[i];
        try {
          let size = val["features"].length;
          let parliment = val["features"][0]["attributes"]["PARLIMEN"];
          console.log(parliment + " = " + size);
          this.barChartLabels.push(parliment);
          data.push(size);
          let index = Math.floor(Math.random() * colorList.length - 1);
          color.push(colorList[index]);
          borderColor.push(borderColorList[index]);
        } catch (e) {
          console.error("skipping due to error.");
          console.log(val);
        }
      }
      this.barChartData.push({
        data: data,
        label: selected,
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.1)",
      });
      this.spinner.hide();
    });
    // let headers11 = {
    //   accept: "application/json",
    //   "Content-Type": "application/json",
    // };

    // let body1 = {
    //   lapisan_fitur: this.selectedGuest1,
    // };

    // this.http
    //   .post(this.baseURL + "/dbkl/getKategori", body1, { headers: headers11 })
    //   .subscribe((res) => {

    //     this.catagoriList = res;
    //     this.catagorylength = this.catagoriList.length;
    //     //console.log(this.catagoriList);
    //     this.executeFunc();
    //     this.firstCata1 = this.catagoriList[0] + "_YA";
    //     this.firstCata = this.catagoriList[0] + "_TIDAK";
    //     this.secondCata = this.catagoriList[1] + "_YA";
    //     this.secondCata1 = this.catagoriList[1] + "_TIDAK";
    //     this.thirdcata = this.catagoriList[2] + "_YA";
    //     this.thirdcata1 = this.catagoriList[2] + "_TIDAK";
    //     // this.secondcata = (this.catagoriList[1] + "_YA");
    //     // this.thirdcata = (this.catagoriList[2] + "_YA");
    //     // console.log("1st" + this.firstCata + "2nd" + this.secondcata + "3rd" + this.thirdcata);
    //     // console.log("my response" + this.catagoriList);
    //   });

    // this.notfound = false;

    // this.show1 = false;
    // this.show = true;
  }

  // executeFunc() {
  //   let key = localStorage.getItem("AccessToken");
  //   let headers = {
  //     "Content-Type": "application/json",
  //     Authorization: key,
  //   };

  //   let body = {
  //     lapisan_fitur: this.selectedGuest1,
  //   };
  //   this.http
  //     .post(this.baseURL + "/dbkl/grafPerkhidmatanPusatTong", body, {
  //       headers: headers,
  //     })
  //     .subscribe((data) => {
  //       this.show1 = true;
  //       this.show = false;
  //       this.jsondata = data;
  //       //console.log(this.jsondata)
  //       this.spinner.hide();
  //       // this.launch_toast1();

  //       // console.log(this.jsondata[0]["LEMBAH PANTAI (P121)"].PERUMAHAN_YA);
  //       // for (let i = 0; i < this.jsondata[0]["LEMBAH PANTAI (P121)"].length; i++) {
  //       //   console.log("hello");
  //       // }
  //       // localStorage.setItem('chartdata', JSON.stringify(this.jsondata));
  //       this.randomize();
  //     }),
  //     (error) => {
  //       this.spinner.hide();

  //       this.show = false;
  //       window.alert("Internal server error try again");
  //     };
  // }
  // public randomize(): void {
  //   this.spinner.hide();

  //   this.show = false;
  //   // this.katagoriname = "LEMBAH PANTAI (P121)";
  //   // for (let i = 0; i < this.parliamens.length; i++) {

  //   //   this.stringval = JSON.stringify(this.jsondata[i][this.parliamens[i]])
  //   //   this.jsonval = JSON.parse(this.stringval);
  //   //   console.log(this.jsonval)
  //   // }
  //   // console.log(this.stringval)

  //   // console.log(this.jsondata[0]["LEMBAH PANTAI (P121)"].PERUMAHAN_YA)
  //   const data = [
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.firstCata1],
  //       this.jsondata[1]["SEGAMBUT"][this.firstCata1],
  //       this.jsondata[2]["BATU"][this.firstCata1],
  //       this.jsondata[3]["KEPONG"][this.firstCata1],
  //       this.jsondata[4]["SEPUTEH"][this.firstCata1],
  //       this.jsondata[5]["BUKIT BINTANG"][this.firstCata1],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.firstCata1],
  //       this.jsondata[7]["WANGSA MAJU"][this.firstCata1],
  //       this.jsondata[8]["CHERAS"][this.firstCata1],
  //       this.jsondata[9]["TITIWANGSA"][this.firstCata1],
  //       this.jsondata[10]["SETIAWANGSA"][this.firstCata1],
  //     ],
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.thirdcata1],
  //       this.jsondata[1]["SEGAMBUT"][this.thirdcata1],
  //       this.jsondata[2]["BATU"][this.thirdcata1],
  //       this.jsondata[3]["KEPONG"][this.thirdcata1],
  //       this.jsondata[4]["SEPUTEH"][this.thirdcata1],
  //       this.jsondata[5]["BUKIT BINTANG"][this.thirdcata1],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.thirdcata1],
  //       this.jsondata[7]["WANGSA MAJU"][this.thirdcata1],
  //       this.jsondata[8]["CHERAS"][this.thirdcata1],
  //       this.jsondata[9]["TITIWANGSA"][this.thirdcata1],
  //       this.jsondata[10]["SETIAWANGSA"][this.thirdcata1],
  //     ],
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.secondCata],
  //       this.jsondata[1]["SEGAMBUT"][this.secondCata],
  //       this.jsondata[2]["BATU"][this.secondCata],
  //       this.jsondata[3]["KEPONG"][this.secondCata],
  //       this.jsondata[4]["SEPUTEH"][this.secondCata],
  //       this.jsondata[5]["BUKIT BINTANG"][this.secondCata],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.secondCata],
  //       this.jsondata[7]["WANGSA MAJU"][this.secondCata],
  //       this.jsondata[8]["CHERAS"][this.secondCata],
  //       this.jsondata[9]["TITIWANGSA"][this.secondCata],
  //       this.jsondata[10]["SETIAWANGSA"][this.secondCata],
  //     ],
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.firstCata],
  //       this.jsondata[1]["SEGAMBUT"][this.firstCata],
  //       this.jsondata[2]["BATU"][this.firstCata],
  //       this.jsondata[3]["KEPONG"][this.firstCata],
  //       this.jsondata[4]["SEPUTEH"][this.firstCata],
  //       this.jsondata[5]["BUKIT BINTANG"][this.firstCata],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.firstCata],
  //       this.jsondata[7]["WANGSA MAJU"][this.firstCata],
  //       this.jsondata[8]["CHERAS"][this.firstCata],
  //       this.jsondata[9]["TITIWANGSA"][this.firstCata],
  //       this.jsondata[10]["SETIAWANGSA"][this.firstCata],
  //     ],
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.secondCata1],
  //       this.jsondata[1]["SEGAMBUT"][this.secondCata1],
  //       this.jsondata[2]["BATU"][this.secondCata1],
  //       this.jsondata[3]["KEPONG"][this.secondCata1],
  //       this.jsondata[4]["SEPUTEH"][this.secondCata1],
  //       this.jsondata[5]["BUKIT BINTANG"][this.secondCata1],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.secondCata1],
  //       this.jsondata[7]["WANGSA MAJU"][this.secondCata1],
  //       this.jsondata[8]["CHERAS"][this.secondCata1],
  //       this.jsondata[9]["TITIWANGSA"][this.secondCata1],
  //       this.jsondata[10]["SETIAWANGSA"][this.secondCata1],
  //     ],
  //     [
  //       this.jsondata[0]["LEMBAH PANTAI (P121)"][this.thirdcata],
  //       this.jsondata[1]["SEGAMBUT"][this.thirdcata],
  //       this.jsondata[2]["BATU"][this.thirdcata],
  //       this.jsondata[3]["KEPONG"][this.thirdcata],
  //       this.jsondata[4]["SEPUTEH"][this.thirdcata],
  //       this.jsondata[5]["BUKIT BINTANG"][this.thirdcata],
  //       this.jsondata[6]["BANDAR TUN RAZAK"][this.thirdcata],
  //       this.jsondata[7]["WANGSA MAJU"][this.thirdcata],
  //       this.jsondata[8]["CHERAS"][this.thirdcata],
  //       this.jsondata[9]["TITIWANGSA"][this.thirdcata],
  //       this.jsondata[10]["SETIAWANGSA"][this.thirdcata],
  //     ],
  //   ];
  //   // console.log(data.length)
  //   const clone = this.barChartData;
  //   for (let i = 0; i < data.length; i++) {
  //     // console.log(data[0])
  //     clone[i].data = data[i];
  //     this.barChartData = clone;
  //   }
  //   /**
  //    * (My guess), for Angular to recognize the change in the dataset
  //    * it has to change the dataset variable directly,
  //    * so one way around it, is to clone the data, change it and then
  //    * assign it;
  //    */
  // }
  backtotop() {
    window.scroll(0, 0);
  }
  reset() {
    $("input[name=data]").val("");
    $("input[name=data1]").val("");
    this.featureLayers = [];
    const data = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    this.show1 = false;
    // console.log(data.length)
    const clone = this.barChartData;
    for (let i = 0; i < data.length; i++) {
      // console.log(data[0])
      clone[i].data = data[i];
      this.barChartData = clone;
    }
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
      .post(this.baseURL + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          // console.log("res", res);
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("user_type");
          localStorage.setItem("isdbkl", "false");
          this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }

  onCategoryChange(event: any) {
    console.log("Selected Category: ", event.value);
    // clear parliament
    this.selectedParliament = null;
    this.drawChart(event.value.code);
  }

  onParliamentChange(event: any) {
    console.log("Selected Parliament: ", event.value);
    if (!event.value) return this.drawChart(this.selectedCategory.code);
    return this.drawChart(this.selectedCategory.code, event.value.name);
  }

  drawChart(categoryName: string, parliamentName?: string) {
    console.log("Selected Category Name: ", categoryName);
    let observableBatch = [];
    let whereQuery =
      "/query?where=1%3D1&outFields=PARLIMEN,NAMA_JALAN,NAMA_TAMAN,NAMA_KAWASAN,KATEGORI,SERVIS_PERKHIDMATAN_JKAS&returnGeometry=false&returnTrueCurves=false&f=json";
    for (let i = 0; i < this.topLayers.length; i++) {
      if (this.topLayers[i]["name"] === categoryName) {
        console.log("adding ID: ", this.topLayers[i]["id"]);
        let url =
          "https://g-aset.dbkl.gov.my/gasset1/rest/services/CERAPAN_WGS/JKAS_GASET/MapServer/" +
          this.topLayers[i]["id"] +
          "/query?where=1%3D1&outFields=PARLIMEN&returnGeometry=false&returnTrueCurves=false&f=json";
        observableBatch.push(this.http.get(url));
      }
    }
    this.spinner.show();
    forkJoin(observableBatch).subscribe((data) => {
      console.log("data: ", data);
      let rows = [];
      console.log("finish...");
      this.barChartLabels = [];
      this.barChartData = [];
      let chartData = [];
      let color = [];
      let borderColor = [];
      // filter for valid rows
      rows = data.map(
        (row: any) =>
          row &&
          row.features && {
            parliament: row["features"][0]["attributes"]["PARLIMEN"],
            features: row["features"].map(
              (feature: any) => feature["attributes"]
            ),
          }
      );

      rows = rows.filter(
        (row: any) => row !== undefined && row.features.length > 0
      );

      if (parliamentName) {
        // filter for selected parliament
        rows = rows.filter((row: any) => row["parliament"] === parliamentName);
      }

      // sort by parliament
      rows.sort((a: any, b: any) => {
        if (a.parliament < b.parliament) return -1;
        if (a.parliament > b.parliament) return 1;
        return 0;
      });
      console.log("rows: ", rows);

      rows.forEach((row: any, index: any) => {
        let count = row.features.length;
        let parliament = row.parliament;

        this.barChartLabels.push(parliament);
        chartData.push(count);
        // let index = Math.floor(Math.random() * colorList.length - 1);
        color.push(this.colorList[index]);
        borderColor.push(this.borderColorList[index]);
      });
      this.barChartData.push({
        data: chartData,
        label: categoryName,
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 0, 0, 0.1)",
      });
      this.spinner.hide();
    });
  }
}
