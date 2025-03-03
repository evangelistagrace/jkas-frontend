import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar-v2',
  templateUrl: './topbar-v2.component.html',
  styleUrls: ['./topbar-v2.component.css']
})
export class TopbarV2Component implements OnInit {

  pathToAppend: string;
  date: Date;
  sellang: string;
  private languageCodes: string[] = ["ms", "en"];
  constructor(@Inject(LOCALE_ID) protected localeId: string, private translateService: TranslateService) { }

  ngOnInit() {
    // var header = document.getElementById("myDIV");
    // var btns = header.getElementsByClassName("ck1");
    // for (var i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener("click", function() {
    //   var current = document.getElementsByClassName("active");
    //   current[1].className = current[1].className.replace("active", "");
    //   this.className += " active";
    //   });
    // }

    if ("lang" in localStorage) {

    }
    else {
      localStorage.setItem('lang', 'ms');
    }


    let l = localStorage.getItem("lang");
    if (l == 'ms') {
      document.getElementById("ck2").classList.add("active");
      document.getElementById("ck1").classList.remove("active");
      }
      else if (l == 'en') {
      document.getElementById("ck1").classList.add("active");
      document.getElementById("ck2").classList.remove("active");
      }
      else {
      localStorage.setItem('lang', 'ms');
      document.getElementById("ck2").classList.add("active");
      document.getElementById("ck1").classList.remove("active");
      }

    // this.date = new Date();
    // this.date.setDate(this.date.getDate());
    this.sellang = localStorage.getItem('lang');
    this.onSelectLanguage(this.sellang);
    this.translateService.addLangs(this.languageCodes);

  }
  englishSelected() {

    localStorage.setItem('lang', 'en');
    this.pathToAppend = localStorage.getItem('path');
  }
  malaySelected() {

    localStorage.setItem('lang', 'ms');
    this.pathToAppend = localStorage.getItem('path');
  }

  private selectLanguageByCode(languageCode: string): void {
    this.translateService.use(
      this.isLanguageCodeSupported(languageCode)
        ? languageCode
        : this.translateService.getDefaultLang()
    );
  }

  public get currentLanguageCode(): string {
    return this.translateService.currentLang;
  }

  public get supportedLanguageCodes(): string[] {
    return this.languageCodes;
  }

  onSelectLanguage(val) {
    // console.log(e.target.value);
    this.selectLanguageByCode(val);

  }
  public get todaysDate(): Date {
    return new Date();
  }
  private isLanguageCodeSupported(languageCode: string): boolean {
    return this.supportedLanguageCodes.indexOf(languageCode) > -1;
  }
}
