import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { FileUploader } from "ng2-file-upload";
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";
@Component({
  selector: "app-newemeeting",
  templateUrl: "./newemeeting.component.html",
  styleUrls: ["./newemeeting.component.css"],
})
export class NewemeetingComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  basePublicUrl = environment.basePublicUrl;
  registrationGroup: FormGroup;
  submitted: boolean;
  kategori_mesyuarat: any;
  kekerapan_mesyuarat: any;
  jenis_mesyuarat: any;
  jabatan_terlibat: any = [];
  tarikh_mesyuarat: any;
  masa_mesyuarat: any;
  hingga: any;
  pengerusi: any;
  bill_mesyuarat: any;
  agenda_dan_minit: any;
  setiausaha: any;
  is1st: boolean;
  jenis_jawatankuasa: any;
  meeting_dokumen: any;
  model: any = {};
  fieldArray: Array<any> = [];
  isShowFieldTable: boolean = false;
  newAttribute: any = {};
  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  UploaderData1: any = [];
  myfiles: string;
  firstFile: string;
  display: string;
  display1: string;
  department: Object;
  errorMsg: any;
  loginError: boolean;
  filename: string;
  detailedmeeting: any;
  errmsg: string;
  meetingupdate: string;
  mettingtitle = "E-MEETINGS-NEW";
  lang: string;
  dropdownSettings: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    window.scroll(0, 0);

    this.model.bill_mesyuarat = this.route.snapshot.queryParamMap.get("value");
    this.model.jenis_mesyuarat =
      this.route.snapshot.queryParamMap.get("value1");
    this.model.jenis_jawatankuasa =
      this.route.snapshot.queryParamMap.get("value2");
    this.model.tarikh_mesyuarat =
      this.route.snapshot.queryParamMap.get("value3");

    this.uploader.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader.queue.length; i++) {
        let fileItem = this.uploader.queue[i]._file;
        this.filename = fileItem.name;
      }
    };
    this.model.hingga = this.route.snapshot.queryParamMap.get("value4");
    this.model.masa_mesyuarat = this.route.snapshot.queryParamMap.get("value5");
    this.model.senarai_permohonan_filename =
      this.route.snapshot.queryParamMap.get("value6");
    this.model.minit_mesyuarat_filename =
      this.route.snapshot.queryParamMap.get("value7");
    // console.log(this.model.masa_mesyuarat);
    localStorage.setItem(
      "path",
      "/dbkl/noticeform?value=" +
        this.model.bill_mesyuarat +
        "&value2=" +
        this.model.jenis_jawatankuasa +
        "&value3=" +
        this.model.tarikh_mesyuarat +
        "&value4=" +
        this.model.hingga +
        "&value5=" +
        this.model.masa_mesyuarat
    );
    this.is1st = false;
    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getDepartmentList", { headers: headers })
      .subscribe(
        (res) => {
          this.department = res;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  get f() {
    return this.registrationGroup.controls;
  }

  gettexts(e) {
    console.log(e.target.value);

    this.mettingtitle = e.target.value;
  }
  async onSubmit() {
    this.spinner.show();

    try {
      await this.uploadSubmit();
    } catch (error) {
      console.error("File upload failed:", error);
      this.spinner.hide();
      return;
    }

    let body = {
      jenis_jawatankuasa: this.model.jenis_jawatankuasa,
      jenis_mesyuarat: this.model.jenis_mesyuarat,
      jabatan_terlibat: this.jabatan_terlibat.join(","),
      tarikh_mesyuarat: this.model.tarikh_mesyuarat,
      masa_mesyuarat: this.model.masa_mesyuarat,
      hingga: this.model.hingga,
      pengerusi: this.model.pengerusi,
      bill_mesyuarat: this.model.bill_mesyuarat,
      tajuk_mesyuarat: this.model.tajuk_mesyuarat,
      setiausaha: this.model.setiausaha,
      tempat_mesyuarat: this.model.masa_mesyuarat,
      agenda_dan_minit: this.model.agenda_dan_minit,
      meeting_dokumen: this.meeting_dokumen,
    };
    //console.log(body);

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: localStorage.getItem("AccessToken"),
    };

    this.http
      .post(environment.basePublicUrl + "/dbkl/addDetailedMeeting", body, {
        headers: headers,
      })
      .subscribe(
        (data) => {
          this.spinner.hide();
          this.openModal();
          this.detailedmeeting = data["message"];
          if (this.meetingupdate == "detailed_meeting_added") {
            if (this.lang == "en") {
              this.meetingupdate = "Meeting Form added Successfully!";
            }
          } else {
            this.meetingupdate = "Borang Mesyuarat berjaya ditambahkan!";
          }
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          this.openModal1();

          if (this.errorMsg == "detailed_meeting_not_added") {
            if (this.lang == "en") {
              this.errmsg =
                "Meeting could not be added! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Mesyuarat tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
        }
      );
  }
  addbutton1() {
    debugger;
    this.is1st = true;
  }

  addFieldValue() {
    debugger;
    this.isShowFieldTable = true;
    // if (this.fieldArray.length >1) {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    // } else {

    // }
  }

  uploadSubmit(): Promise<void> {
    return new Promise((resolve, reject) => {
      const uploadedFiles = [];
      const uploadPromises = [];

      for (let j = 0; j < this.uploader.queue.length; j++) {
        const data = new FormData();
        const fileItem = this.uploader.queue[j]._file;
        uploadedFiles.push({ name: fileItem.name });

        data.append("file", fileItem);
        data.append("fileSeq", "seq" + j);

        this.filename = fileItem.name;

        // Create upload promise for each file
        // const uploadPromise = this.http.post(this.SERVER_URL, data).toPromise();
        const uploadPromise = Promise.resolve({
          success: true,
          fileName: fileItem.name,
        });
        uploadPromises.push(uploadPromise);
      }

      if (uploadPromises.length === 0) {
        // No files to upload
        this.meeting_dokumen = JSON.stringify([]);
        resolve();
        return;
      }

      // Wait for all uploads to complete
      Promise.all(uploadPromises)
        .then(() => {
          this.uploader.clearQueue();
          this.meeting_dokumen = JSON.stringify(uploadedFiles);
          console.log("Uploaded files:", this.meeting_dokumen);
          resolve();
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          reject(error);
        });
    });
  }

  backtotop() {
    window.scroll(0, 0);
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
    this.router.navigateByUrl("dbkl/emeeting");
  }
  openModal1() {
    this.display1 = "block";
  }
  onCloseHandled1() {
    this.display1 = "none";
    this.router.navigateByUrl("dbkl/dbklmainpage");
  }
  onItemSelect(item: any) {
    this.jabatan_terlibat.push(item);
  }
  onItemDeselect(item: any) {
    for (let i = 0; i < this.jabatan_terlibat.length; i++) {
      if (this.jabatan_terlibat[i] === item) {
        this.jabatan_terlibat.splice(i, 1);
      }
    }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file) {
        // Assuming you want to store the file name in the model
        this.model.uploadedFileName = file.name;
        console.log("File selected:", file.name);
      }
    }
  }
}
