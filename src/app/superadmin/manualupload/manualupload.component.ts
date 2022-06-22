import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as $ from 'jquery';

@Component({
  selector: 'app-manualupload',
  templateUrl: './manualupload.component.html',
  styleUrls: ['./manualupload.component.css']
})
export class ManualuploadComponent implements OnInit {

  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";
  baseUrl = environment.basePublicUrl;
  imageGroup: FormGroup;
  basePublicUrl = environment.basePublicUrl;
  FileArray: any = [];
  myfiles: string;
  npErrorMessage: any;
  UploaderData1: any = [];
  submitted: boolean;
  firstFile: any;
  body: any;
  listOfIds: string;
  IdsArray: any = [];
  manual_heading: any;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  uploader2: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  display: string;
  displayerror: string;
  manual_body: any;
  list: Object;
  errorMessage: any;
  selected: boolean;
  display2: string;
  display3: string;
  selectedRows: any;
  anncdata: any;
  lang: string;
  sucessmsg: string;
  erressmsg: string;
  errorDisplay: string;
  errssmsg: string;
  display6: string;
  errorDisplay1: string;
  display4: string;
  mannualbody: any;
  mannualheading: any;
  mannualid: any;
  manualpath: any;
  errsmsg: string;
  upsucessmsg: string;
  fileName: string;
  myfiles1: string;
  UploaderData2: any=[];
  showfile: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

   
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/superadmin/manualupload");

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };
    this.spinner.show();
    this.http
      .post(environment.basePublicUrl + "/public/getManual/"+this.lang, {
        headers: headers,
      })
      .subscribe((data) => {
        this.spinner.hide();
        this.list = data;
      //  console.log(data)
      },
        (error) => {
          this.errorMessage = error["error"]["message"];
          this.spinner.hide();

        }

      );
    this.imageGroup = new FormGroup({
      heading: new FormControl("", [Validators.required]),
      body: new FormControl("", [Validators.required]),
      file: new FormControl("", [Validators.required]),

    });
    this.uploader.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    
  }
  update(id){
    console.log(id);
    
    //  console.log(id);
    for (var i = 0; i < this.uploader2.queue.length; i++) {
      let fileItem = this.uploader2.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      this.fileName = fileItem.name;
      this.UploaderData2.push(fileItem.name);
      this.myfiles1 = JSON.stringify(this.UploaderData2);
      // this.firstFile = fileItem.name;
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      console.log('string', this.myfiles1);
      
  
      //  this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader2.clearQueue();
      this.spinner.show();
      let key = localStorage.getItem("AccessToken");
      let body = {
        manual_heading: this.manual_heading,
        manual_body:this.manual_body,
        manual_path: this.myfiles1.substring(2, this.myfiles1.length - 2),
      }
      console.log(this.myfiles1.substring(2, this.myfiles1.length - 2));    
      let headers = {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization:key,
      };
  
      this.http
        .put(environment.basePublicUrl + "/public/updateManual/"+id, body, {
          headers: headers,
        })
        .subscribe((data) => {
          this.spinner.hide();
          
          //window.location.reload();
          // console.log(data)
          this.anncdata=data["message"] ;
        
          if (this.anncdata == "announcement_updated")  {
    
            if (this.lang == "en") {
  
              this.upsucessmsg = "Announcement updated successfully!";
            }
            else {
              this.upsucessmsg = "Pengumuman berjaya dikemas kini!";
            }
          }
          // this.updatemodal();
        },
        (error) => {
          this.errorMessage = error["error"]["message"];
          this.spinner.hide();
      //  console.log(error);
  
          if (this.errorMessage == "announcement_not_updated")  {
    
            if (this.lang == "en") {
  
              this.errsmsg = "Announcement could not be updated! Please refer console logs for further details.";
            }
            else {
              this.errsmsg = "Pengumuman tidak dapat dikemas kini! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          this.errorModel();
        }
      }
        );
      
      this.closeUpdateModal();
    }
  uploadSubmit() {
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      this.UploaderData1.push(fileItem.name);
      this.myfiles = JSON.stringify(this.UploaderData1);
      this.firstFile = fileItem.name;
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe(data => console.log(data.message));
    }
    this.uploader.clearQueue();

  }

  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }

  get f() {
    return this.imageGroup.controls;
  }

  manualpdf() {

    this.submitted = true;
    if (this.imageGroup.invalid) {
      return;
    }
    this.spinner.show();

    this.uploadSubmit();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization:key,
    };
    let body = {
      manual_heading:this.manual_heading,
      manual_body: this.manual_body,
      manual_path: this.myfiles.substring(2, this.myfiles.length - 2),
      language:this.lang,
    };
   //  console.log(this.body);
    this.http
      .post(environment.basePublicUrl + "/public/createManual", body, {
        headers: headers,
      })
      .subscribe(
        (resp) => {
  this.spinner.hide();
  this.anncdata=resp["message"] ;
 // console.log(this.anncdata);
  if (this.anncdata == "manual_added") {

    if (this.lang == "en") {

      this.sucessmsg = "Manual added successfully!";
    }
    else {
      this.sucessmsg = "Manual berjaya ditambahkan!";
    }
  }

  this. openmodel();
        },
        (error) => {
          // console.log(".....",error['error']['message']);
          this.npErrorMessage = error["error"]["message"];
          if (this.npErrorMessage == "manual_not_added") {

            if (this.lang == "en") {
        
              this.erressmsg = "Manual could not be added! Please refer console logs for further details.";
            }
            else {
              this.erressmsg = "Manual tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
this.errorModel();

        }
      );
  }
  openmodel(){
    this.display="block";
  }
  onCloseHandled(){
    this.display = "none";
    window.location.reload();
  }
  errorModel(){
    this.displayerror="block";
  }
  onCloseHandled1(){
    this.displayerror="none";
  }
  backtotop() {
    window.scroll(0, 0);
  }

  settings = {
    selectMode: "multi",
    actions: {
      columnTitle: "Kemaskini",
      edit: false,
      position: "right",
      delete: false,
      add: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit custom-font"></i>',
        },
      ],
    },
    columns: {
      manual_id: {
        title: "Bil. Pengumuman",
      },
      manual_heading: {
        title: "Tajuk",
      },
      manual_body: {
        title: "Keterangan",
      },
      manual_path: {
        title: "Manual Dokumen (PDF)",
        type: "html",
        valuePrepareFunction: (cell, row) => {
              return "<a target='_blank' href=" +
              this.basePublicUrl +
              "/jkas_resourses/public/pdfs/" +
              row.manual_path +
              " >" +
              row.manual_path +
              "</a>"
        },
      },
    },
  };

  onUserRowSelect(event) {
    this.selected = true;
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].manual_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
   //  console.log(this.listOfIds);
    // console.log(this.listOfIds.length);
    // console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
  }

  onCustomEvent(event){
    this.showfile=true;
    console.log(event.data);
    this.manual_body=event.data.manual_body;
    this.manual_heading=event.data.manual_heading;
    this.mannualid=event.data.manual_id;
    this.manualpath=event.data.manual_path;
    switch (event.action) {
      case "routeToUpdateApplicationForm":
        console.log(event.data.manual_body);
       
        this.openUpdateModal();
       
        break;
    }
   
    
  }

  remove(){


    this.showfile=false;
  }
  openUpdateModal() {
    this.display4 = "block";
  }

  closeUpdateModal(){
    this.display4 = "none";
  }
  deleteSelected() {
    let authorization = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: authorization,
      }),
      body: {
        manual_id: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    this.spinner.show();
    // console.log(options);
    this.http
      .delete(
        environment.basePublicUrl + "/public/deleteManual",
        options
      )
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.spinner.hide();
        this.anncdata=s["message"] ;
 
  if (this.anncdata == "manual_deleted") {

    if (this.lang == "en") {

      this.sucessmsg = "Manual deleted successfully!";
    }
    else {
      this.sucessmsg = "Manual berjaya dipadamkan!";
    }
  }
        this.openSuccessModal();
      },
      (error)=>{
        this.spinner.hide();
        this.anncdata=error["message"] ;
 
        if (this.anncdata == "manual_not_deleted") {
      
          if (this.lang == "en") {
      
            this.errssmsg = "Manual could not be deleted! Please refer console logs for further details.";
          }
          else {
            this.errssmsg = "Manual tidak dapat dipadamkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
          }
        }
        this.openErrorModal();
      }
      );
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  openSuccessModal() {
    this.display6 = "block";
  }
  openErrorModal() {
    this.errorDisplay1 = "block";
  }
  onCloseSuccessModal1() {
    window.location.reload();
   
  }
  closeErrorModal1(){
    this.errorDisplay1 = "none";
  }
  openModalDelete() {
    if (this.listOfIds == undefined) {
      this.openmodal3();
      return;
    }
    this.display2 = "block";
  }
  closeModalDelete() {
    this.display2 = "none";
  }
  openmodal3() {
    this.display3 = "block"
  }
  closemodal3() {
    this.display3 = "none"
  }

}
