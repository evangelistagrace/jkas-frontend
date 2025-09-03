import { HttpClient } from "@angular/common/http";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as $ from "jquery";
import { NgxSpinnerService } from "ngx-spinner";
import { user } from "src/app/table/usermanage";
import { usermanagement } from "src/app/table/usermanagment";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-emeeting",
  templateUrl: "./emeeting.component.html",
  styleUrls: ["./emeeting.component.css"],
})
export class EmeetingComponent implements OnInit {
  bill_mesyuarat: any;
  jenis_mesyuarat: any;
  jenis_jawatankuasa: any;
  tarikh_mesyuarat: any;
  hingga: any;
  data: any;
  loginError: boolean;
  errorMsg: any;
  basePublicUrl = environment.basePublicUrl;
  keyValue: any;
  meeting_id: any;
  is1st: boolean;
  Committee: Object;
  submitted: boolean = false;
  searchGroup: FormGroup;
  newGroup: FormGroup;
  until: any;
  masa_mesyuarat: any;
  check: boolean;
  message: any;
  isTable: boolean;
  username: string;
  isAdminType: string;
  senarai_permohonan: File | null = null;
  minit_mesyuarat: File | null = null;
  uploadedFiles: { [key: string]: File } = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    localStorage.setItem("path", "/dbkl/emeeting");
    this.newGroup = new FormGroup({
      bill_mesyuarat: new FormControl("", [Validators.required]),
      jenis_mesyuarat: new FormControl("", [Validators.required]),
      jenis_jawatankuasa: new FormControl("", [Validators.required]),
      tarikh_mesyuarat: new FormControl("", [Validators.required]),
      masa_mesyuarat: new FormControl("", [Validators.required]),
      hingga: new FormControl("", [Validators.required]),
      senarai_permohonan: new FormControl("", [Validators.required]),
      minit_mesyuarat: new FormControl("", [Validators.required]),
    });
    this.searchGroup = new FormGroup({
      jenis_mesyuarat: new FormControl("", [Validators.required]),
      jenis_jawatankuasa: new FormControl("", [Validators.required]),
    });
    this.is1st = false;
    this.isTable = false;
    this.hingga;
    this.masa_mesyuarat;
    this.tarikh_mesyuarat;
    this.jenis_jawatankuasa;
    this.jenis_mesyuarat;
    this.bill_mesyuarat;

    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getCommitteeList", { headers: headers })
      .subscribe(
        (res) => {
          this.Committee = res;
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  addbutton() {
    this.is1st = true;
  }

  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `src/app/assets/${file.name}`;
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        // Save the file content to the assets folder
        this.http
          .post("/save-file", { path: filePath, content: fileContent })
          .subscribe(
            () => {
              console.log(`${file.name} saved successfully.`);
            },
            (error) => {
              console.error(`Error saving ${file.name}:`, error);
            }
          );
      };
      reader.readAsDataURL(file);
      
      // Track uploaded files
      this.uploadedFiles[fieldName] = file;

      if (fieldName === "senarai_permohonan") {
        this.senarai_permohonan = file;
      } else if (fieldName === "minit_mesyuarat") {
        this.minit_mesyuarat = file;
      }
      // Update form control value
      this.newGroup.get(fieldName)?.setValue(file.name);
    }
  }

  backtotop() {
    window.scroll(0, 0);
  }

  get f() {
    return this.newGroup.controls;
  }
  new() {
    this.submitted = true;
    if (this.newGroup.invalid) {
      return;
    }
    this.router.navigate(["/dbkl/newemeeting"], {
      queryParams: {
        value: this.bill_mesyuarat,
        value1: this.jenis_mesyuarat,
        value2: this.jenis_jawatankuasa,
        value3: this.tarikh_mesyuarat,
        value4: this.hingga,
        value5: this.masa_mesyuarat,
        value6: this.senarai_permohonan?.name || "",
        value7: this.minit_mesyuarat?.name || "",
      },
    });
  }

  search() {
    // console.log("Hih"+this.jenis_mesyuarat+"hi");
    // console.log("Hih"+this.jenis_jawatankuasa+"hi");
    if (
      this.jenis_mesyuarat == undefined ||
      this.jenis_jawatankuasa == undefined
    ) {
      this.check = true;
      // console.log(this.check);
      return;
    }
    this.router.navigate(["/dbkl/listemeeting"], {
      queryParams: {
        value: this.jenis_mesyuarat,
        value1: this.jenis_jawatankuasa,
      },
    });
    // this.isTable=true;
    // this.update();
  }
