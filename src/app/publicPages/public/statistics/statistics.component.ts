import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface StatisticItem {
  icon: string;
  count: number;
  label: string;
  duration: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @Input() presentationMode: 'carousel' | 'tiles' = 'carousel';
  @Input() slidesPerView: number = 3;
  @Input() spaceeBetween: number = 30;
  @Input() useApi: boolean = false;

  statistics: StatisticItem[] = [
    {
      icon: 'bi bi-pin-map',
      count: 232,
      label: 'Jumlah Kawasan Perkhidmatan',
      duration: 1
    },
    {
      icon: 'bi bi-house',
      count: 521,
      label: 'Jumlah Premis',
      duration: 1
    },
    {
      icon: 'bi bi-tree',
      count: 1453,
      label: 'Bilangan Servis Pembersihan Awam',
      duration: 1
    },
    {
      icon: 'bi bi-truck',
      count: 2169,
      label: 'Jumlah Kutipan Sampah',
      duration: 1
    },
    {
      icon: 'bi bi-map',
      count: 621,
      label: 'Keluasan Kawasan Kuala Lumpur (M2)',
      duration: 1
    },
    {
      icon: 'bi bi-recycle',
      count: 273,
      label: 'Jumlah Kutipan Isi Rumah/Komersial',
      duration: 1
    },
    {
      icon: 'bi bi-trash',
      count: 1113,
      label: 'Jumlah Pusat Tong',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Keluasan TPKK Dan Jumlah TPKK',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Keluasan Kawasan Berumput (m2)',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Panjang Longkang (m)',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Panjang Jalan (m)',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Tandas Awam',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Hentian Teksi/Bas',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Jejantas',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Siar Kaki Berbumbung',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Keluasan Tempat Awam (m2)',
      duration: 1
    },
    {
      icon: 'bi bi-geo-alt',
      count: 27,
      label: 'Jumlah Lokasi Pasar Malam',
      duration: 1
    }
  ];

  private basePublicUrl = environment.basePublicUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.useApi) {
      this.loadStatisticsFromApi();
    }
  }

  ngAfterViewInit(): void {
    if (this.presentationMode === 'carousel') {
      this.initSwiper();
    }
    this.initPureCounter();
  }

  private loadStatisticsFromApi(): void {
    const headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };

    // You can implement multiple API calls here based on your needs
    // Example implementation:
    this.http.get(`${this.basePublicUrl}/dbkl/getStatistics`, { headers })
      .subscribe((res: any) => {
        if (res && Array.isArray(res)) {
          this.statistics = res;
        }
      });
  }

  private initSwiper(): void {
    const swiperEls = document.querySelectorAll('swiper-container.statistics-swiper');
    
    setTimeout(() => {
      swiperEls.forEach(swiperEl => {
        // @ts-ignore - Using Swiper element API
        swiperEl.initialize();
      });
    }, 100);
  }

  private initPureCounter(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined' && typeof (window as any).PureCounter === 'function') {
        new (window as any).PureCounter();
      }
    }, 200);
  }
}
