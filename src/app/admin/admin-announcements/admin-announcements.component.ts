import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-admin-announcements",
  templateUrl: "./admin-announcements.component.html",
  styleUrls: ["./admin-announcements.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class AdminAnnouncementsComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFreeFile";

  announcementForm: FormGroup;
  updateForm: FormGroup;
  announcements: any[] = [];
  selectedAnnouncements: any[] = [];
  
  // Pagination properties
  rows: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 15, 20];

  lang: string;
  submitted: boolean = false;
  showUpdateDialog: boolean = false;
  editingAnnouncement: any = null;

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

  cols: any[] = [
    { field: "announcement_id", header: "ID" },
    { field: "date", header: "Date" },
    { field: "announcement_heading", header: "Heading" },
    { field: "announcement", header: "Announcement" },
    { field: "announcement_path", header: "Image" },
  ];

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      // ['link', 'image', 'video']
    ]
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.lang = localStorage.getItem("lang") || "en";
    localStorage.setItem("path", "/admin/announcements");
    this.loadAnnouncements();
  }

  initializeForms() {
    this.announcementForm = this.fb.group({
      heading: ["", [Validators.required]],
      announcement: ["", [Validators.required]],
      file: [""],
    });

    this.updateForm = this.fb.group({
      heading: ["", [Validators.required]],
      announcement: ["", [Validators.required]],
      file: [""],
    });
  }

  loadAnnouncements() {
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    this.spinner.show();
    this.http
      .post(
        environment.basePublicUrl + "/public/getAnnouncement/" + this.lang,
        {
          headers: headers,
        }
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          this.announcements = data;
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to load announcements",
          });
        }
      );
  }

  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.SERVER_URL, data);
  }

  onSubmit() {
    this.submitted = true;

    if (this.announcementForm.invalid) {
      return;
    }

    // Handle file uploads
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Each file should be less than 10 MB",
        });
        return;
      }
    }

    let fileName = "";
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      fileName = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }

    this.uploader.clearQueue();

    let key = localStorage.getItem("AccessToken");
    let body = {
      announcement_heading: this.announcementForm.value.heading,
      announcement: this.announcementForm.value.announcement,
      announcement_path: fileName,
      language: this.lang,
    };

    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .post(environment.basePublicUrl + "/public/createAnnouncement", body, {
        headers: headers,
      })
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data.message === "announcement_added") {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail:
                this.lang === "en"
                  ? "Announcement added successfully!"
                  : "Pengumuman berjaya ditambahkan!",
            });
            this.announcementForm.reset();
            this.submitted = false;
            this.loadAnnouncements();
            this.selectedAnnouncements = []; // Clear selection after adding
          }
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              this.lang === "en"
                ? "Announcement could not be added!"
                : "Pengumuman tidak dapat ditambahkan!",
          });
        }
      );
  }

  editAnnouncement(announcement: any) {
    this.editingAnnouncement = announcement;
    this.updateForm.patchValue({
      heading: announcement.announcement_heading,
      announcement: announcement.announcement,
    });
    this.showUpdateDialog = true;
  }

  updateAnnouncement() {
    if (this.updateForm.invalid) {
      return;
    }

    // Handle file uploads for update
    let fileName2 = this.editingAnnouncement.announcement_path;
    for (var i = 0; i < this.uploader2.queue.length; i++) {
      let fileItem = this.uploader2.queue[i]._file;
      if (fileItem.size > 10000000) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Each file should be less than 10 MB",
        });
        return;
      }
    }

    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      fileName2 = fileItem.name;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);
      this.uploadFile(data).subscribe((data) => console.log(data.message));
    }

    this.uploader2.clearQueue();
    this.spinner.show();

    let key = localStorage.getItem("AccessToken");
    let body = {
      announcement_heading: this.updateForm.value.heading,
      announcement: this.updateForm.value.announcement,
      announcement_path: fileName2,
    };

    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    this.http
      .put(
        environment.basePublicUrl +
          "/public/updateAnnouncement/" +
          this.editingAnnouncement.announcement_id,
        body,
        {
          headers: headers,
        }
      )
      .subscribe(
        (data: any) => {
          this.spinner.hide();
          if (data.message === "announcement_updated") {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail:
                this.lang === "en"
                  ? "Announcement updated successfully!"
                  : "Pengumuman berjaya dikemas kini!",
            });
            this.showUpdateDialog = false;
            this.loadAnnouncements();
            this.selectedAnnouncements = []; // Clear selection after update
          }
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              this.lang === "en"
                ? "Announcement could not be updated!"
                : "Pengumuman tidak dapat dikemas kini!",
          });
        }
      );
  }

  deleteSelectedAnnouncements() {
    if (
      !this.selectedAnnouncements ||
      this.selectedAnnouncements.length === 0
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "Warning",
        detail: "Please select announcements to delete",
      });
      return;
    }

    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected announcements?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteAnnouncements();
      },
    });
  }

  deleteAnnouncements() {
    const ids = this.selectedAnnouncements
      .map((a) => a.announcement_id)
      .join(",");

    let authorization = localStorage.getItem("AccessToken");
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: authorization,
      }),
      body: {
        announcement_id: ids,
      },
    };

    this.spinner.show();
    this.http
      .delete(environment.basePublicUrl + "/public/deleteAnnouncement", options)
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          if (response.message === "announcement_deleted") {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail:
                this.lang === "en"
                  ? "Announcements deleted successfully!"
                  : "Pengumuman berjaya dipadamkan!",
            });
            this.selectedAnnouncements = [];
            this.loadAnnouncements();
          }
        },
        (error) => {
          this.spinner.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              this.lang === "en"
                ? "Announcements could not be deleted!"
                : "Pengumuman tidak dapat dipadamkan!",
          });
        }
      );
  }

  getImageUrl(path: string): string {
    return `${environment.basePublicUrl}/jkas_resourses/free/images/${path}`;
  }

  viewImage(imagePath: string) {
    // Open image in new tab
    window.open(this.getImageUrl(imagePath), '_blank');
  }

  onImageError(event: any) {
    // Handle image load errors
    event.target.src = 'assets/images/no-image-placeholder.png';
    event.target.alt = 'Image not found';
  }

  onFileSelect(event: any, uploader: FileUploader) {
    // Handle file selection if needed
  }

  removeFile(item: any) {
    item.remove();
  }
}
