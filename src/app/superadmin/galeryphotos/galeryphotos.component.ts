import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import * as $ from 'jquery';
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-galeryphotos',
  templateUrl: './galeryphotos.component.html',
  styleUrls: ['./galeryphotos.component.css']
})
export class GaleryphotosComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: true,
    autoHeight: true,
    autoWidth: true,

    nav: true,
    margin: 5,
    navText: [
      '<i class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-right fa-2x nnn" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";
  baseUrl = environment.basePublicUrl;
  imageGroup: FormGroup;
  FileArray: any = [];
  myfiles: string;
  npErrorMessage: any;
  UploaderData1: any = [];
  submitted: boolean;
  firstFile: any;
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  display: string;
  displayerror: string;
  imagesArray: any = [];
  access_token: string;
  lang: string;
  anncdata: any;
  sucessmsg: string;
  annnpErrorMessagecdata: string;
  errssmsg: string;
  display3: string;
  errorDisplay: string;
  errsmsg: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/superadmin/galeryphoto");
    this.access_token = localStorage.getItem('dbkl_access_token');
    this.spinner.show();

    this.fetchImages();
    this.imageGroup = new FormGroup({
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

  uploadSubmit() {
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData1.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles = JSON.stringify(this.UploaderData1);
      this.firstFile = fileItem.name;
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      this.uploadFile(data).subscribe(data => console.log(data.message));
    }
    this.uploader.clearQueue();

  }

  fetchImages() {

    this.http.get(environment.basePublicUrl + "/public/getGalleryPhoto").subscribe(images => {
      this.imagesArray = images;
    //  console.log(this.imagesArray)
      this.spinner.hide();
    })
  }
  uploadFile(data: FormData): Observable<any> {
    this.spinner.show();
    let headers = {
      "accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": this.access_token
    }

    let body =
    {
      "photo_path": this.firstFile
    }

    this.http.post(environment.basePublicUrl + "/public/addGalleryPhoto", body, { headers: headers }).subscribe(data => {
    //  console.log("done");
      this.spinner.hide();
      this.openmodel();
    })

    // debugger
    return this.http.post<any>(this.SERVER_URL, data);

  }

  get f() {
    return this.imageGroup.controls;
  }

  galeryphoto() {

    this.submitted = true;
    if (this.imageGroup.invalid) {
    //  console.log("ii");

      return;
    }
    this.uploadSubmit();


    let headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    let body = {
      invoice_document: this.myfiles.substring(2, this.myfiles.length - 2),
    };
    // console.log(
    //   "my body" + JSON.stringify(body))
    this.http
      .post(environment.basePublicUrl + "", body, {
        headers: headers,
      })
      .subscribe(
        (resp) => {
          // this.anncdata=resp["message"] ;
          // console.log("this my hot"+resp);

          // if (this.anncdata == "galleryphoto_added") {
        
          //   if (this.lang == "en") {
        
          //     this.sucessmsg = "Gallery Photo added successfully!";
          //   }
          //   else {
          //     this.sucessmsg = "Foto Galeri berjaya ditambahkan!";
          //   }
          this.openmodel();
          
        },
        (error) => {
          // console.log(".....",error['error']['message']);
          this.npErrorMessage = error["error"]["message"];
          // this.errorModel();
          
          if (this.annnpErrorMessagecdata == "galleryphoto_not_deleted") {
        
            if (this.lang == "en") {
        
              this.errssmsg = "Gallery Phtoto could not be deleted! Please refer console logs for further details.";
            }
            else {
              this.errssmsg = "Foto Galeri tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }
      );
  }
  openmodel() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    window.location.reload();
  }
  errorModel() {
    this.displayerror = "block";
  }
  onCloseHandled1() {
    this.displayerror = "none";
  }
  backtotop() {
    window.scroll(0, 0);
  }
  onDelete(id) {
   // console.log(id);
    
    this.spinner.show();
    const options = {
      headers: new HttpHeaders({
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": this.access_token
      }),
      body: {
        "photo_id": id
      },
    };

  //  console.log(options)
    this.http.delete(environment.basePublicUrl + "/public/deleteGalleryPhoto", options)
    .subscribe(res => {
    //  console.log(res);
      this.fetchImages();
    
      this.anncdata=res["message"] ;
      

      if (this.anncdata == "galleryphoto_deleted") {
    
        if (this.lang == "en") {
    
          this.sucessmsg = "Gallery Photo deleted successfully!";
        }
        else {
          this.sucessmsg = "Foto Galeri berjaya dipadam!";
        }
        this.openSuccessModal()
      }
    },
    (error)=>{

      this.anncdata=error["message"] ;
      

      if (this.anncdata == "galleryphoto_not_deleted") {
    
        if (this.lang == "en") {
    
          this.errsmsg = "Gallery Phtoto could not be deleted! Please refer console logs for further details.";
        }
        else {
          this.errsmsg = "Galeri Phtoto tidak dapat dipadamkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
        }
      this.openErrorModal();      
    }
  }
    )
  }
  onCloseSuccessModal() {
   
    window.location.reload();
  }
  openSuccessModal() {
    this.display3 = "block";
  }
  openErrorModal() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    window.location.reload();
   
  }
}