printForm(): void {
  // Get the form data
  const formData = this.newGroup.value;
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (printWindow) {
    // Build the HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>E-Meeting Form</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #253d84;
            padding-bottom: 20px;
          }
          .form-section {
            margin-bottom: 20px;
          }
          .form-row {
            display: flex;
            margin-bottom: 15px;
          }
          .form-row label {
            font-weight: bold;
            width: 200px;
            display: inline-block;
          }
          .form-row span {
            flex: 1;
            border-bottom: 1px dotted #ccc;
            padding-bottom: 2px;
          }
          .logo {
            max-width: 150px;
            margin-bottom: 10px;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="../../../assets/img/dbkl_logo.png" alt="DBKL Logo" class="logo">
          <h2>JABATAN KESIHATAN DAN ALAM SEKITAR</h2>
          <h3>E-MEETINGS</h3>
        </div>
        
        <div class="form-section">
          <div class="form-row">
            <label>Bil. Meeting:</label>
            <span>${formData.bill_mesyuarat || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Meeting Type:</label>
            <span>${formData.jenis_mesyuarat || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Type of Committee:</label>
            <span>${formData.jenis_jawatankuasa || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Date of Meeting:</label>
            <span>${this.formatDate(formData.tarikh_mesyuarat) || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Meeting Time:</label>
            <span>${formData.masa_mesyuarat || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Until:</label>
            <span>${formData.hingga || '-'}</span>
          </div>
          
          <div class="form-row">
            <label>Senarai Permohonan:</label>
            <span>${this.getFileName('senarai_permohonan') || 'No file uploaded'}</span>
          </div>
          
          <div class="form-row">
            <label>Minit Mesyuarat:</label>
            <span>${this.getFileName('minit_mesyuarat') || 'No file uploaded'}</span>
          </div>
        </div>
        
        <div style="margin-top: 50px; text-align: center;">
          <p>Generated on: ${new Date().toLocaleDateString('en-MY')} ${new Date().toLocaleTimeString('en-MY')}</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;
    
    // Write content to the new window
    printWindow.document.write(printContent);
    printWindow.document.close();
  }
}

// Helper method to format date
private formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-MY', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Helper method to get uploaded file names
private getFileName(fieldName: string): string {
  if (this.uploadedFiles && this.uploadedFiles[fieldName]) {
    return this.uploadedFiles[fieldName].name;
  }
  return this.newGroup.get(fieldName)?.value || '';
}
  update() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };
    let body = {
      jenis_mesyuarat: this.jenis_mesyuarat,
      jawatankuasa_mesurat: this.jenis_jawatankuasa,
    };

    this.http
      .post(this.basePublicUrl + "/dbkl/listOfDetailedMeeting", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
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
      .post(this.basePublicUrl + "/dbkl/logout", body, { headers: header })
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

  settings = {
    // selectMode: 'multi',
    actions: {
      columnTitle: "Tindakan",
      position: "right",
      edit: false,
      delete: false,
      add: false,
      new: false,
      custom: [
        {
          name: "routeToUpdateApplicationForm",
          type: "html",
          title: '<i class="fa fa-edit"></i>',
        },
      ],
    },
    columns: {
      tajuk_mesyuarat: {
        title: "Tajuk Mesyuarat",
      },
      jenis_mesyuarat: {
        title: "Jenis mesyuarat",
      },
      jawatankuasa_mesurat: {
        title: " Jawatankuasa Mesyuarat",
      },
      tarikh_mesyuarat: {
        title: "Tarikh perjumpaan",
      },
      masa_mesyuarat: {
        title: "Masa perjumpaan",
      },
    },
  };

  onCustomEvent(event) {
    switch (event.action) {
      case "routeToUpdateApplicationForm":
        // console.log(event.data);
        this.keyValue = event.data;
        this.spinner.hide();
        this.router.navigateByUrl(
          "dbkl/getemeeting?id=" + this.keyValue.detailed_meeting_id
        );
        break;
    }
  }
}
