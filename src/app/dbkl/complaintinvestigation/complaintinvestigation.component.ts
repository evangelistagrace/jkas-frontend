import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { saveAs } from 'file-saver';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import * as ELG from "esri-leaflet-geocoder";
@Component({
  selector: "app-complaintinvestigation",
  templateUrl: "./complaintinvestigation.component.html",
  styleUrls: ["./complaintinvestigation.component.css"],
})
export class ComplaintinvestigationComponent implements OnInit {
  SERVER_URL = environment.basePublicUrl + "/public/uploadFile";
  uploader: FileUploader = new FileUploader({
    isHTML5: true,
    url: this.SERVER_URL,
    maxFileSize: 1024 * 1024 * 10,
  });
  filename: string;
  imgBase64: string;
  date: string;
  id: string;
  parliamen: string;
  information_name: any;
  masa: string;
  basePublicUrl = environment.basePublicUrl;
  data: any;
  loginError: boolean;
  errorMsg: any;
  tarikh_terima_aduan: any;
  pengadu_alamat: any;
  no_rujukan: any;
  emel: any;
  no_telefon: any;
  no_faksimili: any;
  sumber_aduan: any;
  tarikh_aduan: any;
  tarikh_terima: any;
  lokasi_aduan: any;
  keterangan_aduan: any;
  tarikh_siasatan: any;
  nama_pegawai: any;
  id_mtb: any;
  masa_siasatan: any;
  laporan_siasatan: any;
  susulan: any;
  ullasan_penyelia: any;
  tindakan: any;
  ullasan_ketua_seksyen: any;
  lokasi_siasatan: any;
  zon: any;
  lain_lain: any;
  ulasanKetua_unitf1: any;
  userrole: string;
  username: string;
  isAdminType: string;
  parlimenA: any;
  sebelum_siasatan: any;
  ullasan_ketua_unit: any;
  tarikh_siasatanA: any;
  report1A: any;
  tindakan1A: any;
  ullasan_penyelia1A: any;
  ullasan_ketua_seksyen1A: any;
  ulasanpenyelia: any;
  formGroup: FormGroup;
  inquiryForm: FormGroup;
  lang: any = 'ms';

  inquiry: any = {};
  inquiryId: string;
  kerjaHarianPictures: any = ['','',''];
  options: { layers: L.TileLayer[]; zoom: number; center: L.LatLng };
  greenIcon = L.icon({
    iconUrl: "../../../assets/img/location1.png",
    shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png",
    iconSize: [50, 50],
    shadowSize: [20, 30],
  });
  kerjaHarianLocation: string  = '0,0';
  jenisKawasan: string = 'serviceArea';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  onMapReady(map: L.Map) {
    console.log('map is ready.');
    var searchControl = ELG.geosearch({
      providers: [
        ELG.arcgisOnlineProvider({
          apikey: "AAPK84e96f4c08c449b3bbd50cd31f590027NJ-vkD2mOotBtzSVgNfBH267JjtCPI8IPiZczqaLARYyCKNx5cMqtr76efeyapde"
        }),
      ],
      position: 'topright',
      placeholder: 'Carian lokasi'
    });
    searchControl.addTo(map);

    var marker = L.marker([0, 0], {
      draggable: true,
      icon: this.greenIcon,
    }).addTo(map);
    marker.on("dragend", function (event) {
      var marker = event.target;
      var result = marker.getLatLng();
      this.kerjaHarianLocation = result.lat + "," + result.lng;
    });
    searchControl.on("results", function(data) {
      if (data.results.length > 0) {
        marker.setLatLng(data.results[0].latlng);
        this.kerjaHarianLocation = marker.getLatLng().lat + ',' + marker.getLatLng().lng;
      }
    });

    var latitude = this.kerjaHarianLocation.split(',')[0];
    var longitude = this.kerjaHarianLocation.split(',')[1];
    console.log('move to ', +latitude, ',', + longitude);
    map.setView([+latitude, +longitude], 15);
  }

  doUpload(index) {
    this.spinner.show();
    for (var i=0; i<this.uploader.queue.length; i++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[i]._file;
      data.append("file", fileItem);
      data.append("fileSeq", "seq" + i);
      this.http.post<any>(this.SERVER_URL, data).subscribe((response) => {
        this.kerjaHarianPictures[index] = response.filename;
        this.spinner.hide();
      });
    }
    this.uploader.clearQueue();
    this.spinner.hide();
  }

  setGeoLocation(position: { coords: { latitude: any; longitude: any } }) {
    const {
      coords: { latitude, longitude },
    } = position;
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
  }

