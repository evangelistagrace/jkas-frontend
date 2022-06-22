import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobPaymentComponent } from './job-payment.component';

describe('JobPaymentComponent', () => {
  let component: JobPaymentComponent;
  let fixture: ComponentFixture<JobPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
