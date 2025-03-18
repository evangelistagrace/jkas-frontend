import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FormType } from "../models/form-type.enum";

@Injectable({
  providedIn: "root",
})
export class FormToggleService {
  // Create subjects to manage form visibility states
  private showFormSubject = new BehaviorSubject<FormType>(FormType.LOGIN);

  // Observable streams that components can subscribe to
  showForm$ = this.showFormSubject.asObservable();

  constructor() {}

  // Methods to update form visibility
  showForm(formType: FormType): void {
    this.showFormSubject.next(formType)
  }
}
