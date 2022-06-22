import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";

@Component({
  selector: "app-annoucements",
  templateUrl: "./annoucements.component.html",
  styleUrls: ["./annoucements.component.css"],
})
export class ANNOUCEMENTSComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";
  announcement_heading: any;
  announcement: any;
  registrationGroup: any;
  displayerror: string;
  display: string;
  errorMessage: any;
  submitted: boolean;
  list: Object;
  selected: boolean;
  display4: string;
  display2: string;
  display3: string;
  listOfIds: string;
  IdsArray: any = [];
  selectedRows: any;
  keyValue: any;
  announcementValue: void;
  headingValue: void;
  announceid: void;
  data: string;
  lang: string;
  sucessmsg: string;
  anncdata: any;
  errormsg: string;
  display5: string;
  errorDisplay: string;
  errorDisplay1: string;
  display6: string;
  errsmsg: string;
  upsucessmsg: string;
  dsucessmsg: string;
  derrmsg: string;
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
  fileName: string;
  UploaderData2: any=[];
  myfiles1: string;
  fileName2: string;
  announcepath: void;
  showfile: boolean;
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
   // this.errorModel();
    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/superadmin/annoucement");
    this.registrationGroup = new FormGroup({
      heading: new FormControl("", [Validators.required]),
      announce: new FormControl("", [Validators.required]),
    });

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };
    this.spinner.show();
    this.http
      .post(environment.basePublicUrl + "/public/getAnnouncement/"+this.lang, {
        headers: headers,
      })
      .subscribe((data) => {
        this.spinner.hide();
        this.list = data;
     //   console.log(data)
      },
        (error) => {
          this.errorMessage = error["error"]["message"];
          this.spinner.hide();

        }

      );
  }
  get f() { return this.registrationGroup.controls; }
  
  
  uploadFile(data: FormData): Observable<any> {
    // debugger
    return this.http.post<any>(this.SERVER_URL, data);
  }
  announcesubmit() {
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert("Each File should be less than 10 MB of size.");
        return;
      }
    }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      this.fileName = fileItem.name;
      this.UploaderData2.push(fileItem.name);
      this.myfiles1 = JSON.stringify(this.UploaderData2);
      // this.firstFile = fileItem.name;
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      console.log('string', this.myfiles1);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader.clearQueue();
    this.submitted = true;
    if (this.registrationGroup.invalid) {
      return;
    }
    let key = localStorage.getItem("AccessToken");
    let body = {
      announcement_heading: this.announcement_heading,
      announcement: this.announcement,
      announcement_path:this.fileName,
      language:this.lang,
    };
    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization:key,
    };

    this.http
      .post(environment.basePublicUrl + "/public/createAnnouncement", body, {
        headers: headers,
      })
      .subscribe((data) => {
        this.spinner.hide();
        
        // console.log(data)
        this.anncdata=data["message"] ;
       // console.log(this.anncdata);
        if (this.anncdata == "announcement_added") {
  
          if (this.lang == "en") {

            this.sucessmsg = "Announcement added successfully!";
          }
          else {
            this.sucessmsg = "Pengumuman berjaya ditambahkan!";
          }
        }this.openmodel();
      },
      (error) => {
        this.errorMessage = error["error"]["message"];
        this.spinner.hide();
        this.errorModel();
        

        if (this.errorMessage == "announcement_not_added") {
  
          if (this.lang == "en") {

            this.errormsg = "Announcement could not be added! Please refer console logs for further details.";
          }
          else {
            this.errormsg = "Pengumuman tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
          }
        }
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
  routeToNewApplication(){
    this.router.navigateByUrl("/superadmin/listofannouncement");
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
      announcement_id: {
        title: "Pengumuman id",
      },
      date: {
        title: "Tarikh",
      },
      announcement_heading: {
        title: "Tajuk pengumuman",
      },
      announcement: {
        title: "Pengumuman",
      },
      announcement_path: {

        title: "Gambar",

        type: "html",

        valuePrepareFunction: (cell, row) => {

          return "<a target='_blank' href=" +

            environment.basePublicUrl +

            "/jkas_resourses/free/images/" +

            row.announcement_path +

            " >" +

            row.announcement_path +

            "</a>"

        },      },
    },
  };

  onUserRowSelect(event) {
    this.selected = true;
    var i = 0;
    var j = 0;
    this.IdsArray = [];
    this.selectedRows = event.selected;
    for (i; i < this.selectedRows.length; i++)
      this.IdsArray.push(this.selectedRows[i].announcement_id);
    this.selectedRows = "";
    this.listOfIds = JSON.stringify(this.IdsArray);
   //  console.log(this.listOfIds);
  //   console.log(this.listOfIds.length);
  //   console.log(this.listOfIds.substring(1, this.listOfIds.length - 1));
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
        announcement_id: this.listOfIds.substring(
          1,
          this.listOfIds.length - 1
        ),
      },
    };
    this.spinner.show();
    // console.log(options);
    this.http
      .delete(
        environment.basePublicUrl + "/public/deleteAnnouncement",
        options
      )
      .subscribe((s) => {
        // console.log("my response" + JSON.stringify(s));
        this.spinner.hide();
        this.anncdata=s["message"] ;
      
        if (this.anncdata == "announcement_deleted")  {
  
          if (this.lang == "en") {

            this.dsucessmsg = "Announcement deleted successfully!";
          }
          else {
            this.dsucessmsg = "Pengumuman berjaya dipadamkan!";
          }
        }
        this.deletemodal();
      },
      (error) => {
        this.anncdata=error["message"] ;
    //  console.log(error)
        if (this.anncdata == "announcement_not_deleted")  {
  
          if (this.lang == "en") {

            this.derrmsg = "Announcement could not be deleted! Please refer console logs for further details.";
          }
          else {
            this.derrmsg = "Pengumuman tidak dapat dipadamkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
          }
        }
        this.errordeletemodal();
      });

  }
  deleteChecked() {
    if (this.IdsArray == undefined) {
      this.display3 = "block";
 
    }
    else if (this.IdsArray.length == 0) {
      this.display3 = "block";
    }
    else {
      this.openModalDelete();

    }
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

  openUpdateModal() {
    this.display4 = "block";
  }

  closeUpdateModal(){
    this.display4 = "none";
  }

// /public/updateAnnouncement


  onCustomEvent(event){
    this.showfile=true;
    switch (event.action) {
      case "routeToUpdateApplicationForm":

       console.log(event.data.announcement_path);
        this.headingValue=event.data.announcement_heading
        this.announcementValue=event.data.announcement
        this.announceid=event.data.announcement_id
        this.announcepath=event.data.announcement_path
        this.fileName2 =event.data.announcement_path
        this.openUpdateModal();
       
        break;
    }
   
    
  }
  

  remove(){
    this.showfile=false;
  }
  update(id){
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
      this.fileName2 = fileItem.name;
      console.log(fileItem.name);
      console.log(this.fileName2);
      
      
      this.UploaderData2.push(fileItem.name);
      this.myfiles1 = JSON.stringify(this.UploaderData2);
      // this.firstFile = fileItem.name;
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      console.log('string', this.myfiles1);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
      //  this.uploadFile(data).subscribe((data) => console.log(data.message));
    }
    this.uploader.clearQueue();
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let body = {
      announcement_heading: this.headingValue,
      announcement: this.announcementValue,
      announcement_path: this.fileName2,
    };
    console.log(body);
    
    
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization:key,
    };

    this.http
      .put(environment.basePublicUrl + "/public/updateAnnouncement/"+id, body, {
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
        }this.updatemodal();
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
  updatemodal(){
    this.display5="block";
  }
  hidePreviousFile(){
    this.showfile =false; 
  }
  errorupdatemodal(){
    this.errorDisplay="block";
  }
  onCloseSuccessModal(){
    window.location.reload();
  }
  closeErrorModal(){
    this.errorDisplay="none";
  }
  deletemodal(){
    this.display6="block";
  }
  errordeletemodal(){
    this.errorDisplay1="block";
  }
  onCloseSuccessModal1(){
    window.location.reload();
  }
  closeErrorModal1(){
    this.errorDisplay1="none";
  }
  
}