  ngOnInit() {
    if (navigator.geolocation) {
      console.log('Setting geolocation.');
      navigator.geolocation.getCurrentPosition(this.setGeoLocation.bind(this));
    } else {
      console.log('Geolocation not set.');
    }
    this.isAdminType = localStorage.getItem("isAdmin");
    this.username = localStorage.getItem("nama_pengguna");
    this.userrole = localStorage.getItem("roleforuser");
    this.lang = localStorage.getItem('lang');
    console.log('role: ', this.userrole);
    window.scroll(0, 0);
    localStorage.setItem("path", "/dbkl/complaintinvestigation");
    this.spinner.show();
    this.date = this.route.snapshot.queryParamMap.get("value3");
    this.id = this.route.snapshot.queryParamMap.get("value1");
    this.masa = this.route.snapshot.queryParamMap.get("value2");
    this.parliamen = this.route.snapshot.queryParamMap.get("value5");
    this.inquiryId = this.route.snapshot.queryParamMap.get('inquiryId');
    // console.log(this.date + " " + this.id + " " + this.masa);

    this.formGroup = new FormGroup({
      formId: new FormControl(""),
      zon: new FormControl(""),
      tarikhSiasatan: new FormControl(""),
      namaPegawai: new FormControl(""),
      parlimen: new FormControl(""),
      laporanSiasatan: new FormControl(""),
      tindakan: new FormControl(""),
      ulasanPenyelia: new FormControl("", [Validators.required]),
      ulasanKetuaSeksyen: new FormControl(""),
      ulasanKetuaUnit: new FormControl(""),
      inquiryId: new FormControl(""),
      tarikh: new FormControl(""),
      namaPengadu: new FormControl(""),
      alamatPengadu: new FormControl(""),
      noTelefon: new FormControl(""),
      noFax: new FormControl(""),
      emel: new FormControl(""),
      sumberAduan: new FormControl(""),
      lainLain: new FormControl(""),
      tarikhTerima: new FormControl(""),
      noRujukan: new FormControl(""),
      tarikhAduan: new FormControl(""),
      tarikhAduanTerima: new FormControl(""),
      lokasiAduan: new FormControl(""),
      keterangan: new FormControl(""),
      masaSiasatan: new FormControl(""),
      idPegawai: new FormControl(""),
      lokasiSiasatan: new FormControl(""),
      susulan: new FormControl(""),
      jenisKawasan: new FormControl("")
    });

    this.inquiryForm = new FormGroup({
      inquiryId: new FormControl(""),
      parlimen: new FormControl(""),
      tarikh: new FormControl(""),
      namaPengadu: new FormControl(""),
      alamatPengadu: new FormControl(""),
      noTelefon: new FormControl(""),
      noFax: new FormControl(""),
      emel: new FormControl(""),
      sumberAduan: new FormControl(""),
      lainLain: new FormControl(""),
      tarikhTerima: new FormControl(""),
      noRujukan: new FormControl(""),
      tarikhAduan: new FormControl(""),
      lokasiAduan: new FormControl(""),
      keterangan: new FormControl(""),
      zon: new FormControl(""),
      tarikhSiasatan: new FormControl(""),
      masaSiasatan: new FormControl(""),
      idPegawai: new FormControl(""),
      lokasiSiasatan: new FormControl(""),
      laporanSiasatan: new FormControl(""),
      tindakan: new FormControl(""),
      susulan: new FormControl(""),
      ulasanPenyelia: new FormControl(""),
      ulasanKetuaSeksyen: new FormControl(""),
      ulasanKetuaUnit: new FormControl(""),
      jenisKawasan: new FormControl("")
    });

    let key = localStorage.getItem("AccessToken");
    this.spinner.show();
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };

    let body = {
      id_mtb: this.id,
      masa_siasatan: this.masa,
      tarikh_siasatan: this.date,
      inquiry_id: this.inquiryId
    };
    // console.log(body);

