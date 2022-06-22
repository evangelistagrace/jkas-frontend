import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeetingmodalComponent } from './meetingmodal.component';

describe('MeetingmodalComponent', () => {
  let component: MeetingmodalComponent;
  let fixture: ComponentFixture<MeetingmodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
