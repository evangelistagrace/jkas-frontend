import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Announcement } from "../models/announcement.model";

@Injectable({
  providedIn: "root",
})
export class AnnouncementsService {
  private announcements: Announcement[] = [
    {
      id: 1,
      title: "PEMBUKAAN PERMOHONAN TAPAK BAZAR TAHUN BARU CINA TAHUN 2025",
      date: "2024-12-09",
      summary:
        "Permohonan untuk tapak bazar sempena perayaan Tahun Baru Cina 2025 kini dibuka.",
      content:
        "Majlis Bandaraya dengan sukacitanya mengumumkan pembukaan permohonan tapak bazar sempena perayaan Tahun Baru Cina 2025. Permohonan boleh dibuat secara dalam talian melalui portal rasmi Majlis bermula 9 Disember 2024 sehingga 15 Januari 2025. Pemohon perlu memastikan semua dokumen yang diperlukan dilampirkan bersama borang permohonan. Kelulusan akan diberikan berdasarkan kriteria yang telah ditetapkan dan jumlah tapak yang terhad. Majlis berhak untuk menolak mana-mana permohonan tanpa memberi sebarang alasan.",
      department: "Jabatan Pelesenan",
      tags: ["Bazar", "Tahun Baru Cina", "Permohonan"],
    },
    {
      id: 2,
      title: "MANUAL PERMOHONAN TAKLIMAT PENGENDALI BAZAR RAMADHAN MBDK 2025",
      date: "2024-12-10",
      summary:
        "Manual untuk permohonan taklimat bagi pengendali Bazar Ramadhan 2025 kini tersedia.",
      content:
        "Pihak Majlis telah menyediakan manual permohonan untuk taklimat bagi pengendali Bazar Ramadhan MBDK 2025. Manual ini mengandungi panduan lengkap mengenai proses permohonan, syarat-syarat kelayakan, dokumen yang diperlukan, serta jadual taklimat yang akan diadakan. Semua bakal pengendali bazar diwajibkan untuk menghadiri taklimat ini sebagai salah satu syarat kelulusan permohonan. Manual ini boleh dimuat turun dari portal rasmi Majlis atau diperoleh di kaunter Jabatan Pelesenan pada waktu pejabat. Untuk maklumat lanjut, sila hubungi Jabatan Pelesenan di talian 03-xxxxxxxx.",
      department: "Jabatan Pelesenan",
      tags: ["Bazar Ramadhan", "Taklimat", "Manual"],
    },
    {
      id: 3,
      title:
        "TAWARAN PENYEWAAN RUANG NIAGA MAJLIS BANDARAYA DIRAJA KLANG (BULAN DISEMBER 2024)",
      date: "2024-12-13",
      summary:
        "Tawaran penyewaan ruang niaga di kompleks Majlis Bandaraya Diraja Klang untuk bulan Disember 2024.",
      content:
        "Majlis Bandaraya Diraja Klang mempelawa usahawan tempatan untuk menyewa ruang niaga di kompleks beli-belah milik Majlis. Terdapat 15 unit ruang niaga dengan pelbagai saiz yang ditawarkan dengan kadar sewa berpatutan. Lokasi strategik di pusat bandar memberikan peluang perniagaan yang baik kepada peniaga. Tempoh sewaan minimum adalah 6 bulan dengan deposit dua bulan. Permohonan boleh dibuat di Jabatan Harta Majlis bermula 13 Disember 2024 hingga 31 Disember 2024. Pemilihan penyewa akan dibuat berdasarkan jenis perniagaan yang dicadangkan dan rekod kredit pemohon.",
      department: "Jabatan Harta",
      tags: ["Ruang Niaga", "Penyewaan", "Usahawan"],
    },
    {
      id: 4,
      title: "IKLAN TANAH KOSONG UNTUK DISEWAKAN (BULAN DISEMBER 2024)",
      date: "2024-12-13",
      summary:
        "Iklan penyewaan tanah kosong milik kerajaan negeri untuk bulan Disember 2024.",
      content:
        "Pihak Majlis mengiklankan beberapa lot tanah kosong di kawasan pentadbiran Majlis untuk disewa bagi tujuan perniagaan atau pertanian jangka pendek. Tanah-tanah ini ditawarkan dengan perjanjian sewaan tidak melebihi 3 tahun. Penyewa bertanggungjawab untuk mematuhi semua syarat penggunaan tanah yang ditetapkan oleh Majlis dan undang-undang berkaitan. Permohonan boleh dibuat di Jabatan Harta Majlis atau secara dalam talian melalui portal rasmi Majlis. Tarikh tutup permohonan adalah pada 31 Disember 2024. Untuk maklumat lanjut mengenai lokasi dan keluasan tanah yang ditawarkan, sila lawati portal rasmi Majlis.",
      department: "Jabatan Harta",
      tags: ["Tanah Kosong", "Penyewaan", "Perniagaan"],
    },
    {
      id: 5,
      title: "PENUTUPAN SEMENTARA PEJABAT CAWANGAN UTARA PADA 20 DISEMBER 2024",
      date: "2024-12-05",
      summary:
        "Pejabat cawangan utara akan ditutup sementara pada 20 Disember 2024 untuk kerja-kerja penyelenggaraan.",
      content:
        "Diberitahu bahawa pejabat cawangan utara Majlis akan ditutup sementara pada 20 Disember 2024 (Jumaat) untuk kerja-kerja penyelenggaraan sistem elektrik. Semua urusan di cawangan tersebut akan ditangguhkan ke hari berikutnya. Orang ramai dinasihatkan untuk berurusan di ibu pejabat atau cawangan lain pada tarikh tersebut. Pihak Majlis memohon maaf atas sebarang kesulitan yang timbul. Perkhidmatan dalam talian masih boleh diakses seperti biasa melalui portal rasmi Majlis. Pejabat akan dibuka semula pada 21 Disember 2024 (Sabtu) mengikut waktu operasi biasa.",
      department: "Pengurusan Fasiliti",
      tags: ["Penutupan", "Penyelenggaraan", "Pejabat Cawangan"],
    },
    {
      id: 6,
      title: "PROGRAM KESEDARAN ALAM SEKITAR SEMPENA HARI BUMI 2025",
      date: "2024-12-01",
      summary:
        "Program kesedaran alam sekitar anjuran kerajaan negeri sempena Hari Bumi 2025.",
      content:
        "Jabatan Alam Sekitar Negeri akan menganjurkan Program Kesedaran Alam Sekitar sempena sambutan Hari Bumi 2025 pada 22 April 2025. Program ini akan diadakan di Taman Awam Pusat dengan pelbagai aktiviti menarik seperti pameran, bengkel kitar semula, pertandingan melukis untuk kanak-kanak, dan ceramah kesedaran alam sekitar. Penduduk negeri dijemput untuk menyertai program ini secara percuma. Pendaftaran untuk bengkel dan pertandingan akan dibuka pada 1 Januari 2025. Program ini bertujuan untuk meningkatkan kesedaran masyarakat tentang kepentingan pemeliharaan alam sekitar dan amalan lestari dalam kehidupan seharian.",
      department: "Jabatan Alam Sekitar",
      tags: ["Alam Sekitar", "Hari Bumi", "Program Kesedaran"],
    },
    {
      id: 7,
      title: "KURSUS KEMAHIRAN DIGITAL UNTUK USAHAWAN DESA",
      date: "2024-11-28",
      summary:
        "Kursus kemahiran digital untuk meningkatkan keupayaan usahawan desa dalam pemasaran dalam talian.",
      content:
        "Jabatan Pembangunan Usahawan akan menganjurkan siri Kursus Kemahiran Digital untuk Usahawan Desa mulai Januari hingga Mac 2025. Kursus ini bertujuan untuk meningkatkan keupayaan usahawan desa dalam menggunakan platform digital untuk pemasaran produk dan perkhidmatan mereka. Modul kursus meliputi asas komputer, penggunaan media sosial untuk perniagaan, pembinaan kedai dalam talian, dan pemasaran digital. Kursus ini terbuka kepada semua usahawan desa yang berdaftar dengan agensi kerajaan berkaitan. Yuran penyertaan adalah percuma dan tempat adalah terhad kepada 30 peserta bagi setiap sesi. Pendaftaran boleh dibuat secara dalam talian atau di pejabat Jabatan Pembangunan Usahawan.",
      department: "Jabatan Pembangunan Usahawan",
      tags: ["Kemahiran Digital", "Usahawan Desa", "Kursus"],
    },
    {
      id: 8,
      title: "PENGUMUMAN KEPUTUSAN PERMOHONAN BIASISWA NEGERI SESI 2025",
      date: "2024-11-25",
      summary:
        "Keputusan permohonan Biasiswa Negeri untuk sesi pengajian 2025 telah diumumkan.",
      content:
        "Jabatan Pendidikan Negeri dengan sukacitanya mengumumkan bahawa keputusan permohonan Biasiswa Negeri untuk sesi pengajian 2025 telah diumumkan. Semua pemohon boleh menyemak keputusan mereka melalui portal rasmi Jabatan Pendidikan Negeri mulai 25 November 2024. Pemohon yang berjaya diminta untuk mengesahkan penerimaan biasiswa dalam tempoh 14 hari dari tarikh pengumuman. Taklimat untuk penerima biasiswa akan diadakan pada 15 Disember 2024 di Dewan Serbaguna Kompleks Pentadbiran Negeri. Kehadiran adalah wajib bagi semua penerima biasiswa. Sebarang pertanyaan boleh diajukan kepada Sekretariat Biasiswa Negeri di talian 03-xxxxxxxx.",
      department: "Jabatan Pendidikan",
      tags: ["Biasiswa", "Pendidikan", "Pengumuman"],
    },
    {
      id: 9,
      title: "NOTIS PENUTUPAN JALAN SEMPENA SAMBUTAN TAHUN BARU 2025",
      date: "2024-11-20",
      summary:
        "Notis penutupan jalan di sekitar pusat bandar sempena sambutan Tahun Baru 2025.",
      content:
        "Jabatan Pengangkutan Negeri ingin memaklumkan bahawa beberapa jalan utama di sekitar pusat bandar akan ditutup sempena sambutan Tahun Baru 2025. Penutupan jalan akan bermula dari jam 6 petang 31 Disember 2024 hingga 6 pagi 1 Januari 2025. Jalan-jalan yang terlibat termasuk Jalan Sultan, Jalan Tun Perak, Jalan Raja, dan Jalan Tuanku Abdul Rahman. Pengguna jalan raya dinasihatkan untuk menggunakan laluan alternatif yang telah disediakan. Perkhidmatan pengangkutan awam akan dipertingkatkan pada malam tersebut untuk kemudahan orang ramai. Sebarang pertanyaan boleh diajukan kepada Pusat Kawalan Trafik di talian 03-xxxxxxxx.",
      department: "Jabatan Pengangkutan",
      tags: ["Penutupan Jalan", "Tahun Baru", "Notis Awam"],
    },
    {
      id: 10,
      title: "PELANCARAN APLIKASI MUDAH ALIH KERAJAAN NEGERI VERSI 2.0",
      date: "2024-11-15",
      summary:
        "Pelancaran aplikasi mudah alih rasmi kerajaan negeri versi 2.0 dengan pelbagai ciri baharu.",
      content:
        "Jabatan Teknologi Maklumat Negeri telah melancarkan aplikasi mudah alih rasmi kerajaan negeri versi 2.0 dengan pelbagai ciri baharu dan penambahbaikan. Aplikasi ini kini menawarkan lebih banyak perkhidmatan dalam talian termasuk pembayaran cukai, aduan awam, tempahan kemudahan awam, dan akses kepada maklumat terkini kerajaan negeri. Pengguna boleh memuat turun aplikasi ini dari App Store atau Google Play Store. Bagi pengguna sedia ada, kemaskini automatik akan tersedia. Aplikasi ini direka untuk meningkatkan kecekapan penyampaian perkhidmatan kerajaan dan memudahkan urusan rakyat dengan agensi kerajaan. Sebarang maklum balas mengenai aplikasi ini boleh dihantar melalui borang maklum balas dalam aplikasi tersebut.",
      department: "Jabatan Teknologi Maklumat",
      tags: ["Aplikasi Mudah Alih", "Teknologi", "Perkhidmatan Dalam Talian"],
    },
    {
      id: 11,
      title: "JADUAL PEMBAYARAN BANTUAN SARA HIDUP JANUARI 2025",
      date: "2024-11-10",
      summary:
        "Jadual pembayaran Bantuan Sara Hidup (BSH) untuk bulan Januari 2025.",
      content:
        "Jabatan Kebajikan Masyarakat Negeri ingin memaklumkan jadual pembayaran Bantuan Sara Hidup (BSH) untuk bulan Januari 2025. Pembayaran akan dibuat secara berperingkat bermula 2 Januari hingga 10 Januari 2025 mengikut kategori penerima. Penerima Kategori A akan menerima bantuan pada 2-4 Januari, Kategori B pada 5-7 Januari, dan Kategori C pada 8-10 Januari. Penerima diminta untuk menyemak status pembayaran melalui portal rasmi Jabatan Kebajikan Masyarakat Negeri atau menghubungi talian bantuan di 03-xxxxxxxx. Penerima juga diingatkan untuk memastikan maklumat akaun bank mereka adalah tepat dan terkini untuk mengelakkan sebarang kelewatan dalam penerimaan bantuan.",
      department: "Jabatan Kebajikan Masyarakat",
      tags: ["Bantuan Sara Hidup", "Kebajikan", "Jadual Pembayaran"],
    },
    {
      id: 12,
      title: "PEMERIKSAAN KESIHATAN PERCUMA SEMPENA HARI KESIHATAN NEGERI",
      date: "2024-11-05",
      summary:
        "Program pemeriksaan kesihatan percuma sempena sambutan Hari Kesihatan Negeri 2025.",
      content:
        "Jabatan Kesihatan Negeri akan menganjurkan program pemeriksaan kesihatan percuma sempena sambutan Hari Kesihatan Negeri 2025. Program ini akan diadakan pada 25 Januari 2025 dari jam 8 pagi hingga 5 petang di semua klinik kesihatan kerajaan di seluruh negeri. Perkhidmatan yang ditawarkan termasuk pemeriksaan tekanan darah, ujian glukosa, pemeriksaan kolesterol, pemeriksaan mata, dan nasihat pemakanan. Orang ramai digalakkan untuk memanfaatkan peluang ini untuk menjalani pemeriksaan kesihatan. Tiada temu janji diperlukan, tetapi keutamaan akan diberikan kepada warga emas dan golongan B40. Sebarang pertanyaan boleh diajukan kepada Bahagian Promosi Kesihatan di talian 03-xxxxxxxx.",
      department: "Jabatan Kesihatan",
      tags: ["Kesihatan", "Pemeriksaan Percuma", "Hari Kesihatan"],
    },
  ];

  constructor() {}

  getAnnouncements(
    page: number = 1,
    itemsPerPage: number = 5,
    startDate?: Date | null,
    endDate?: Date | null
  ): Observable<{
    announcements: Announcement[];
    totalItems: number;
    totalPages: number;
  }> {
    // First, filter announcements based on date range
    let filteredAnnouncements = [...this.announcements];

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0); // Start of day
      filteredAnnouncements = filteredAnnouncements.filter(
        (item) => new Date(item.date) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of day
      filteredAnnouncements = filteredAnnouncements.filter(
        (item) => new Date(item.date) <= end
      );
    }

    // sort announcements by date in descending order
    filteredAnnouncements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Then paginate the filtered results
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredAnnouncements.slice(startIndex, endIndex);

    return of({
      announcements: paginatedItems,
      totalItems: filteredAnnouncements.length,
      totalPages: Math.ceil(filteredAnnouncements.length / itemsPerPage),
    });
  }

  getAnnouncementById(id: number): Observable<Announcement | undefined> {
    const announcement = this.announcements.find((a) => a.id === id);
    return of(announcement);
  }
}
