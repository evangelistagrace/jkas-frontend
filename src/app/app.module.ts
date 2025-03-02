import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ExcelService } from './services/excel.service';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicComponent } from "./publicPages/public/public.component";
import { PublicLoginComponent } from "./publicPages/public-login/public-login.component";
import { PublicpageComponent } from "./publicPages/publicpage/publicpage.component";
import { ChecklistComponent } from "./publicPages/checklist/checklist.component";
import { MaklumatComponent } from "./publicPages/maklumat/maklumat.component";
import { NoncomplianceComponent } from "./publicPages/noncompliance/noncompliance.component";
import { ServiceListComponent } from "./publicPages/service-list/service-list.component";
import { NgxPaginationModule } from "ngx-pagination";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { FileUploadModule } from "ng2-file-upload";
import { CreateInnvoiceComponent } from "./agency/create-innvoice/create-innvoice.component";
import { JobFeedbackComponent } from "./agency/job-feedback/job-feedback.component";
import { JobPaymentComponent } from "./agency/job-payment/job-payment.component";
import { UpdateFeedbackComponent } from "./agency/update-feedback/update-feedback.component";
import { NewFeedbackComponent } from "./agency/new-feedback/new-feedback.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgencyComponent } from "./agency/agency/agency.component";
import { AdminregisterComponent } from "./dbkl/adminregister/adminregister.component";
import { ComplaintinvestigationComponent } from "./dbkl/complaintinvestigation/complaintinvestigation.component";
import { CompounddailyworkinfoComponent } from "./dbkl/compounddailyworkinfo/compounddailyworkinfo.component";
import { Compoundform2Component } from "./dbkl/compoundform2/compoundform2.component";
import { CompoundinfoComponent } from "./dbkl/compoundinfo/compoundinfo.component";
import { CompoundinspectingofficerComponent } from "./dbkl/compoundinspectingofficer/compoundinspectingofficer.component";
import { DailyworkinfoComponent } from "./dbkl/dailyworkinfo/dailyworkinfo.component";
import { InspectingofficersComponent } from "./dbkl/inspectingofficers/inspectingofficers.component";
import { OmplamaComponent } from "./dbkl/omplama/omplama.component";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { ShowchecklistformComponent } from "./publicPages/showchecklistform/showchecklistform.component";
import { ResetpasswordComponent } from "./publicPages/resetpassword/resetpassword.component";
import { RatingComponent } from "./publicPages/rating/rating.component";
import { MtbcomplaintDailyJobInfoComponent } from "./dbkl/mtbcomplaint-daily-job-info/mtbcomplaint-daily-job-info.component";
import { MtbworkLogComponent } from "./dbkl/mtbwork-log/mtbwork-log.component";
import { MtbworkFormComponent } from "./dbkl/mtbwork-form/mtbwork-form.component";
import { ClaimReviewComponent } from "./dbkl/claim-review/claim-review.component";
import { MtbcompoundformComponent } from "./dbkl/mtbcompoundform/mtbcompoundform.component";
import { FinacialClaimReviewComponent } from "./dbkl/finacial-claim-review/finacial-claim-review.component";
import { NoticeformComponent } from "./dbkl/noticeform/noticeform.component";
import { MtblistofcompoundComponent } from "./dbkl/mtblistofcompound/mtblistofcompound.component";
import { MtbdailylistofcompoundComponent } from "./dbkl/mtbdailylistofcompound/mtbdailylistofcompound.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { MtbcomplaintInvestigationComponent } from "./dbkl/mtbcomplaint-investigation/mtbcomplaint-investigation.component";
import { TableService } from "./table/table.service";
import { Ng2SmartTableComponent, Ng2SmartTableModule } from "ng2-smart-table";
import { MtbgetcompoundformComponent } from "./dbkl/mtbgetcompoundform/mtbgetcompoundform.component";
import { HeaderComponent } from "./dbkl/header/header.component";
import { BarChartComponent } from "./dbkl/bar-chart/bar-chart.component";
import { HighchartsService } from "./services/highcharts.service";
import { NewemeetingComponent } from "./dbkl/newemeeting/newemeeting.component";
import { UsermanagmentComponent } from "./dbkl/usermanagment/usermanagment.component";
import { EmeetingComponent } from "./dbkl/emeeting/emeeting.component";
import { DbklchecklistComponent } from "./dbkl/dbklchecklist/dbklchecklist.component";
import { DbklnoncomplianceComponent } from "./dbkl/dbklnoncompliance/dbklnoncompliance.component";
import { DbklsitevisitComponent } from "./dbkl/dbklsitevisit/dbklsitevisit.component";
import { PsppaapplicationproccessComponent } from "./dbkl/psppaapplicationproccess/psppaapplicationproccess.component";
import { EdituserinventoryComponent } from "./dbkl/edituserinventory/edituserinventory.component";
import { InventorymanagmentComponent } from "./dbkl/inventorymanagment/inventorymanagment.component";
import { OmpbaruComponent } from "./dbkl/ompbaru/ompbaru.component";
import { ShowomplamaComponent } from "./dbkl/showomplama/showomplama.component";
import { FooterComponent } from "./footer/footer.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { ListemeetingComponent } from "./dbkl/listemeeting/listemeeting.component";
import { GetemeetingComponent } from "./dbkl/getemeeting/getemeeting.component";
import { DbklmainpageComponent } from "./dbkl/dbklmainpage/dbklmainpage.component";
import { HalamauthamaComponent } from "./dbkl/halamauthama/halamauthama.component";
import { DbklresetpasswordComponent } from "./dbkl/dbklresetpassword/dbklresetpassword.component";
import { ProfileComponent } from "./profile/profile.component";
import { ANNOUCEMENTSComponent } from "./superadmin/annoucements/annoucements.component";
import { ManualuploadComponent } from "./superadmin/manualupload/manualupload.component";
import { CountdownGlobalConfig, CountdownModule } from "ngx-countdown";
import enLocale from "@angular/common/locales/en";
import msLocale from "@angular/common/locales/ms";
import { DatePipe, registerLocaleData } from "@angular/common";
import { NgxDatePipe } from "./services/ngx-date.pipe";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HeadercComponent } from "./dbkl/headerc/headerc.component";
import { NotFoundComponent } from "./dbkl/not-found/not-found.component";
import { ChartsModule, ThemeService } from "ng2-charts";
import { ReplaceSubstring } from "./services/dataPipe";
import { GoogleAnalyticsComponent } from "./google/google-analytics/google-analytics.component";
import { UploadfileComponent } from "./uploadfile/uploadfile.component";
import { MeetingmodalComponent } from "./meetingmodal/meetingmodal.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { AlphabetOnlyDirective } from "./services/alphabet-only.directive";
import { DbklfirstdropdownComponent } from "./dbklfirstdropdown/dbklfirstdropdown.component";
import { DbklseconddropdownComponent } from "./dbklseconddropdown/dbklseconddropdown.component";
import { DbklthirddropdownComponent } from "./dbklthirddropdown/dbklthirddropdown.component";
import { UploadnoncomplianceComponent } from "./uploadnoncompliance/uploadnoncompliance.component";
import { Public2Component } from "./publicPages/public2/public2.component";
import { MapviewComponent } from "./dbkl/mapview/mapview.component";
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from "ngx-bootstrap/datepicker";
import { NgxPrintModule } from "ngx-print";
import { MerinyuanalysisComponent } from "./dbkl/merinyuanalysis/merinyuanalysis.component";
import { MtbcomplaintDailyJobInfo1Component } from "./dbkl/mtbcomplaint-daily-job-info1/mtbcomplaint-daily-job-info1.component";
import { FilterPipe } from "./services/uniquepipe";
import { DbkldataComponent } from './dbkl/dbkldata/dbkldata.component';
import { GaleryphotosComponent } from './superadmin/galeryphotos/galeryphotos.component';
import { NotFound2Component } from './dbkl/not-found2/not-found2.component';
import { AddnoncomplianceComponent } from './dbkl/addnoncompliance/addnoncompliance.component';
import { UndeletedropdownComponent } from './undeletedropdown/undeletedropdown.component';
import { UploaddocumentComponent } from './uploaddocument/uploaddocument.component';
import { DemoTextComponent } from './dbkl/demo-text/demo-text.component';
import { ShowpdfComponent } from './showpdf/showpdf.component';
import { DbklppsppaComponent } from './pdfs/dbklppsppa/dbklppsppa.component';
import { DbklpdfComponent } from './dbklpdf/dbklpdf.component';
import { InactiveAreaComponent } from './dbkl/inactive-area/inactive-area.component';
import { AnalisiskompaunComponent } from './dbkl/analisiskompaun/analisiskompaun.component';
import { PublicppsppaComponent } from './publicextra/publicppsppa/publicppsppa.component';
import { ListdocumentComponent } from './publicextra/listdocument/listdocument.component';
import { ChecklistoptionComponent } from './publicextra/checklistoption/checklistoption.component';
import { ServicesheduleComponent } from './publicextra/serviceshedule/serviceshedule.component';
import { CollectnsheduleComponent } from './publicextra/collectnshedule/collectnshedule.component';
import { CleansheduleComponent } from './publicextra/cleanshedule/cleanshedule.component';
import { ServiceLoginComponent } from './service-login/service-login.component';
import { UploadbuttonComponent } from './uploadbutton/uploadbutton.component';
import { DbkluploadbuttonComponent } from './dbkluploadbutton/dbkluploadbutton.component';
import { NewInventoryComponent } from './dbkl/new-inventory/new-inventory.component';
import { InventorymapComponent } from './dbkl/inventorymap/inventorymap.component';
import { MtkmapviewComponent } from './dbkl/mtkmapview/mtkmapview.component';
import { MtkworkformComponent } from './dbkl/mtkworkform/mtkworkform.component';
import { MtkcompoundformComponent } from './dbkl/mtkcompoundform/mtkcompoundform.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartModule } from "angular-highcharts";
import { FiltercustombuttonComponent } from './filtercustombutton/filtercustombutton.component';
import { FilterdoublecustombuttonComponent } from './filterdoublecustombutton/filterdoublecustombutton.component';
import { TextboxComponent } from './textbox/textbox.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { DbklppsppacatatanComponent } from './dbklppsppacatatan/dbklppsppacatatan.component';
import { RouterModule } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButtonModule} from 'primeng/selectbutton';

