import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { UploadService } from "../services/upload.service";
import { UploadnoncomplianceformService } from "../services/uploadnoncomplianceform.service";

@Component({
  selector: "app-dbklseconddropdown",
  templateUrl: "./dbklseconddropdown.component.html",
  styleUrls: ["./dbklseconddropdown.component.css"],
})
export class DbklseconddropdownComponent implements OnInit {
  token: string;
  applicationSerialNo: any;
  basePublicUrl = environment.basePublicUrl;
  fileName: string;
  keyValue: any;
  data: any;
  dataArray: any = [];
  restData: any;
  loginError: boolean;
  errorMsg: any;

  constructor(
    private http: HttpClient,
    private s: UploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private up: UploadnoncomplianceformService
  ) {}

  ngOnInit() {
    this.keyValue = this.up.value;
    this.data = this.up.getDetails;
  }

  onSelectOption1(e, id) {
    this.spinner.show();
    // console.log(e.target.value);

    let ev = id;
    for (let index of this.data) {
      if (index.site_id == ev) {
        this.restData = index;
      }
    }

    this.applicationSerialNo = this.route.snapshot.paramMap.get("id");
    this.token = localStorage.getItem("AccessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: this.token,
    };

    let body = {
      tarikh: this.restData.tarikh,
      lawatan_tapak: this.restData.lawatan_tapak,
      tarikh_lawatan_tapak: e.target.value,
      keputusan_lawatan_tapak: this.restData.keputusan_lawatan_tapak,
      makalumat_ketidakpatuhan: this.restData.makalumat_ketidakpatuhan,
      maklum_balas_ketidakpatuhan: this.restData.maklum_balas_ketidakpatuhan,
    };
    // console.log(body);

    this.http
      .put(
        this.basePublicUrl + "/dbkl/updateSiteVisitApplicationList/" + ev,
        body,
        { headers: headers }
      )
      .subscribe(
        (res) => {
          // console.log(res);
          window.location.reload();
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.loginError = true;
          this.errorMsg = error["error"]["message"];
        }
      );
  }
}
