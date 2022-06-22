import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobFeedbackComponent } from './job-feedback.component';

describe('JobFeedbackComponent', () => {
  let component: JobFeedbackComponent;
  let fixture: ComponentFixture<JobFeedbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JobFeedbackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
