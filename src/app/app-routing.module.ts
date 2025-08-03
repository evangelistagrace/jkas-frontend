import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule, ExtraOptions } from "@angular/router";
import { AgencyComponent } from "./agency/agency/agency.component";
import { CreateInnvoiceComponent } from "./agency/create-innvoice/create-innvoice.component";
import { JobFeedbackComponent } from "./agency/job-feedback/job-feedback.component";
import { JobPaymentComponent } from "./agency/job-payment/job-payment.component";
import { NewFeedbackComponent } from "./agency/new-feedback/new-feedback.component";
import { UpdateFeedbackComponent } from "./agency/update-feedback/update-feedback.component";
import { AdminregisterComponent } from "./dbkl/adminregister/adminregister.component";
import { BarChartComponent } from "./dbkl/bar-chart/bar-chart.component";
import { ClaimReviewComponent } from "./dbkl/claim-review/claim-review.component";
import { ComplaintinvestigationComponent } from "./dbkl/complaintinvestigation/complaintinvestigation.component";
import { CompounddailyworkinfoComponent } from "./dbkl/compounddailyworkinfo/compounddailyworkinfo.component";
import { Compoundform2Component } from "./dbkl/compoundform2/compoundform2.component";
import { CompoundinfoComponent } from "./dbkl/compoundinfo/compoundinfo.component";
import { CompoundinspectingofficerComponent } from "./dbkl/compoundinspectingofficer/compoundinspectingofficer.component";
import { DailyworkinfoComponent } from "./dbkl/dailyworkinfo/dailyworkinfo.component";
import { DbklchecklistComponent } from "./dbkl/dbklchecklist/dbklchecklist.component";
import { DbklmainpageComponent } from "./dbkl/dbklmainpage/dbklmainpage.component";
import { DbklnoncomplianceComponent } from "./dbkl/dbklnoncompliance/dbklnoncompliance.component";
import { DbklresetpasswordComponent } from "./dbkl/dbklresetpassword/dbklresetpassword.component";
import { DbklsitevisitComponent } from "./dbkl/dbklsitevisit/dbklsitevisit.component";
import { EdituserinventoryComponent } from "./dbkl/edituserinventory/edituserinventory.component";
import { EmeetingComponent } from "./dbkl/emeeting/emeeting.component";
import { FinacialClaimReviewComponent } from "./dbkl/finacial-claim-review/finacial-claim-review.component";
import { GetemeetingComponent } from "./dbkl/getemeeting/getemeeting.component";
import { HalamauthamaComponent } from "./dbkl/halamauthama/halamauthama.component";
import { InspectingofficersComponent } from "./dbkl/inspectingofficers/inspectingofficers.component";
import { InventorymanagmentComponent } from "./dbkl/inventorymanagment/inventorymanagment.component";
import { ListemeetingComponent } from "./dbkl/listemeeting/listemeeting.component";
import { MtbcomplaintDailyJobInfoComponent } from "./dbkl/mtbcomplaint-daily-job-info/mtbcomplaint-daily-job-info.component";
import { MtbcomplaintInvestigationComponent } from "./dbkl/mtbcomplaint-investigation/mtbcomplaint-investigation.component";
import { MtbcompoundformComponent } from "./dbkl/mtbcompoundform/mtbcompoundform.component";
import { MtbdailylistofcompoundComponent } from "./dbkl/mtbdailylistofcompound/mtbdailylistofcompound.component";
import { MtbgetcompoundformComponent } from "./dbkl/mtbgetcompoundform/mtbgetcompoundform.component";
import { MtblistofcompoundComponent } from "./dbkl/mtblistofcompound/mtblistofcompound.component";
import { MtbworkFormComponent } from "./dbkl/mtbwork-form/mtbwork-form.component";
import { MtbworkLogComponent } from "./dbkl/mtbwork-log/mtbwork-log.component";
import { NewemeetingComponent } from "./dbkl/newemeeting/newemeeting.component";
import { NotFoundComponent } from "./dbkl/not-found/not-found.component";
import { NoticeformComponent } from "./dbkl/noticeform/noticeform.component";
import { OmpbaruComponent } from "./dbkl/ompbaru/ompbaru.component";
import { OmplamaComponent } from "./dbkl/omplama/omplama.component";
import { PsppaapplicationproccessComponent } from "./dbkl/psppaapplicationproccess/psppaapplicationproccess.component";
import { ShowomplamaComponent } from "./dbkl/showomplama/showomplama.component";
import { UsermanagmentComponent } from "./dbkl/usermanagment/usermanagment.component";
import { GoogleAnalyticsComponent } from "./google/google-analytics/google-analytics.component";
import { ProfileComponent } from "./profile/profile.component";
import { ChecklistComponent } from "./publicPages/checklist/checklist.component";
import { MaklumatComponent } from "./publicPages/maklumat/maklumat.component";
import { NoncomplianceComponent } from "./publicPages/noncompliance/noncompliance.component";
import { PublicLoginComponent } from "./publicPages/public-login/public-login.component";
import { PublicComponent } from "./publicPages/public/public.component";
import { Public2Component } from "./publicPages/public2/public2.component";
import { PublicpageComponent } from "./publicPages/publicpage/publicpage.component";
import { RatingComponent } from "./publicPages/rating/rating.component";
import { ResetpasswordComponent } from "./publicPages/resetpassword/resetpassword.component";
import { ServiceListComponent } from "./publicPages/service-list/service-list.component";
import { ShowchecklistformComponent } from "./publicPages/showchecklistform/showchecklistform.component";
import { AuthGuard } from "./services/auth.guard";
import { ANNOUCEMENTSComponent } from "./superadmin/annoucements/annoucements.component";
import { ManualuploadComponent } from "./superadmin/manualupload/manualupload.component";
import { MapviewComponent } from "./dbkl/mapview/mapview.component"
import { MerinyuanalysisComponent } from "./dbkl/merinyuanalysis/merinyuanalysis.component";
import { MtbcomplaintDailyJobInfo1Component } from "./dbkl/mtbcomplaint-daily-job-info1/mtbcomplaint-daily-job-info1.component";
import { DbkldataComponent } from "./dbkl/dbkldata/dbkldata.component";
import { GaleryphotosComponent } from "./superadmin/galeryphotos/galeryphotos.component";
import { NotFound2Component } from "./dbkl/not-found2/not-found2.component";
import { AddnoncomplianceComponent } from "./dbkl/addnoncompliance/addnoncompliance.component";
import { DemoTextComponent } from "./dbkl/demo-text/demo-text.component";
import { InactiveAreaComponent } from "./dbkl/inactive-area/inactive-area.component";
import { AnalisiskompaunComponent } from "./dbkl/analisiskompaun/analisiskompaun.component";
import { PublicppsppaComponent } from "./publicextra/publicppsppa/publicppsppa.component";
import { ListdocumentComponent } from "./publicextra/listdocument/listdocument.component";
import { ChecklistoptionComponent } from "./publicextra/checklistoption/checklistoption.component";
import { ServicesheduleComponent } from "./publicextra/serviceshedule/serviceshedule.component";
import { CollectnsheduleComponent } from "./publicextra/collectnshedule/collectnshedule.component";
import { CleansheduleComponent } from "./publicextra/cleanshedule/cleanshedule.component";
import { ServiceLoginComponent } from "./service-login/service-login.component";
import { NewInventoryComponent } from "./dbkl/new-inventory/new-inventory.component";
import { InventorymapComponent } from "./dbkl/inventorymap/inventorymap.component";
import { MtkmapviewComponent } from "./dbkl/mtkmapview/mtkmapview.component";
import { MtkcompoundformComponent } from "./dbkl/mtkcompoundform/mtkcompoundform.component";
import { MtkworkformComponent } from "./dbkl/mtkworkform/mtkworkform.component";
import { FooterComponent } from "./footer/footer.component";
import { AdminAnnouncementsComponent } from './admin/admin-announcements/admin-announcements.component';