    this.http
      .post(this.basePublicUrl + "/dbkl/getComplaintInvestigation", body, {
        headers: headers,
      })
      .subscribe(
        (res : any) => {
          this.inquiry = res[0];
          this.jenisKawasan = this.inquiry.jenis_kawasan;
           //console.log(res);
          this.spinner.hide();
          let aduan = res[0];
          if (aduan.picture1) {
            this.kerjaHarianPictures[0] = aduan.picture1;
          }
          if (aduan.picture2) {
            this.kerjaHarianPictures[1] = aduan.picture2;
          }
          if (aduan.picture3) {
            this.kerjaHarianPictures[2] = aduan.picture3;
          }
          this.formGroup.controls['namaPengadu'].setValue(aduan.pengadu_nama);
          this.formGroup.controls['namaPengadu'].disable();
          this.formGroup.controls['alamatPengadu'].setValue(aduan.pengadu_alamat);
          this.formGroup.controls['alamatPengadu'].disable();
          this.formGroup.controls['noRujukan'].setValue(aduan.no_rujukan);
          this.formGroup.controls['emel'].setValue(aduan.emel);
          this.formGroup.controls['noTelefon'].setValue(aduan.no_telefon);
          this.formGroup.controls['noFax'].setValue(aduan.no_faksimili);
          this.formGroup.controls['sumberAduan'].setValue(aduan.sumber_aduan);
          this.formGroup.controls['sumberAduan'].disable();
          this.formGroup.controls['tarikhAduan'].setValue(aduan.tarikh_aduan);
          this.formGroup.controls['tarikhAduanTerima'].setValue(aduan.tarikh_terima);
          this.formGroup.controls['lokasiAduan'].setValue(aduan.lokasi_aduan);
          this.formGroup.controls['keterangan'].setValue(aduan.keterangan_aduan);
          this.formGroup.controls['formId'].setValue(aduan.inquiry_id);
          this.formGroup.controls['zon'].setValue(aduan.zon);
          this.formGroup.controls['zon'].disable();
          this.formGroup.controls['tarikhSiasatan'].setValue(aduan.tarikh_siasatan);
          this.formGroup.controls['tarikhSiasatan'].disable();
          this.formGroup.controls['namaPegawai'].setValue(aduan.nama_pegawai);
          this.formGroup.controls['namaPegawai'].disable();
          this.formGroup.controls['parlimen'].setValue(aduan.parlimen);
          this.formGroup.controls['parlimen'].disable();
          this.formGroup.controls['laporanSiasatan'].setValue(aduan.laporan_siasatan);
          this.formGroup.controls['laporanSiasatan'].enable();
          this.formGroup.controls['tindakan'].setValue(aduan.tindakan);
          this.formGroup.controls['tindakan'].enable();
          this.formGroup.controls['ulasanPenyelia'].setValue(aduan.ullasan_penyelia);
          this.formGroup.controls['ulasanPenyelia'].disable();
          this.formGroup.controls['ulasanKetuaSeksyen'].setValue(aduan.ullasan_ketua_seksyen);
          this.formGroup.controls['ulasanKetuaSeksyen'].disable();
          this.formGroup.controls['ulasanKetuaUnit'].setValue(aduan.ullasan_ketua_unit);
          this.formGroup.controls['ulasanKetuaUnit'].disable();
          this.kerjaHarianLocation = aduan.lokasi_siasatan;
          if (this.userrole === 'Superadmin') {
            this.formGroup.controls['ulasanPenyelia'].enable();
            this.formGroup.controls['ulasanKetuaSeksyen'].enable();
            this.formGroup.controls['ulasanKetuaUnit'].enable();
          } else if (this.userrole === 'Admin') {
            this.formGroup.controls['ulasanPenyelia'].enable();
            this.formGroup.controls['ulasanKetuaSeksyen'].enable();
          } else if (this.userrole === 'MerinyuMTK') {
            this.formGroup.controls['ulasanPenyelia'].enable();
          }
          this.spinner.hide();
        },
        (error) => {
          this.loginError = true;
          this.spinner.hide();
          this.errorMsg = error["error"]["message"];
        }
      );
  }
  backtotop() {
    window.scroll(0, 0);
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
          localStorage.setItem("isdbkl","false");
 	  this.spinner.hide();
        },
        (error) => {
          // console.log("error is", error["error"]);
        }
      );
  }
  getPdf(e){
    //console.log(e)
    this.downloadPdf(e)
    .then(blob => {
      //console.log(blob)
      saveAs(blob, e);
      var fileURL = window.URL.createObjectURL(blob);
     // console.log(fileURL);
      
      let tab = window.open();
      tab.location.href = fileURL
    });
  }
  downloadPdf(id: number) {
    let key=localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      "Authorization": key,

    };


    return this.http
      .get("{{SERVER_URL}}/jkas_resourses/public/pdfs/" + id, { headers, responseType: 'blob' })
      .toPromise();
  }
  cancel () {
    window.history.back();// <-- go back to previous location on cancel
  }

  displayModal: string = "none";
  modalMessage: string = "";
  closeModal = () => this.displayModal = "none";
  onSubmit() {
    this.spinner.show();
    let key = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: key,
    };
    let body = this.formGroup.value;
    body['']
    this.http
      .put(this.basePublicUrl + '/dbkl/updateComplaintComments', body, {
        headers,
      })
      .subscribe((res) => {
        this.displayModal = "block";
        this.modalMessage = "Aduan berjaya dikemaskini.";
        this.spinner.hide();
      }, (error) => {
        this.displayModal = "block";
        this.modalMessage = "Gagal mengemaskini aduan.";
        this.spinner.hide();
      });
  }
}
