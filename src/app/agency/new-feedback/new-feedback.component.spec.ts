import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewFeedbackComponent } from './new-feedback.component';

describe('NewFeedbackComponent', () => {
  let component: NewFeedbackComponent;
  let fixture: ComponentFixture<NewFeedbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
