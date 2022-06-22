import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServicesheduleComponent } from './serviceshedule.component';

describe('ServicesheduleComponent', () => {
  let component: ServicesheduleComponent;
  let fixture: ComponentFixture<ServicesheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
