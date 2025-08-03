import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder } from "@angular/forms";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-announcements",
  templateUrl: "./announcements.component.html",
  styleUrls: ["./announcements.component.scss"],
})
export class AnnouncementsComponent implements OnInit {
  announcements: any[] = [];
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;
  totalPages = 0;
  selectedAnnouncement: any | null = null;
  showFullAnnouncement = false;

  // Date range filter
  filterForm: FormGroup;
  rangeDates: Date[] = [];
  lang: string;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      rangeDates: [null],
    });
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem("lang") || "en";
    this.loadAnnouncements();

    // Subscribe to form changes
    this.filterForm.get("rangeDates")?.valueChanges.subscribe((dates) => {
      this.currentPage = 1; // Reset to first page when filters change
      this.loadAnnouncements();
    });
  }

  loadAnnouncements(): void {
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };

    this.http
      .post(
        environment.basePublicUrl + "/public/getAnnouncement/" + this.lang,
        {
          headers: headers,
        }
      )
      .subscribe(
        (data: any) => {
          let filteredAnnouncements = data;

          // Apply date filter if range dates are selected
          const rangeDates = this.filterForm.get("rangeDates")?.value;
          if (
            rangeDates &&
            rangeDates.length === 2 &&
            rangeDates[0] &&
            rangeDates[1]
          ) {
            const startDate = new Date(rangeDates[0]);
            const endDate = new Date(rangeDates[1]);

            filteredAnnouncements = data.filter((announcement: any) => {
              const announcementDate = new Date(announcement.date);
              return (
                announcementDate >= startDate && announcementDate <= endDate
              );
            });
          }

          // Calculate pagination
          this.totalItems = filteredAnnouncements.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

          // Apply pagination
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          this.announcements = filteredAnnouncements.slice(
            startIndex,
            endIndex
          );
        },
        (error) => {
          console.error("Failed to load announcements", error);
          this.announcements = [];
        }
      );
  }

  clearDateFilter(): void {
    this.filterForm.get("rangeDates")?.setValue(null);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAnnouncements();
  }

  openAnnouncement(id: number): void {
    const announcement = this.announcements.find(
      (a) => a.announcement_id === id
    );
    if (announcement) {
      this.selectedAnnouncement = announcement;
      this.showFullAnnouncement = true;
    }
  }

  closeAnnouncement(): void {
    this.showFullAnnouncement = false;
    this.selectedAnnouncement = null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("ms-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  getImageUrl(path: string): string {
    if (!path) return "";
    return `${environment.basePublicUrl}/jkas_resourses/free/images/${path}`;
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  truncateText(text: string, maxLength: number = 150): string {
    const cleanText = this.stripHtmlTags(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + "...";
  }
}
