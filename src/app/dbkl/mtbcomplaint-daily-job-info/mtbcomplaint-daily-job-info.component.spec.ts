import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbcomplaintDailyJobInfoComponent } from './mtbcomplaint-daily-job-info.component';

describe('MtbcomplaintDailyJobInfoComponent', () => {
  let component: MtbcomplaintDailyJobInfoComponent;
  let fixture: ComponentFixture<MtbcomplaintDailyJobInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbcomplaintDailyJobInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbcomplaintDailyJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
