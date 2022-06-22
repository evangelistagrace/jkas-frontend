import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Chart } from 'angular-highcharts';
import { environment } from "src/environments/environment";
import { color, Options } from 'highcharts';
@Component({
  selector: "app-google-analytics",
  templateUrl: "./google-analytics.component.html",
  styleUrls: ["./google-analytics.component.css"],
})
export class GoogleAnalyticsComponent implements OnInit {
  pageviews: any = [];
  dateArray: any = [];
  pageviewsArray: any = [];
  lineChartLabels: any;
  DataArray: any = [];
  sort: any = [];
  currentDate: Date;
  latest_date: string;
  ElseData: any = [];
  ActualData: any = [];
  chart: Chart;
  options: Options;
  url: any = environment.basePublicUrl;
  data: any = [];
  constructor(private http: HttpClient, public datepipe: DatePipe) {
    this.currentDate = new Date();
    this.latest_date = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");

    // console.log(this.latest_date)
  }

  ngOnInit() {



    // console.log("Hello bro")
    this.currentDate = new Date();
    // console.log(this.currentDate);
    let headers = {
      accept: "application/json",
    };
    this.http
      .get(this.url + "/dbkl/getGoogleAnalyticsReport", {
        headers: headers,
      })
      .subscribe((data) => {
        // console.log(JSON.stringify(data))

        this.DataArray = data;
        this.init();
        //  console.log("local data",this.DataArray);
        for (let i = 0; i < this.DataArray.length; i++) {

          this.dateArray.push(this.DataArray[i].date);
          this.pageviews.push(this.DataArray[i].Pageviews);
          // console.log(this.dateArray);
          if (this.DataArray[i].date.length > 8) {
            this.sort.push(this.DataArray[i].date.substring(0, 5));

            // console.log("after sort" + this.sort)
          } else {
            this.sort.push("Today");
          }
        }

        //    console.log('my tabe data',this.pageviews);
        //     localStorage.setItem('ElseData',JSON.stringify(this.DataArray));
        //   // if(localStorage.getItem("ElseData") == "" ){
        //     for (let i = 0; i < this.DataArray.length; i++) {
        //       this.dateArray.push(this.DataArray[i].date);
        //       this.pageviews.push(this.DataArray[i].Pageviews);
        //       // console.log(this.dateArray);
        //       if (this.DataArray[i].date.length > 8) {
        //         this.sort.push(this.DataArray[i].date.substring(0, 5));
        //         // console.log("after sort" + this.sort)
        //       } else {
        //         this.sort.push("Today");
        //       }
        //       this.chart.config.data.labels.push(this.sort[i]);

        //       this.chart.data.datasets.forEach((dataset) => {
        //         dataset.data.push(this.pageviews[i]);
        //       });

        //       this.chart.update();
        //     }
        // // }
        // // else{
        //   console.log("else excuted");
        //     this.ElseData= localStorage.getItem('ElseData');
        //     console.log(JSON.parse(this.ElseData));
        //     // this.DataArr=JSON.parse(this.ElseData);
        //     // console.log(this.DataArr);

        //   // for (let i = 0; i < this.DataArr.length; i++) {
        //   //     this.dateArray.push(this.DataArr.date);
        //   //     this.pageviews.push(this.DataArr.Pageviews);
        //   //     // console.log(this.dateArray);
        //   //     if ( this.DataArr[i].date.length > 8) {
        //   //       this.sort.push( this.DataArr.date.substring(0, 5));
        //   //       // console.log("after sort" + this.sort)
        //   //     } else {
        //   //       this.sort.push("Today");
        //   //     }
        //   //     this.chart.config.data.labels.push(this.sort[i]);

        //   //     this.chart.data.datasets.forEach((dataset) => {
        //   //       dataset.data.push(this.pageviews[i]);
        //   //     });

        //   //     this.chart.update();
        //   //   }

        // // }
      });

    // this.chart = new Chart("canvas", {
    //   type: "bar",
    //   data: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "",
    //         data: [],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(93 ,156, 96,0.43)",
    //         ],
    //         borderColor: [
    //           "rgba(255, 99, 132, 1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)",
    //           "white",
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },

    // options: {
    //   legend: {
    //     display: false,
    //   },

    //   tooltips: {
    //     custom: function (tooltip) {
    //       if (!tooltip) return;
    //       // disable displaying the color box;
    //       tooltip.displayColors = false;

    //     },
    //   callbacks: {
    //     use label callback to return the desired label
    //     label: function (tooltipItem, data) {
    //       tooltipItem.xLabel=""
    //       return tooltipItem.xLabel + " :" + tooltipItem.yLabel;
    //     },
    //   remove title

    //     }
    //   },
    //   scales: {
    //     yAxes: [
    //       {display: false},
    //       {
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }
    //     ]

    //   }


    //   responsive: true,
    // },
    // });
  }
  init() {



    this.options = {
      chart: {
        type: 'column',
        backgroundColor: null,


      },
      xAxis: {
        categories: this.dateArray,
        labels: {
          style: {
            color: '#FFFFFF'

          }
        }
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      yAxis: {
        visible: false,
      },

      series: [{
        type: undefined,
        name: 'PageViews',

        colorByPoint: true,
        pointWidth: 22,
        data: this.pageviews

      }]
    };
    let chart = new Chart(this.options);
    this.chart = chart;



  }

}