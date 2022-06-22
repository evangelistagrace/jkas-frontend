import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbcomplaintDailyJobInfo1Component } from './mtbcomplaint-daily-job-info1.component';

describe('MtbcomplaintDailyJobInfo1Component', () => {
  let component: MtbcomplaintDailyJobInfo1Component;
  let fixture: ComponentFixture<MtbcomplaintDailyJobInfo1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbcomplaintDailyJobInfo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbcomplaintDailyJobInfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
