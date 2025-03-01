import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from '../services/announcement.service';
import { Announcement, DateRange } from '../models/announcement.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;
  totalPages = 0;
  selectedAnnouncement: Announcement | null = null;
  showFullAnnouncement = false;
  
  // Date range filter
  filterForm: FormGroup;
  dateRange: DateRange = { startDate: null, endDate: null };
  rangeDates: Date[] = [];
  
  constructor(
    private announcementsService: AnnouncementsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      rangeDates: [null]
    });
  }

  ngOnInit(): void {
    this.loadAnnouncements();
    
    // Subscribe to form changes
    this.filterForm.get('rangeDates')?.valueChanges.subscribe(dates => {
      if (dates && dates.length === 2) {
        this.dateRange.startDate = dates[0];
        this.dateRange.endDate = dates[1];
      } else {
        this.dateRange.startDate = null;
        this.dateRange.endDate = null;
      }
      this.currentPage = 1; // Reset to first page when filters change
      this.loadAnnouncements();
    });
  }

  loadAnnouncements(): void {
    this.announcementsService.getAnnouncements(
      this.currentPage, 
      this.itemsPerPage, 
      this.dateRange.startDate, 
      this.dateRange.endDate
    ).subscribe(response => {
      this.announcements = response.announcements;
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
    });
  }
  
  clearDateFilter(): void {
    this.filterForm.get('rangeDates')?.setValue(null);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAnnouncements();
  }

  openAnnouncement(id: number): void {
    this.announcementsService.getAnnouncementById(id)
      .subscribe(announcement => {
        if (announcement) {
          this.selectedAnnouncement = announcement;
          this.showFullAnnouncement = true;
        }
      });
  }

  closeAnnouncement(): void {
    this.showFullAnnouncement = false;
    this.selectedAnnouncement = null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}