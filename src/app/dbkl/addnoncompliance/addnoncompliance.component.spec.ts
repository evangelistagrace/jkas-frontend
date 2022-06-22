import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddnoncomplianceComponent } from './addnoncompliance.component';

describe('AddnoncomplianceComponent', () => {
  let component: AddnoncomplianceComponent;
  let fixture: ComponentFixture<AddnoncomplianceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnoncomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnoncomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
