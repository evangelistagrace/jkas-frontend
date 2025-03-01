export interface Announcement {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  department?: string;
  tags?: string[];
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}
