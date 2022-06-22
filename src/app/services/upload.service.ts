import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  subject_test: any;
  value: any;
  getMakumatData: any;
  constructor() {}
  ngOnInit() {
    // console.log(this.value);
  }
}
