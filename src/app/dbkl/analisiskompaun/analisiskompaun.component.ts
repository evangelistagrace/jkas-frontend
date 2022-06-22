import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ExcelService } from "src/app/services/excel.service";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 


@Component({
  selector: 'app-analisiskompaun',
  templateUrl: './analisiskompaun.component.html',
  styleUrls: ['./analisiskompaun.component.css']
})
export class AnalisiskompaunComponent implements OnInit {
  fileName= 'NUMBER OF COMPOUND.xlsx';  
  fileName1= 'LIST OF COMPOUND.xlsx';  
  loginError: boolean;
  errorMsg: any;
  baseURL = environment.basePublicUrl;
  data: any= [];
  analysisData: any=[];
  dataShow: any=[];
  analysis: any=[];
  uuk35: any=[];
  uuk34: any=[];
  uuk33: any=[];
  sek47_1a: any=[];
  sek47_1c: any=[];
  sek47_1d:any=[];
  sek47_1e: any=[];
  sek47_1g: any=[];
  sek47_2b: any=[];
  sek47_2a: any=[];
  uuk8: any=[];
  uuk9: any=[];
  uuk3: any=[];
  uuk5_c: any=[];
  uuk5_b: any=[];
  uuk5_a:any=[];
  sek46_1g: any=[];
  sek46_1f: any=[];
  sek46_1e: any=[];
  sek46_1d: any=[];
  sek46_1c: any=[];
  sek46_1b: any=[];
  sek82_5: any=[];
  sek69 : any=[];
  january: any=[];
  month: any=[];
  months: any=[];
  sek47_1b:any=[];
  total: any=[];
  data1: any=[];
  januaryData: any=[];
  juneData: any=[];
  june: any=[];
  julyData: any=[];
  july: any=[];
  augData: any=[];
  sepData: any=[];
  september: any=[];
  mayData: any=[];
  may: any=[];
  aprilData: any=[];
  april: any=[];
  marchData: any=[];
  march: any=[];
  august: any=[];
  febData: any=[];
  feb: any=[];
  janData: any=[];
  octData:any=[];
  october:  any=[];
  novData: any=[];
  desData:  any=[];
  desember: any=[];
  november: any=[];
  lang: string;
  sizevalue: any=[];
  totalData: any=[];
  datatotal: any=[];
  compound: any=[];
  totalcompound: any=[];
  datatotalCompound: any=[];
  parlimen: any=[];
  parli: any=[];
  Bandar: any=[];
  Bandarparlimen: any=[];
  totalcompound1: any;
  totalcompound2: any;
  totalcompound3: any;
  totalcompound4: any;
  totalcompound5: any;
  totalcompound6: any;
  totalcompound7: any;
  totalcompound8: any;
  totalcompound10: any;
  totalcompound11: any;
  totalcompound9: any;
  totalcompound12: any;
  isAdminType: string;
  username: string;
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private excelService:ExcelService) {
    
   }

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    window.scroll(0, 0);
    this.spinner.show();
    localStorage.setItem("path", "/dbkl/compoundanalysis");
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    this.http
      .get(this.baseURL + "/dbkl/compoundAnalysis", {
        headers: headers,
      })
      .subscribe(
        (res) => {
         
          this.data =  res;
          console.log( this.data);


          // this.analysis=this.data.analysisData[1].data[0].monthlydata;
          this.analysis=this.data;

this.sizevalue=this.analysis.length;
//console.log(this.sizevalue);
this.totalData=(this.analysis[12].totalData)
this.datatotal.push(this.totalData);
//console.log(this.datatotal);
          
          for(let i=0;i<this.analysis.length;i++)
          {
            this.month=this.analysis[i].month;
            this.months.push(this.month);
           // console.log(this.months);
          }
        
          // for(let key of this.analysis){
          //   this.dataShow.push(key);
          //   console.log(this.dataShow);
          // }
          for(let i=0;i<this.analysis.length;i++)
          {
            this.month=this.analysis[i].month;
            if(this.month=="January")
            {

              this.janData=(this.analysis[i].monthlydata);
              //console.log("hyy",this.janData);
              
              this.january.push(this.janData);
              //console.log(this.january);
            }
            else if(this.month=="February"){
              this.febData=(this.analysis[i].monthlydata)
              this.feb.push(this.febData);
              //console.log(this.feb);
            }
            else if(this.month=="March"){
              this.marchData=(this.analysis[i].monthlydata)
              this.march.push(this.marchData);
              //console.log(this.march);
            }
            else if(this.month=="April"){
              this.aprilData=(this.analysis[i].monthlydata)
              this.april.push(this.aprilData);
              //console.log(this.april);
            }
            else if(this.month=="May"){
              this.mayData=(this.analysis[i].monthlydata)
              this.may.push(this.mayData);
              //console.log(this.may);
            }
            else if(this.month=="June"){
              this.juneData=(this.analysis[i].monthlydata)
              this.june.push(this.juneData);
              //console.log(this.june);
            
            }
            else if(this.month=="July"){
              this.julyData=(this.analysis[i].monthlydata)
              this.july.push(this.julyData);
              //console.log(this.july);
        
            }
            else if(this.month=="August"){
              this.augData=(this.analysis[i].monthlydata)
              this.august.push(this.augData);
              //console.log(this.august);
            }
            else if(this.month=="September"){
              this.sepData=(this.analysis[i].monthlydata)
              this.september.push(this.sepData);
              //console.log(this.september);
            }
            else if(this.month=="October"){
              this.octData=(this.analysis[i].monthlydata)
              this.october.push(this.octData);
              //console.log(this.october);
        
            }
            else if(this.month=="November"){
              this.novData=(this.analysis[i].monthlydata)
              this.november.push(this.novData);
              //console.log(this.november);
            }
            else if(this.month=="December"){
              this.desData=(this.analysis[i].monthlydata)
              this.desember.push(this.desData);
              //console.log(this.desember);
            }
        
          }
          
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );

      this.http
        .get(this.baseURL + "/dbkl/getCompoundCount", {
          headers: headers,
        })
        .subscribe(
          (res) => {
            this.spinner.hide();
            this.data1 = res;
            //console.log(this.data1);
            this.compound=this.data1;
            console.log(this.compound);
  
          },
          (error) => {
            this.loginError = true;
            this.errorMsg = error["error"]["message"];
          }
        );
  }

  backtotop(){
    window.scroll(0, 0);
  }
  exportAsXLSX():void {
      /* table id is passed over here */   
      let element = document.getElementById('DyanmicTable'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
  }
  exportAsXLSX1():void {
    /* table id is passed over here */   
    let element = document.getElementById('DyanmicTable1'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName1); 
  }

  createPdf() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('JKAS', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({ html: '#DyanmicTable' })

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('NUMBER OF COMPOUND.pdf');
  }

  
  createPdf1() {
    var doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('JKAS', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    (doc as any).autoTable({ html: '#DyanmicTable1' })

    // below line for Open PDF document in new tab
    // doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save('LIST OF COMPOUND.pdf');
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
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
}