registerLocaleData(enLocale, "en");
registerLocaleData(msLocale, "ms");

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PublicLoginComponent,
    PublicpageComponent,
    ChecklistComponent,
    MaklumatComponent,
    NoncomplianceComponent,
    ServiceListComponent,
    CreateInnvoiceComponent,
    JobFeedbackComponent,
    JobPaymentComponent,
    UpdateFeedbackComponent,
    NewFeedbackComponent,
    AgencyComponent,
    AdminregisterComponent,
    ComplaintinvestigationComponent,
    CompounddailyworkinfoComponent,
    Compoundform2Component,
    CompoundinfoComponent,
    CompoundinspectingofficerComponent,
    DailyworkinfoComponent,
    InspectingofficersComponent,
    OmplamaComponent,
    ShowchecklistformComponent,
    ResetpasswordComponent,
    RatingComponent,
    MtbcomplaintDailyJobInfoComponent,
    MtbworkLogComponent,
    MtbworkFormComponent,
    ClaimReviewComponent,
    MtbcompoundformComponent,
    FinacialClaimReviewComponent,
    NoticeformComponent,
    MtblistofcompoundComponent,
    MtbdailylistofcompoundComponent,
    MtbcomplaintInvestigationComponent,

    MtbgetcompoundformComponent,
    HeaderComponent,
    BarChartComponent,
    NewemeetingComponent,
    UsermanagmentComponent,
    EmeetingComponent,
    DbklchecklistComponent,
    DbklnoncomplianceComponent,
    DbklsitevisitComponent,
    PsppaapplicationproccessComponent,
    EdituserinventoryComponent,
    InventorymanagmentComponent,
    OmpbaruComponent,
    ShowomplamaComponent,

    TopbarComponent,
    ListemeetingComponent,
    GetemeetingComponent,
    DbklmainpageComponent,
    HalamauthamaComponent,
    DbklresetpasswordComponent,
    ProfileComponent,
    ANNOUCEMENTSComponent,
    ManualuploadComponent,
    FooterComponent,
    NgxDatePipe,
    HeadercComponent,
    NotFoundComponent,
    ReplaceSubstring,
    GoogleAnalyticsComponent,
    UploadfileComponent,
    MeetingmodalComponent,
    DropdownComponent,
    AlphabetOnlyDirective,
    DbklfirstdropdownComponent,
    DbklseconddropdownComponent,
    DbklthirddropdownComponent,
    UploadnoncomplianceComponent,
    Public2Component,
    MapviewComponent,
    MerinyuanalysisComponent,
    MtbcomplaintDailyJobInfo1Component,
    FilterPipe,
    DbkldataComponent,
    GaleryphotosComponent,
    NotFound2Component,
    AddnoncomplianceComponent,
    UndeletedropdownComponent,
    UploaddocumentComponent,
    DemoTextComponent,
    ShowpdfComponent,
    DbklppsppaComponent,
    DbklpdfComponent,
    InactiveAreaComponent,
    AnalisiskompaunComponent,
    PublicppsppaComponent,
    ListdocumentComponent,
    ChecklistoptionComponent,
    ServicesheduleComponent,
    CollectnsheduleComponent,
    CleansheduleComponent,
    ServiceLoginComponent,
    UploadbuttonComponent,
    DbkluploadbuttonComponent,
    NewInventoryComponent,
    InventorymapComponent,
    MtkmapviewComponent,
    MtkworkformComponent,
    MtkcompoundformComponent,
    FiltercustombuttonComponent,
    FilterdoublecustombuttonComponent,
    TextboxComponent,
    DbklppsppacatatanComponent,
    AnnouncementsComponent



  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    AutocompleteLibModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LeafletModule,
    FileUploadModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CarouselModule,
    Ng2SmartTableModule,
    CountdownModule,
    ChartsModule,
    NgxPrintModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ChartModule,
    NgMultiSelectDropDownModule.forRoot(),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),

    BsDatepickerModule.forRoot(),
    CalendarModule,
    DropdownModule,
    SelectButtonModule
    // RouterModule.forRoot([], {
    //   anchorScrolling: 'enabled',
    //   scrollPositionRestoration: 'enabled',
    //   // Optional: if you want to handle fragment navigation without updating the URL
    //   onSameUrlNavigation: 'reload'
    // })
  ],
  exports: [ReplaceSubstring],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line
  providers: [
    NgxSpinnerService,
    TableService,
    HighchartsService,
    CountdownGlobalConfig,
    NgxDatePipe,
    ThemeService,
    DatePipe,
    BsDatepickerConfig,
    ExcelService,
    Ng2SmartTableComponent

  ],
  bootstrap: [AppComponent],
  entryComponents: [
    UploadfileComponent,
    MeetingmodalComponent,
    DropdownComponent,
    DbklfirstdropdownComponent,
    DbklseconddropdownComponent,
    DbklthirddropdownComponent,
    UploadnoncomplianceComponent,
    UndeletedropdownComponent,
    UploaddocumentComponent,
    ShowpdfComponent,
    DbklppsppaComponent,
    DbklpdfComponent,
    UploadbuttonComponent,
    DbkluploadbuttonComponent,
    FiltercustombuttonComponent,
    FilterdoublecustombuttonComponent,
    TextboxComponent

  ],
})
export class AppModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}