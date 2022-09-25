import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import * as ELG from "esri-leaflet-geocoder";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-mtkworkform",
  templateUrl: "./mtkworkform.component.html",
  styleUrls: ["./mtkworkform.component.css"],
})
export class MtkworkformComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  uploader1: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  uploader2: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });

  uploader3: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  tindakan1: any;
  tindakan2: any;
  tindakan3: any;
  tindakan4: any;
  tindakan5: any;
  ullasan_ketua_seksyen1: any;
  ullasan_ketua_seksyen2: any;
  ullasan_ketua_seksyen3: any;
  ullasan_ketua_seksyen4: any;
  ullasan_ketua_seksyen5: any;
  ullasan_penyelia1: any;
  ullasan_penyelia2: any;
  ullasan_penyelia3: any;
  ullasan_penyelia4: any;
  ullasan_penyelia5: any;
  susulan1: any;
  susulan2: any;
  susulan3: any;
  susulan4: any;
  susulan5: any;
  report1: any;
  report2: any;
  report3: any;
  report4: any;
  report5: any;
  report6: any;
  report7: any;
  description1: any;
  description2: any;
  description3: any;
  address1: any;
  address2: any;
  imgBase64: string;
  registrationGroup: any;
  pengadu_alamat: any;
  pengadu_nama: any;
  no_telefon: any;
  tarikh_terima_aduan: any;
  emel: any;
  no_faksimili: any;
  sumber_aduan: any;
  tarikh_aduan: any;
  tarikh_terima: any;
  lokasi_aduan: any;
  keterangan_aduan: any;
  tarikh_siasatan: any;
  masa_siasatan: any;
  nama_pegawal: any;
  id_mtb: any;
  lokasi_siasatan: any;
  laporan_siasatan: any;
  tindakan: any;
  susulan: any;
  ullasan_penyelia: any;
  baseUrl = environment.basePublicUrl;
  body: any;
  headers: any;
  no_rujukan: any;
  ullasan_ketua_seksyen: any;
  nama_pegawai: any;
  isTrue: boolean;
  penguda_alamat: any;
  is3rd: boolean;
  is4th: boolean;
  is5th: boolean;
  is6th: boolean;
  is2nd: boolean;
  is1st: boolean;
  is7th: boolean;
  showsuboption: boolean;
  mainform: boolean;
  markers: L.Layer[] = [];
  map: any;
  greenIcon = L.icon({
    iconUrl: "../../../assets/img/location1.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    shadowSize: [20, 30],
  });
  latitude: any;
  longitude: any;
  options: { layers: L.TileLayer[]; zoom: number; center: L.LatLng };
  display: string;
  submitted: boolean;
  lain_lain: any;
  zon: any;
  mainform2: boolean;
  mainform1: boolean;
  registrationGroup1: FormGroup;
  registrationGroup2: FormGroup;
  submitted1: boolean;
  submitted2: boolean;
  area: any;
  message: any;
  loct: any;
  lati: any;
  lngi: any;
  tindakanA: any;
  tindakan2A: any;
  tindakan1A: any;
  tindakan3A: any;
  tindakan5A: any;
  tindakan4A: any;
  ullasan_ketua_seksyen4A: any;
  ullasan_ketua_seksyen3A: any;
  ullasan_ketua_seksyen2A: any;
  ullasan_ketua_seksyen5A: any;
  ullasan_ketua_seksyen1A: any;
  ullasan_ketua_seksyenA: any;
  ullasan_penyelia2A: any;
  ullasan_penyelia4A: any;
  ullasan_penyeliaA: any;
  ullasan_penyelia5A: any;
  ullasan_penyelia3A: any;
  ullasan_penyelia1A: any;
  susulanA: any;
  susulan2A: any;
  susulan3A: any;
  data: any = [];
  dataShow: any = [];
  laporan_siasatanA: any;
  report1A: any;
  report3A: any;
  susulan4A: any;
  susulan1A: any;
  susulan5A: any;
  report2A: any;
  report4A: any;
  report5A: any;
  report7A: any;
  report6A: any;
  nama_pegawaiA: any;
  tarikh_siasatanA: any;
  zonA: any;
  ullasan_ketua_seksyenB: any;
  ullasan_ketua_seksyen1B: any;
  ullasan_ketua_seksyen2B: any;
  ullasan_ketua_seksyen3B: any;
  ullasan_penyelia1B: any;
  ullasan_penyelia5B: any;
  ullasan_penyelia4B: any;
  ullasan_penyelia3B: any;
  ullasan_penyelia2B: any;
  ullasan_penyeliaB: any;
  ullasan_ketua_seksyen5B: any;
  ullasan_ketua_seksyen4B: any;
  description3B: any;
  address2B: any;
  description1B: any;
  description2B: any;
  address1B: any;
  keterangan_aduanB: any;
  pengadu_alamatB: any;
  no_telefonB: any;
  lokasi_aduanB: any;
  tarikh_aduanB: any;
  tarikh_terimaB: any;
  lain_lainB: any;
  sumber_aduanB: any;
  no_faksimiliB: any;
  pengadu_namaB: any;
  tarikh_terima_aduanB: any;
  no_rujukanB: any;
  emelB: any;
  errorDisplay: string;
  messageValue: any;
  check: boolean;
  check1: boolean;
  lang: string;
  sucessMsg: string;
  errorMsg: any;
  errmsg: string;
  displaysuccess: string;
  errorDisplay1: string;
  parlimen: any;
  ulasanKetua_unit: any;
  ulasanpenyelia: any;
  parlimenA: any;
  ulasanKetua_unitf1: any;
  ulasan_timbalan: any;
  ulasan_timbalanA: any;
  url: any = environment.basePublicUrl;
  basePublicUrl: any = environment.basePublicUrl;
  ulasan_timbalanB: any;
  filename: string;
  filename1: string;
  UploaderData1: any = [];
  UploaderData2: any = [];
  UploaderData3: any = [];
  UploaderData4: any = [];
  firstFile1: string;
  myfiles1: string;
  myfiles: string;
  firstFile: string;
  ulasan11: any;
  firstFile2: string;
  firstFile3: string;
  myfiles2: string;
  myfiles3: string;
  filename2: string;
  filename3: string;
  isAdminType: string;
  dbkl_access_token: string;
  username: string;
  cause: any;
  causeA: any;
  nama_pegawai1: any;
  userrole: string;
  loginError: boolean;
  zonedata: any = [];
  parildata: any = [];
  searchControl: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.userrole = localStorage.getItem("roleforuser");
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.parlimenA = localStorage.getItem("parlimen");
    this.zonA = localStorage.getItem("zon");
    this.nama_pegawai1 = localStorage.getItem("user");
    // console.log( this.nama_pegawai1);
    this.nama_pegawai = localStorage.getItem("user");

    this.dbkl_access_token = localStorage.getItem("dbkl_access_token");
    let headers1 = {
      "Content-Type": "application/json",
      Authorization: this.dbkl_access_token,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/getBorangZon", {
        headers: headers1,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.zonedata = res;
          //console.log("ressdd",res);
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    this.http
      .get(this.basePublicUrl + "/dbkl/getBorangParlimen", {
        headers: headers1,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.parildata = res;
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    window.scroll(0, 0);
    this.uploader.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader.onAfterAddingFile = (file) => {
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.imgBase64 = e.target.result as string;
        console.log(this.imgBase64);
      };
      reader.readAsDataURL(file._file);
      this.filename = file._file.name;
    };
    this.uploader1.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader1.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader1.queue.length; i++) {
        let fileItem1 = this.uploader1.queue[i]._file;
        this.filename1 = fileItem1.name;
      }
    };
    this.uploader2.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader2.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader2.queue.length; i++) {
        let fileItem2 = this.uploader2.queue[i]._file;
        this.filename2 = fileItem2.name;
      }
    };
    this.uploader3.onWhenAddingFileFailed = (
      item: any,
      filter: any,
      options: any
    ) => {
      // console.log("***** onWhenAddingFileFailed ********");
      alert("File should be maximum of size 10mb.");
    };
    this.uploader3.onAfterAddingFile = (file) => {
      for (var i = 0; i < this.uploader3.queue.length; i++) {
        let fileItem3 = this.uploader3.queue[i]._file;
        this.filename3 = fileItem3.name;
      }
    };
    if (this.lang == "en") {
      this.message = "Drag the marker to your location";
    } else {
      this.message = "Sila bawa petanda ke lokasi anda";
    }

    this.lang = localStorage.getItem("lang");
    localStorage.setItem("path", "/dbkl/mtbwork-form");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    }
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.dbkl_access_token,
    };

    this.http
      .get(this.basePublicUrl + "/dbkl/listPegawai", {
        headers: headers,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.data = res;
          // console.log("yooo",res);

          for (let key of this.data) {
            this.dataShow.push(key);
          }
        },
        (error) => {
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
    this.spinner.hide();
  }
  logout() {
    this.spinner.show();
    let header = {
      accept: "application/json",
      Authorization: "Bearer " + this.dbkl_access_token,
    };

    let body = {};
    this.http
      .post(this.baseUrl + "/dbkl/logout", body, { headers: header })
      .subscribe(
        (res) => {
          this.router.navigateByUrl("/dbkl/adminregister");
          localStorage.clear();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          // this.openErrorModal();
        }
      );
  }
  setGeoLocation(position: { coords: { latitude: any; longitude: any } }) {
    const {
      coords: { latitude, longitude },
    } = position;
    // console.log(latitude, longitude);
    this.latitude = latitude;
    this.longitude = longitude;
    this.area = this.latitude + this.longitude;
    this.options = {
      layers: [
        L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: "",
        }),
      ],
      zoom: 13,
      center: L.latLng(latitude, longitude),
    };

    // L.marker([latitude, longitude], { icon: this.greenIcon }).bindPopup("latitute" + latitude, +"longitute" + longitude).addTo(this.map);
    this.mainform = false;
    this.mainform1 = false;
    this.mainform2 = false;

    this.registrationGroup = new FormGroup({
      nama: new FormControl("", [Validators.required]),
      alamat: new FormControl("", [Validators.required]),
      norukujan: new FormControl("", [Validators.required]),
      // parlimenA:new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"
        ),
      ]),
      notelefon: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{11}$"),
      ]),
      nofaksimili: new FormControl("", [Validators.required]),

      samberaduan: new FormControl("", [Validators.required]),
      lain_lain: new FormControl("", [Validators.required]),
      tarikhaduan: new FormControl("", [Validators.required]),
      tarikhterima: new FormControl("", [Validators.required]),
      lokasiaduan: new FormControl("", [Validators.required]),
      keteranganaduan: new FormControl("", [Validators.required]),

      zon: new FormControl("", [Validators.required]),
      parlimen: new FormControl("", [Validators.required]),
      tarikhsiasatan: new FormControl("", [Validators.required]),
      idpegawai: new FormControl("", [Validators.required]),

      laporansiasatan: new FormControl("", [Validators.required]),
      cause: new FormControl("", [Validators.required]),
      tindakan: new FormControl("", [Validators.required]),

      susulan: new FormControl("", [Validators.required]),
      ulasanKetua_unitf1: new FormControl("", [Validators.required]),
      ulasan: new FormControl("", [Validators.required]),
      ulasan1: new FormControl("", [Validators.required]),
    });
    this.registrationGroup1 = new FormGroup({
      zon1: new FormControl("", [Validators.required]),
      tarikhsiasatan1: new FormControl("", [Validators.required]),
      idpegawai1: new FormControl("", [Validators.required]),
      parlimenB: new FormControl("", [Validators.required]),
      laporansiasatan1: new FormControl("", [Validators.required]),

      tindakan1: new FormControl("", [Validators.required]),

      susulan1: new FormControl("", [Validators.required]),
      ulasanpenyelia: new FormControl("", [Validators.required]),
      ulasan1: new FormControl("", [Validators.required]),
      ulasan11: new FormControl("", [Validators.required]),

      //  ulasan_timbalan1:new FormControl("", [Validators.required]),
    });
    this.registrationGroup2 = new FormGroup({
      nama2: new FormControl("", [Validators.required]),
      alamat2: new FormControl("", [Validators.required]),
      norukujan2: new FormControl("", [Validators.required]),

      email2: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^[A-za-z]{3,}[A-za-z0-9.]{1,}@[A-Za-z]{3,}[.][A-Za-z.]{2,6}$"
        ),
      ]),
      notelefon2: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{11}$"),
      ]),
      nofaksimili2: new FormControl("", [Validators.required]),

      samberaduan2: new FormControl("", [Validators.required]),
      lain_lain2: new FormControl("", [Validators.required]),
      tarikhaduan2: new FormControl("", [Validators.required]),
      tarikhterima2: new FormControl("", [Validators.required]),
      lokasiaduan2: new FormControl("", [Validators.required]),
      cause1: new FormControl("", [Validators.required]),
      keteranganaduan2: new FormControl("", [Validators.required]),
      ulasan2: new FormControl("", [Validators.required]),
      ulasan12: new FormControl("", [Validators.required]),
      ulasanKetua_unit: new FormControl("", [Validators.required]),
    });
  }
  onMapReady(map: L.Map) {
    this.map = map;
    this.searchControl = ELG.geosearch({
      providers: [
        ELG.arcgisOnlineProvider({
          apikey: "AAPK84e96f4c08c449b3bbd50cd31f590027NJ-vkD2mOotBtzSVgNfBH267JjtCPI8IPiZczqaLARYyCKNx5cMqtr76efeyapde"
        }),
      ],
      position: 'topright',
      placeholder: 'Carian lokasi'
    });
    this.searchControl.addTo(this.map);
    this.settomap(this.latitude, this.longitude);
  }
  settomap(la, lo) {
    var marker = L.marker([la, lo], {
      draggable: true,
      icon: this.greenIcon,
    }).addTo(this.map);
    marker.on("dragend", function (e) {
      marker.openPopup();
    });

    marker.on("dragend", function (event) {
      var marker = event.target; // you could also simply access the marker through the closure
      var result = marker.getLatLng();
      this.message = "Ok";
      // but using the passed event is cleaner
      // console.log(result);
      this.lati = result.lat;
      this.lngi = result.lng;
      this.loct = this.lati + "," + this.lngi;
      // this.loct=result.toString(
      localStorage.setItem("area", this.loct);
    });
    this.searchControl.on("results", function(data) {
      console.log('move marker...');
      if (data.results.length > 0) {
        marker.setLatLng(data.results[0].latlng);
        this.lati = marker.getLatLng().lat;
        this.lngi = marker.getLatLng().lng;
        this.loct = this.lati + "," + this.lngi;
        localStorage.setItem("area", this.loct);
      }
    });

    this.map.setView([la, lo], 15);
    var popup = L.popup({
      offset: [0, -30],
    })
      .setLatLng([la, lo])
      .setContent(this.message)
      .openOn(this.map);
  }

  get f() {
    return this.registrationGroup.controls;
  }

  submit() {
    this.uploadSubmit1();
    this.submitted = true;

    if (this.registrationGroup.invalid) {
      // console.log("assfsa" + this.tarikh_terima_aduan);
      return;
    }

    let loc = localStorage.getItem("area");
    localStorage.removeItem("area");

    if (loc == null) {
      this.check = true;
      this.messageValue = "Required Field";
      return;
    }

    this.spinner.show();

    this.tindakan = this.tindakan1;
    this.ullasan_ketua_seksyen = this.ullasan_ketua_seksyen1;

    this.ullasan_penyelia = this.ullasan_penyelia1;

    this.susulan = this.susulan1;
    this.laporan_siasatan = this.report1;
    this.pengadu_alamat = this.address1;
    this.keterangan_aduan = this.description1;

    let body = {
      pengadu_nama: this.pengadu_nama,
      // tarikh_terima_aduan: this.tarikh_terima_aduan,
      pengadu_alamat: this.pengadu_alamat,
      no_rujukan: this.no_rujukan,
      no_telefon: this.no_telefon,
      emel: this.emel,
      no_faksimili: this.no_faksimili,

      sumber_aduan: this.sumber_aduan,
      lain_lain: this.lain_lain,
      tarikh_aduan: this.tarikh_aduan,
      tarikh_terima: this.tarikh_terima,
      lokasi_aduan: this.lokasi_aduan,
      keterangan_aduan: this.keterangan_aduan,
      ulasanKetua_unitf1: this.ulasanKetua_unitf1,
      zon: this.zon,
      parlimen: this.parlimen,
      tarikh_siasatan: this.tarikh_siasatan,
      nama_pegawai: this.nama_pegawai,
      lokasi_siasatan: loc,
      gambar: this.firstFile2,
      laporan_siasatan: this.laporan_siasatan,
      cause: this.cause,
      tindakan: this.tindakan,
      susulan: this.susulan,
      ullasan_penyelia: this.ullasan_penyelia,
      ullasan_ketua_seksyen: this.ullasan_ketua_seksyen,
      // ulasan_timbalan:this.ulasan_timbalan
    };
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    // console.log(body);
    this.http
      .post(this.baseUrl + "/dbkl/addComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log("response is", res);
          this.spinner.hide();
          if (res["message"] == "complaint_investigation_added") {
            if (this.lang == "en") {
              this.sucessMsg = "Inquiry Information successfully added!";
            } else {
              this.sucessMsg = "Maklumat Siasatan berjaya ditambah!";
            }
          }
          this.openSuccess();
        },
        (error) => {
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "complaint_investigation_not_added") {
            if (this.lang == "en") {
              this.errmsg =
                "Complaint Investigation could not be added! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Siasatan Aduan tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
          this.openError();
          // console.log("error is", error);
        }
      );
  }

  get f1() {
    return this.registrationGroup1.controls;
  }

  submit1() {
    this.uploadSubmit();
    this.submitted1 = true;
    console.log("my response");
    if (this.registrationGroup1.invalid) {
      console.log("2nd");
      return;
    }

    let loc = localStorage.getItem("area");
    localStorage.removeItem("area");

    if (loc == null) {
      this.check1 = true;
      this.messageValue = "Required Field";
      return;
    }
    this.spinner.show();
    this.tindakanA = this.tindakan1A;

    this.ullasan_ketua_seksyenA = this.ullasan_ketua_seksyen1A;

    this.ullasan_penyeliaA = this.ullasan_penyelia1A;
    this.susulanA = this.susulan1A;
    this.laporan_siasatanA = this.report1A;

    let body = {
      nama_pegawai: this.nama_pegawai1,
      zon: this.zonA,
      parlimenA: this.parlimenA,
      tarikh_siasatan: this.tarikh_siasatanA,
      // nama_pegawai: this.nama_pegawaiA,
      lokasi_siasatan: loc,
      laporan_siasatan: this.report1A,
      tindakan: this.tindakan1A,
      // susulan: this.susulan1A,
      ullasan_penyelia: this.ullasan_penyelia1A,
      ullasan_ketua_seksyen: this.ullasan_ketua_seksyen1A,
      ullasan_ketua_unit: this.ulasanpenyelia,
      //ulasan_timbalan:this.ulasan_timbalanA,
      sebelum_siasatan: this.firstFile,
      // selepas_siasatan: this.firstFile1
    };
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    // console.log(body);
    this.http
      .post(this.baseUrl + "/dbkl/add2ndComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log("response is", res);
          this.spinner.hide();
          if (res["message"] == "complaint_investigation_added") {
            if (this.lang == "en") {
              this.sucessMsg = "Complaint Investigation added successfully!";
            } else {
              this.sucessMsg = "Penyiasatan Aduan berjaya ditambahkan!";
            }
          }
          this.openSuccess();
          this.openSuccessModal();
        },
        (error) => {
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "complaint_investigation_not_added") {
            if (this.lang == "en") {
              this.errmsg =
                "Complaint Investigation could not be added! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Siasatan Aduan tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
          this.openError();
          // this.errorModel();
          // console.log("error is", error);
        }
      );
  }

  get f2() {
    return this.registrationGroup2.controls;
  }
  submit2() {
    this.uploadSubmit2();
    this.submitted2 = true;
    // console.log("my response");
    if (this.registrationGroup2.invalid) {
      // console.log("3rd");
      return;
    }

    this.ullasan_ketua_seksyenB = this.ullasan_ketua_seksyen1B;
    this.ullasan_penyeliaB = this.ullasan_penyelia1B;

    this.pengadu_alamatB = this.address1B;
    this.keterangan_aduanB = this.description1B;
    this.spinner.show();
    let body = {
      pengadu_nama: this.pengadu_namaB,
      // tarikh_terima_aduan: this.tarikh_terima_aduanB,
      pengadu_alamat: this.pengadu_alamatB,
      no_rujukan: this.no_rujukanB,
      no_telefon: this.no_telefonB,
      emel: this.emelB,
      no_faksimili: this.no_faksimiliB,
      gambar: this.firstFile3,
      sumber_aduan: this.sumber_aduanB,
      lain_lain: this.lain_lainB,
      tarikh_aduan: this.tarikh_aduanB,
      tarikh_terima: this.tarikh_terimaB,
      lokasi_aduan: this.lokasi_aduanB,
      cause: this.causeA,
      keterangan_aduan: this.keterangan_aduanB,
      ullasan_penyelia: this.ullasan_penyeliaB,
      ullasan_ketua_seksyen: this.ullasan_ketua_seksyenB,
      ulasanKetua_unit: this.ulasanKetua_unit,
    };
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: key,
    };

    // console.log(body);
    this.http
      .post(this.baseUrl + "/dbkl/add3rdComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res) => {
          // console.log("response is", res);
          this.spinner.hide();
          if (res["message"] == "complaint_investigation_added") {
            if (this.lang == "en") {
              this.sucessMsg = "Complaint Investigation added successfully!";
            } else {
              this.sucessMsg = "Penyiasatan Aduan berjaya ditambahkan!";
            }
          }
          this.openSuccess();
          // this.openSuccessModal();
        },
        (error) => {
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
          if (this.errorMsg == "complaint_investigation_not_added") {
            if (this.lang == "en") {
              this.errmsg =
                "Complaint Investigation could not be added! Please refer console logs for further details.";
            } else {
              this.errmsg =
                "Siasatan Aduan tidak dapat ditambahkan! Sila rujuk log konsol untuk keterangan lebih lanjut.";
            }
          }
          this.openError();
          // this.errorModel();
        }
      );
  }

  backtotop() {
    window.scroll(0, 0);
  }
  radioChanged(e) {
    this.mainform1 = true;
    this.mainform2 = false;
    this.mainform = false;
  }
  radioChanged2(e) {
    this.mainform2 = true;
    this.mainform = false;
    this.mainform1 = false;
  }
  optionchange(e) {
    // console.log(e.checked);
    this.showsuboption = true;
  }
  radioChanged1(e) {
    // console.log(e.checked);
    this.mainform = true;
    this.mainform2 = false;
    this.mainform1 = false;
  }

  openSuccessModal() {
    this.display = "block";
  }

  closeSuccessModal() {
    this.display = "none";
    window.location.reload();
  }
  errorModel() {
    this.errorDisplay = "block";
  }
  closeErrorModal() {
    this.errorDisplay = "none";
  }

  openSuccess() {
    this.displaysuccess = "block";
  }

  closeSuccess() {
    this.displaysuccess = "none";
    this.openSuccessModal();
  }

  openError() {
    this.errorDisplay1 = "block";
  }

  closeError() {
    this.errorDisplay1 = "none";
  }
  uploadSubmit() {
    // for (var i = 0; i < this.uploader.queue.length; i++) {
    //   let fileItem = this.uploader.queue[i]._file;
    //   if (fileItem.size > 10000000) {
    //     alert("Each File should be less than 10 MB of size.");
    //     return;
    //   }
    // }
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData1.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles = JSON.stringify(this.UploaderData1);

      this.firstFile = fileItem.name;
      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader.clearQueue();

    // for (var j = 0; j < this.uploader1.queue.length; j++) {
    //   let data1 = new FormData();
    //   let fileItem = this.uploader1.queue[j]._file;
    //   this.UploaderData2.push(fileItem.name);
    //   this.myfiles1 = JSON.stringify(this.UploaderData2);

    //   this.firstFile1 = fileItem.name;
    //   data1.append("file", fileItem);
    //   data1.append("fileSeq", "seq" + j);

    // }
    // this.uploader1.clearQueue();
  }

  uploadSubmit1() {
    for (var j = 0; j < this.uploader2.queue.length; j++) {
      let data2 = new FormData();
      let fileItem = this.uploader2.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData3.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles2 = JSON.stringify(this.UploaderData3);

      this.firstFile2 = fileItem.name;
      // console.log(this.firstFile2);

      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data2.append("file", fileItem);
      data2.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader2.clearQueue();
  }
  uploadSubmit2() {
    for (var j = 0; j < this.uploader3.queue.length; j++) {
      let data3 = new FormData();
      let fileItem = this.uploader3.queue[j]._file;
      // console.log(fileItem.name);
      this.UploaderData4.push(fileItem.name);
      // console.log("my files array"
      //   + this.UploaderData1);
      this.myfiles3 = JSON.stringify(this.UploaderData4);

      this.firstFile3 = fileItem.name;
      //console.log(this.firstFile3);
      // console.log(
      //   "my string length........." +
      //     this.myfiles.substring(1, this.myfiles.length - 1)
      // );
      // window.alert(this.firstFile)
      data3.append("file", fileItem);
      data3.append("fileSeq", "seq" + j);

      // this.uploadFile(data).subscribe(data => alert(data.message));
    }
    this.uploader3.clearQueue();
  }
  uploadFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.basePublicUrl, data);
  }
}