const routes: Routes = [
  { path: "public", component: PublicComponent },
  { path: "", redirectTo: "public", pathMatch: "full" },


  // {
  //   path: "**",
  //   component: NotFound2Component
  // },

  { path: "publicen", component: Public2Component },
  { path: "publicLogin", component: PublicLoginComponent },
  { path: "publicpage", component: PublicpageComponent },
  { path: "public/checklist", component: ChecklistComponent },
  { path: "public/maklumat/:id", component: MaklumatComponent },
  { path: "public/noncompliance/:id", component: NoncomplianceComponent },

  { path: "public/servicelist", component: ServiceListComponent },
  { path: "public/showchecklist", component: ShowchecklistformComponent },
  { path: "public/resetpassword", component: ResetpasswordComponent },
  { path: "public/ratingform", component: RatingComponent },

  { path: "public/serviceLogin", component: ServiceLoginComponent },


  { path: "agency", component: AgencyComponent },
  { path: "agency/job-feedback", component: JobFeedbackComponent },
  { path: "agency/new-feedback", component: NewFeedbackComponent },
  { path: "agency/createinvoice", component: JobPaymentComponent },
  { path: "agency/updateinvoice", component: CreateInnvoiceComponent },
  { path: "agency/update-feedback/:id", component: UpdateFeedbackComponent },

  { path: "dbkl/adminregister", component: AdminregisterComponent },

  {
    path: "dbkl/inspectingofficers",
    component: InspectingofficersComponent, canActivate: [AuthGuard],
  },
  { path: "dbkl/dailyworkinfo", component: DailyworkinfoComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/omplama", component: OmplamaComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', "Inventori", 'Kewangan']
    }
  },


  {
    path: "dbkl/complaintinvestigation",
    component: ComplaintinvestigationComponent, canActivate: [AuthGuard],
  },
  { path: "dbkl/compoundinfo", component: CompoundinfoComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/compoundinspectingofficer",
    component: CompoundinspectingofficerComponent, canActivate: [AuthGuard],
  },
  {
    path: "dbkl/compounddailyworkinfo",
    component: CompounddailyworkinfoComponent, canActivate: [AuthGuard],
  },
  { path: "dbkl/compoundform", component: Compoundform2Component },
  { path: "dbkl/mtbwork-log", component: MtbworkLogComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/mtbdailyjobinfo",
    component: MtbcomplaintDailyJobInfoComponent, canActivate: [AuthGuard],
  },

  {
    path: "dbkl/mtbwork-form", component: MtbworkFormComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', 'MerinyuMTB', 'MerinyuMTK', 'Kewangan', 'Analisis,MerinyuMTB,MerinyuMTK']
    }
  },
  { path: "dbkl/mtbcompoundform", component: MtbcompoundformComponent, canActivate: [AuthGuard], },
  { path: "dbkl/financialclaim", component: FinacialClaimReviewComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/claim-review", component: ClaimReviewComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', 'Kewangan']
    }
  },
  { path: 'dbkl/resetpassword', component: DbklresetpasswordComponent },
  { path: "dbkl/noticeform", component: NoticeformComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtblistofcompound", component: MtblistofcompoundComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/mtbdailylistofcompound",
    component: MtbdailylistofcompoundComponent, canActivate: [AuthGuard],
  },
  { path: "dbkl/mtbcomplaints", component: MtbcomplaintInvestigationComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtbgetcompoundform", component: MtbgetcompoundformComponent, canActivate: [AuthGuard], },

  {
    path: "dbkl/barchart", component: BarChartComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', 'Analisis', 'Kewangan', 'Analisis,MerinyuMTB,MerinyuMTK']
    }
  },
  {
    path: "dbkl/usermanagement", component: UsermanagmentComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', 'Pentadbir'],
    }
  },

  { path: "dbkl/emeeting", component: EmeetingComponent, canActivate: [AuthGuard], },
  { path: "dbkl/newemeeting", component: NewemeetingComponent, canActivate: [AuthGuard], },

  {
    path: "dbkl/applicationprocess",
    component: PsppaapplicationproccessComponent, canActivate: [AuthGuard],
  },
  { path: "dbkl/dbklchecklist", component: DbklchecklistComponent, canActivate: [AuthGuard], },
  { path: "dbkl/dbklsitevisit", component: DbklsitevisitComponent, canActivate: [AuthGuard], },
  { path: "dbkl/dbklnoncompliance", component: DbklnoncomplianceComponent, canActivate: [AuthGuard], },
  { path: "dbkl/inventorymanage", component: NewInventoryComponent, canActivate: [AuthGuard], },
  { path: "dbkl/edituserinventory", component: EdituserinventoryComponent, canActivate: [AuthGuard], },
  { path: "dbkl/ompbaru", component: OmpbaruComponent, canActivate: [AuthGuard] },
  { path: "dbkl/showomplama", component: ShowomplamaComponent, canActivate: [AuthGuard], },
  { path: "dbkl/listemeeting", component: ListemeetingComponent, canActivate: [AuthGuard], },
  { path: "dbkl/getemeeting", component: GetemeetingComponent, canActivate: [AuthGuard], },
  { path: "dbkl/dbklmainpage", component: DbklmainpageComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mainpage", component: HalamauthamaComponent },
  { path: "profileLog", component: ProfileComponent },
  {
    path: 'superadmin/annoucement', component: ANNOUCEMENTSComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin']
    }
  },
  {
    path: 'superadmin/manualupload', component: ManualuploadComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin']
    }
  },
  {
    path: 'superadmin/galeryphoto', component: GaleryphotosComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin']
    }
  },
  { path: 'accessdenied', component: NotFoundComponent },
  { path: 'googleAnaltytics', component: GoogleAnalyticsComponent },
  { path: 'dbkl/mapview', component: MapviewComponent, canActivate: [AuthGuard], },

  { path: "dbkl/merinyuanalysis", component: MerinyuanalysisComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtbmap", component: MtbcomplaintDailyJobInfo1Component, canActivate: [AuthGuard], },
  { path: "dbkl/dbkldata", component: DbkldataComponent, canActivate: [AuthGuard], },
  { path: "dbkl/addnoncompliance", component: AddnoncomplianceComponent, canActivate: [AuthGuard], },

  { path: "mapdemo", component: DemoTextComponent },
  { path: "dbkl/inactivearea", component: InactiveAreaComponent, canActivate: [AuthGuard], },
  {
    path: "dbkl/compoundanalysis", component: AnalisiskompaunComponent, canActivate: [AuthGuard],
    data: {
      role: ['Superadmin', 'Analisis', 'Kewangan', 'Analisis,MerinyuMTB,MerinyuMTK']
    }
  },
  { path: "public/checklistoption", component: ChecklistoptionComponent },
  { path: "public/listdocument", component: ListdocumentComponent },
  { path: "public/publicpages", component: PublicppsppaComponent },
  { path: "public/sevices", component: ServicesheduleComponent },
  { path: "public/collectionshedule", component: CollectnsheduleComponent },
  { path: "public/cleaningshedule", component: CleansheduleComponent },
  { path: "dbkl/updateinventory", component: InventorymanagmentComponent, canActivate: [AuthGuard], },
  { path: "dbkl/inventorymap", component: InventorymapComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtkmapview", component: MtkmapviewComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtkworkform", component: MtkworkformComponent, canActivate: [AuthGuard], },
  { path: "dbkl/mtkcompoundform", component: MtkcompoundformComponent, canActivate: [AuthGuard], },
  { path: 'admin/announcements', component: AdminAnnouncementsComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64], // Adjust this value based on your navbar height
  onSameUrlNavigation: 'reload',
  relativeLinkResolution: 'legacy'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
